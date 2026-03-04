"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Send, ArrowLeft } from 'lucide-react';
import { dictionaries, Language } from '../dictionaries';
import Link from 'next/link';

export default function EstimatePage() {
    const [lang, setLang] = useState<Language>('en');
    const t = dictionaries[lang];

    return (
        <main className="min-h-screen bg-[#000000] text-white selection:bg-[#00ffcc] selection:text-black font-sans relative overflow-x-hidden pt-20 pb-12">
            {/* Navigation & Language Switcher */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto backdrop-blur-md bg-black/50 border-b border-white/5">
                <Link href="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold tracking-tighter cursor-pointer flex items-center gap-2 hover:text-[#00ffcc] transition-colors"
                    >
                        <ArrowLeft size={20} /> Back to Portfolio
                    </motion.div>
                </Link>
                <div className="flex items-center gap-8">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 text-xs font-mono">
                        <button onClick={() => setLang('en')} className={`px-2 py-1 rounded border ${lang === 'en' ? 'bg-[#00ffcc]/10 border-[#00ffcc] text-[#00ffcc]' : 'border-white/10 text-gray-500 hover:text-white'}`}>EN</button>
                        <button onClick={() => setLang('es')} className={`px-2 py-1 rounded border ${lang === 'es' ? 'bg-[#00ffcc]/10 border-[#00ffcc] text-[#00ffcc]' : 'border-white/10 text-gray-500 hover:text-white'}`}>ES</button>
                        <button onClick={() => setLang('ru')} className={`px-2 py-1 rounded border ${lang === 'ru' ? 'bg-[#00ffcc]/10 border-[#00ffcc] text-[#00ffcc]' : 'border-white/10 text-gray-500 hover:text-white'}`}>RU</button>
                    </motion.div>
                </div>
            </header>

            {/* Project Estimator Section */}
            <section className="px-6 relative flex flex-col items-center mt-12">
                <div className="max-w-4xl mx-auto w-full">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00ffcc] text-xs font-mono mb-6">
                            <Calculator size={14} /> {t.estimate.subtitle}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.estimate.title}</h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                            {t.estimate.description}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                        className="bg-[#111111] border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden"
                    >
                        {/* Form Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ffcc]/5 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-[80px] pointer-events-none"></div>

                        <form className="relative z-10 space-y-8" action="https://formsubmit.co/sanda.veisa@gmail.com" method="POST">
                            <input type="hidden" name="_subject" value="New Project Estimate - Sanda Portfolio!" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-400">{t.estimate.name}</label>
                                    <input type="text" name="name" required className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-4 text-white hover:border-white/20 focus:outline-none focus:border-[#00ffcc] transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-400">{t.estimate.email}</label>
                                    <input type="email" name="email" required className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-4 text-white hover:border-white/20 focus:outline-none focus:border-[#00ffcc] transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-400">{t.estimate.projectType}</label>
                                    <select name="project_type" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-4 text-white hover:border-white/20 focus:outline-none focus:border-[#00ffcc] transition-colors appearance-none cursor-pointer">
                                        <option value="web">{t.estimate.typeOptions.web}</option>
                                        <option value="app">{t.estimate.typeOptions.app}</option>
                                        <option value="ecommerce">{t.estimate.typeOptions.ecommerce}</option>
                                        <option value="other">{t.estimate.typeOptions.other}</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-400">{t.estimate.budget}</label>
                                    <select name="budget" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-4 text-white hover:border-white/20 focus:outline-none focus:border-[#00ffcc] transition-colors appearance-none cursor-pointer">
                                        <option value="medium">{t.estimate.budgetOptions.medium}</option>
                                        <option value="small">{t.estimate.budgetOptions.small}</option>
                                        <option value="large">{t.estimate.budgetOptions.large}</option>
                                        <option value="enterprise">{t.estimate.budgetOptions.enterprise}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-400">{t.estimate.details}</label>
                                <textarea name="details" rows={5} required className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-4 text-white hover:border-white/20 focus:outline-none focus:border-[#00ffcc] transition-colors resize-none"></textarea>
                            </div>

                            <button type="submit" className="w-full text-lg bg-[#00ffcc] text-black font-semibold rounded-xl px-4 py-5 hover:bg-white hover:shadow-[0_0_30px_rgba(0,255,204,0.4)] transition-all flex items-center justify-center gap-2 mt-4">
                                {t.estimate.submit} <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
