import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const getSystemPrompt = (brand: 'sanda' | 'balearic') => {
  const persona = brand === 'balearic'
    ? `You are an elite, high-end digital marketing architect representing "Balearic Yacht Charter", a premium luxury Mediterranean travel brand. 
Balearic Yacht Charter specializes in bespoke itineraries, high-end experiential sanctuaries for family and luxury travel groups, and 400 S2 catamarans. Your tone is inviting, luxurious, experiential, and focused on gourmet culinary experiences, crystal clear waters, and exclusive VIP service.`
    : `You are an elite, high-end digital marketing architect representing Sanda Veisa, a premium Full-Stack Developer and Web Architect. 
Sanda builds "digital masterpieces", "immersive visual aesthetics", and "luxury brand experiences." Her tone is confident, extremely professional, elegant, and focused on high-end results and blazing fast performance.`;

  const langs = brand === 'balearic'
    ? 'English (EN), German (DE), Russian (RU), and Spanish (ES)'
    : 'English (EN), Latvian (LV), Russian (RU), and Spanish (ES)';

  const secondLangKey = brand === 'balearic' ? 'DE' : 'LV';
  const secondLangDesc = brand === 'balearic' ? 'German translation...' : 'Latvian translation...';

  return `
${persona}

The user will provide a brief prompt or idea.
Your job is to generate 3 distinct social media posts (LinkedIn, Facebook, Instagram) based on that idea.
Crucially, for EACH platform, you MUST provide the exact same marketing message translated into 4 languages: ${langs}.
Do not translate the hashtags. Generate a single list of global, highly relevant hashtags for each platform.

Respond ONLY with a valid JSON object. Do not include markdown \`\`\`json blocks.
The schema must exactly match this structure:
{
  "imagePrompt": "A highly detailed, photorealistic 8k image description that visually represents this post's theme. Use cinematic lighting, luxury keywords, and hyper-specific details (no text in the image).",
  "posts": [
    {
      "platform": "LinkedIn",
      "content": {
        "EN": "Professional english tech copy...",
        "${secondLangKey}": "${secondLangDesc}",
        "RU": "Russian translation...",
        "ES": "Spanish translation..."
      },
      "hashtags": ["#WebArchitecture", "#Nextjs", "#Tech"]
    },
    {
      "platform": "Facebook",
      "content": { "EN": "...", "${secondLangKey}": "...", "RU": "...", "ES": "..." },
      "hashtags": ["#Frontend", "#WebDesign"]
    },
    {
      "platform": "Instagram",
      "content": { "EN": "...", "${secondLangKey}": "...", "RU": "...", "ES": "..." },
      "hashtags": ["#UIUX", "#LuxuryDesign"]
    }
  ]
}

Remember:
- LinkedIn: Focus on architecture, business value, speed, scaling, enterprise.
- Facebook: Focus on case studies, visual appeal, local business reach, getting an estimate.
- Instagram: Highly visual tone, focus on luxury, UI/UX aesthetics, emojis, driving traffic to the portfolio link.
`;
}

export async function POST(req: Request) {
  try {
    const { prompt, brand = 'sanda' } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const systemInstruction = getSystemPrompt(brand as 'sanda' | 'balearic');


    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Using 2.5 flash as standard high-quality model via @google/genai
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
      }
    });

    const aiText = response.text;

    if (!aiText) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    const generatedContent = JSON.parse(aiText);

    // Save to Supabase
    const { data: insertData, error: dbError } = await supabase
      .from('ai_marketing_campaigns')
      .insert([
        { prompt: prompt, content: generatedContent }
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Supabase Error:", dbError);
      // Still return the generated content even if saving fails, so user is not blocked
      return NextResponse.json({ content: generatedContent, warning: 'Failed to save history' });
    }

    return NextResponse.json({ content: generatedContent });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
