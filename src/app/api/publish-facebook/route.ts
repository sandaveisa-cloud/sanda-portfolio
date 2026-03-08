import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { message, imagePrompt } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const pageId = process.env.FACEBOOK_PAGE_ID;
        const pageToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

        if (!pageId || !pageToken) {
            return NextResponse.json({ error: 'Facebook credentials not configured' }, { status: 500 });
        }

        let postData: Record<string, string> = {
            message,
            access_token: pageToken,
        };

        // If there's an image prompt, publish as a photo post
        if (imagePrompt) {
            // Generate the image URL from our own endpoint
            const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sandaveisa.com'}/api/generate-image?prompt=${encodeURIComponent(imagePrompt)}`;

            // Upload the image directly from our endpoint
            const photoResponse = await fetch(
                `https://graph.facebook.com/v19.0/${pageId}/photos`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        url: imageUrl,
                        caption: message,
                        access_token: pageToken,
                        published: true,
                    }),
                }
            );

            const photoData = await photoResponse.json();

            if (!photoResponse.ok || photoData.error) {
                // If photo post fails, fall back to text-only post
                console.warn('Photo post failed, falling back to text post:', photoData.error);
            } else {
                return NextResponse.json({
                    success: true,
                    postId: photoData.id,
                    message: 'Published to Facebook with image!',
                    url: `https://www.facebook.com/${pageId}/posts/${photoData.id}`,
                });
            }
        }

        // Text-only post
        const response = await fetch(
            `https://graph.facebook.com/v19.0/${pageId}/feed`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            }
        );

        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(data.error?.message || 'Failed to publish to Facebook');
        }

        return NextResponse.json({
            success: true,
            postId: data.id,
            message: 'Published to Facebook!',
            url: `https://www.facebook.com/${pageId}`,
        });

    } catch (error: any) {
        console.error('Facebook Publish Error:', error);
        return NextResponse.json({ error: error.message || 'Publishing failed' }, { status: 500 });
    }
}
