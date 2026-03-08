"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, Database, Loader2, Sparkles, CheckCircle2, Languages } from 'lucide-react';
import Link from 'next/link';

// Supabase Setup
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

type SocialPost = {
    platform: 'LinkedIn' | 'Facebook' | 'Instagram';
    content: {
        EN: string;
        LV?: string;
        DE?: string;
        RU: string;
        ES: string;
    };
    hashtags: string[];
};

type Campaign = {
    id: string;
    prompt: string;
    content: SocialPost[];
    created_at: string;
};

type CampaignResult = SocialPost[] | {
    imagePrompt: string;
    posts: SocialPost[];
};

export default function AdminBrain() {
    const [prompt, setPrompt] = useState('');
    const [brand, setBrand] = useState<'sanda' | 'balearic'>('sanda');
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState<'LinkedIn' | 'Facebook' | 'Instagram'>('LinkedIn');
    const [activeLang, setActiveLang] = useState<'EN' | 'LV' | 'RU' | 'ES' | 'DE'>('EN');

    const availableLangs = brand === 'sanda'
        ? ['EN', 'LV', 'RU', 'ES']
        : ['EN', 'DE', 'RU', 'ES'];

    const [currentResult, setCurrentResult] = useState<CampaignResult | null>(null);
    const [history, setHistory] = useState<Campaign[]>([]);
    const [authSecret, setAuthSecret] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Simple hardcoded auth for the secret route
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (authSecret === 'sanda2026') {
            setIsAuthenticated(true);
            fetchHistory();
        } else {
            alert("Unauthorized Access");
        }
    };

    const fetchHistory = async () => {
        const { data, error } = await supabase
            .from('ai_marketing_campaigns')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        if (data) setHistory(data);
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setCurrentResult(null);

        try {
            const response = await fetch('/api/generate-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, brand })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Failed to generate');

            setCurrentResult(data.content);

            // Refresh history to show the new save
            fetchHistory();
            setPrompt('');

        } catch (error: any) {
            console.error(error);
            alert('Generation Failed: ' + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#050505] text-[#00ffcc] flex items-center justify-center font-mono">
                <form onSubmit={handleLogin} className="bg-[#111111] p-8 rounded-lg border border-[#333] shadow-2xl max-w-md w-full">
                    <div className="flex items-center gap-3 mb-6 border-b border-[#333] pb-4">
                        <Terminal size={24} />
                        <h1 className="text-xl">NEURAL_LINK_AUTH</h1>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Enter master override key to access the AI Marketing Brain.</p>
                    <input
                        type="password"
                        value={authSecret}
                        onChange={(e) => setAuthSecret(e.target.value)}
                        className="w-full bg-black border border-[#333] rounded px-4 py-2 text-white focus:outline-none focus:border-[#00ffcc] mb-6"
                        placeholder="ACCESS_CODE"
                        autoFocus
                    />
                    <button type="submit" className="w-full bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc] hover:bg-[#00ffcc] hover:text-black font-bold py-2 rounded transition-all">
                        INITIALIZE
                    </button>
                </form>
            </div>
        );
    }

    // Dashboard Screen
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-10">

            {/* Header */}
            <header className="flex justify-between items-center border-b border-white/10 pb-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00ffcc] to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,204,0.3)]">
                        <Sparkles className="text-black" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">AI Marketing Brain</h1>
                        <p className="text-[#00ffcc] font-mono text-xs mt-1">SANDA_VEISA_SYSTEMS // v2.0</p>
                    </div>
                </div>
                <Link href="/" className="px-4 py-2 rounded border border-white/10 text-gray-400 hover:text-white transition-colors text-sm font-mono">
                    Return to Portfolio
                </Link>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Column: Input Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl shadow-xl">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Terminal size={18} className="text-[#3b82f6]" /> Campaign Briefing
                        </h2>
                        <form onSubmit={handleGenerate}>
                            <div className="space-y-4">
                                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                                    Select the target brand and enter project details. The Neural Engine will expand this into premium multi-lingual ad copy.
                                </p>

                                {/* Brand Selector */}
                                <div className="flex bg-black rounded-lg border border-white/10 p-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setBrand('sanda');
                                            if (activeLang === 'DE') setActiveLang('EN');
                                        }}
                                        className={`flex-1 py-2 text-xs font-bold font-mono transition-all rounded ${brand === 'sanda' ? 'bg-[#00ffcc] text-black shadow-md' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        SANDA VEISA
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setBrand('balearic');
                                            if (activeLang === 'LV') setActiveLang('EN');
                                        }}
                                        className={`flex-1 py-2 text-xs font-bold font-mono transition-all rounded ${brand === 'balearic' ? 'bg-[#3b82f6] text-white shadow-md' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        BALEARIC YACHT
                                    </button>
                                </div>

                                <textarea
                                    rows={8}
                                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00ffcc] transition-colors resize-none font-sans text-sm"
                                    placeholder={brand === 'sanda'
                                        ? "e.g.: I just finished the Moonlit Keen Design ecommerce site. It's a luxury brand specializing in home decor..."
                                        : "e.g.: Announcing our new 2026 fleet of 400 S2 Catamarans for luxury Mediterranean summer charters..."}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    disabled={isGenerating}
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={isGenerating || !prompt.trim()}
                                    className={`w-full font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${isGenerating ? 'bg-[#333] text-gray-500 cursor-not-allowed' : 'bg-[#00ffcc] text-black hover:bg-white hover:shadow-[0_0_15px_rgba(0,255,204,0.4)]'}`}
                                >
                                    {isGenerating ? (
                                        <><Loader2 size={18} className="animate-spin" /> ENGAGING NEURAL NETWORK...</>
                                    ) : (
                                        <><Send size={18} /> GENERATE CAMPAIGN</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* History Widget */}
                    <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl shadow-xl">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Database size={18} className="text-purple-500" /> Recent Generations
                        </h2>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {history.length === 0 ? (
                                <p className="text-gray-500 text-sm font-mono text-center py-8">No campaigns found in database.</p>
                            ) : (
                                history.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setCurrentResult(item.content)}
                                        className="w-full text-left p-3 rounded-lg bg-black/50 border border-white/5 hover:border-[#00ffcc]/50 transition-colors group"
                                    >
                                        <div className="text-xs text-gray-500 font-mono mb-1">{new Date(item.created_at).toLocaleDateString()}</div>
                                        <div className="text-sm text-gray-300 truncate group-hover:text-white">{item.prompt}</div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Output Display */}
                <div className="lg:col-span-2">
                    {currentResult ? (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111111] border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full min-h-[600px]">

                            {/* Platform Tabs */}
                            <div className="flex border-b border-white/10 bg-black/40">
                                {['LinkedIn', 'Facebook', 'Instagram'].map(platform => (
                                    <button
                                        key={platform}
                                        onClick={() => setActiveTab(platform as any)}
                                        className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === platform ? 'bg-[#1a1a1a] text-white border-b-2 border-[#00ffcc]' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        {platform}
                                    </button>
                                ))}
                            </div>

                            {/* Language SubTabs */}
                            <div className="flex bg-[#1a1a1a] border-b border-white/5 px-4 py-3 gap-2 overflow-x-auto">
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-mono mr-4"><Languages size={14} /> LOCALIZATION:</div>
                                {availableLangs.map(lang => (
                                    <button
                                        key={lang}
                                        onClick={() => setActiveLang(lang as any)}
                                        className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${activeLang === lang ? 'bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30' : 'bg-black/50 text-gray-400 border border-white/5 hover:border-white/20'}`}
                                    >
                                        {lang === 'EN' ? '🇬🇧 EN' : lang === 'LV' ? '🇱🇻 LV' : lang === 'DE' ? '🇩🇪 DE' : lang === 'RU' ? '🇷🇺 RU' : '🇪🇸 ES'}
                                    </button>
                                ))}
                            </div>

                            {/* Content Area */}
                            <div className="p-8 flex-1 bg-[#161616] overflow-y-auto">
                                {(() => {
                                    const posts = Array.isArray(currentResult) ? currentResult : currentResult.posts;
                                    const imagePrompt = !Array.isArray(currentResult) ? currentResult.imagePrompt : null;

                                    return (
                                        <div className="h-full flex flex-col xl:flex-row gap-8">
                                            {/* Left side: Content */}
                                            <div className="flex-1 min-w-0">
                                                {posts?.map((post: SocialPost, idx: number) => {
                                                    if (post.platform !== activeTab) return null;

                                                    return (
                                                        <div key={idx} className="h-full flex flex-col">
                                                            <div className="flex items-center justify-between mb-6">
                                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                                                                    <CheckCircle2 size={14} /> READY FOR DEPLOYMENT
                                                                </span>
                                                                <button
                                                                    onClick={() => {
                                                                        navigator.clipboard.writeText(post.content[activeLang] + '\n\n' + post.hashtags.join(' '));
                                                                        alert('Copied to clipboard!');
                                                                    }}
                                                                    className="text-[#3b82f6] text-sm font-mono hover:text-white hover:underline"
                                                                >
                                                                    [ COPY TO CLIPBOARD ]
                                                                </button>
                                                            </div>

                                                            <div className="flex-1 bg-black/60 rounded-xl border border-white/10 p-6 whitespace-pre-wrap font-sans text-gray-200 leading-relaxed overflow-y-auto">
                                                                {post.content[activeLang]}

                                                                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
                                                                    {post.hashtags.map((tag: string, i: number) => (
                                                                        <span key={i} className="text-[#3b82f6] text-sm">{tag}</span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Right side: AI Generated Image */}
                                            {imagePrompt && (
                                                <div className="w-full xl:w-72 flex flex-col gap-3">
                                                    <span className="text-gray-400 text-xs font-mono flex items-center gap-2 uppercase">
                                                        <Sparkles size={14} className="text-[#00ffcc]" /> AI Generated Asset
                                                    </span>
                                                    <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-white/10 bg-black/40 group flex items-center justify-center">
                                                        <img
                                                            src={`/api/generate-image?prompt=${encodeURIComponent(imagePrompt as string)}`}
                                                            alt="AI Generated Marketing Visual"
                                                            className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                console.error("Image failed to load via direct link, it might be blocked by browser shields.");
                                                            }}
                                                        />
                                                        <div className="absolute z-20 inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                            <a
                                                                href={`/api/generate-image?prompt=${encodeURIComponent(imagePrompt as string)}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-xs font-bold bg-[#00ffcc] text-black px-3 py-1.5 rounded hover:bg-white transition-colors"
                                                            >
                                                                Download HD
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] text-gray-600 font-mono leading-tight">
                                                        Prompt: {String(imagePrompt).length > 80 ? String(imagePrompt).substring(0, 80) + '...' : imagePrompt}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full min-h-[600px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-10 text-center">
                            <div className="w-20 h-20 rounded-full bg-[#111] flex items-center justify-center border border-white/5 mb-6 shadow-xl">
                                <Sparkles className="text-gray-600" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-400 mb-2">Awaiting Neural Input</h3>
                            <p className="text-gray-600 max-w-sm">Enter a project description on the left to synthesize premium marketing assets across 4 languages.</p>
                        </div>
                    )
                    }
                </div >
            </div >
        </div >
    );
}
