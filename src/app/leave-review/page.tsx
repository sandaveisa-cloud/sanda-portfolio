"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { dictionaries, Language } from '../../dictionaries';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function LeaveReviewPage() {
    const [lang, setLang] = useState<Language>('en');
    const t = dictionaries[lang];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [rating, setRating] = useState(5);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const { error } = await supabase.from('testimonials').insert([
                {
                    name: formData.get('name'),
                    role: formData.get('role'),
                    company: formData.get('company') || '',
                    content: formData.get('content'),
                    rating: rating,
                    is_approved: false
                }
            ]);

            if (error) throw error;
            setStatus('success');
            form.reset();
            setRating(5);
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans relative overflow-x-hidden flex flex-col items-center justify-center py-20 px-6">
            {/* Header / Language Switcher */}
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/5 gap-4 md:gap-0">
                <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    SandaVeisa<span className="text-[#00ffcc]">.</span>
                </Link>
                <div className="flex gap-2 text-xs font-mono">
                    <button onClick={() => setLang('en')} className={`px-2 py-1 rounded border ${lang === 'en' ? 'bg-[#00ffcc]/10 border-[#00ffcc] text-[#00ffcc]' : 'border-white/10 text-gray-500 hover:text-white'}`}>EN</button>
                    <button onClick={() => setLang('es')} className={`px-2 py-1 rounded border ${lang === 'es' ? 'bg-[#00ffcc]/10 border-[#00ffcc] text-[#00ffcc]' : 'border-white/10 text-gray-500 hover:text-white'}`}>ES</button>
                    <button onClick={() => setLang('ru')} className={`px-2 py-1 rounded border ${lang === 'ru' ? 'bg-[#00ffcc]/10 border-[#00ffcc] text-[#00ffcc]' : 'border-white/10 text-gray-500 hover:text-white'}`}>RU</button>
                </div>
            </header>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl mt-12 z-10">
                <div className="bg-[#111111] border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ffcc]/5 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="text-center mb-10 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00ffcc] text-xs font-mono mb-6">
                            <ShieldCheck size={14} /> {t.testimonials.badge}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.leaveReview.title}</h1>
                        <p className="text-gray-400 font-light leading-relaxed">{t.leaveReview.description}</p>
                    </div>

                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center p-8 md:p-12 text-center bg-[#00ffcc]/10 border border-[#00ffcc]/30 rounded-xl"
                        >
                            <CheckCircle2 size={64} className="text-[#00ffcc] mb-6 shadow-[0_0_30px_rgba(0,255,204,0.4)] rounded-full" />
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{t.leaveReview.success}</h3>
                            <Link href="/" className="mt-8 px-6 py-3 bg-[#111] border border-white/10 rounded-lg text-white hover:text-[#00ffcc] hover:border-[#00ffcc]/50 transition-colors font-mono text-sm inline-flex items-center gap-2">
                                ← Back to Portfolio
                            </Link>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                                    <AlertCircle size={18} className="shrink-0" /> {t.leaveReview.error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">{t.leaveReview.name} *</label>
                                    <input type="text" name="name" required className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc] transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">{t.leaveReview.role} *</label>
                                    <input type="text" name="role" required placeholder="e.g. CEO, Product Manager" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc] transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Company (Optional)</label>
                                <input type="text" name="company" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc] transition-colors" />
                            </div>

                            <div className="space-y-3 pb-2">
                                <label className="text-sm font-medium text-gray-400">{t.leaveReview.rating} *</label>
                                <div className="flex gap-2 bg-[#050505] border border-white/10 p-3 rounded-lg w-fit">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none p-1 transition-transform hover:scale-110"
                                        >
                                            <Star size={28} fill={star <= rating ? "#00ffcc" : "none"} className={star <= rating ? "text-[#00ffcc]" : "text-gray-600 hover:text-gray-400"} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">{t.leaveReview.content} *</label>
                                <textarea name="content" required rows={5} placeholder="How was the communication, speed, and final result?" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc] transition-colors resize-none"></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full mt-4 ${isSubmitting ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-[#00ffcc] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,204,0.4)]'} font-bold rounded-lg px-4 py-4 transition-all flex items-center justify-center gap-2`}
                            >
                                {isSubmitting ? 'Processing...' : t.leaveReview.submit}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </main>
    );
}
