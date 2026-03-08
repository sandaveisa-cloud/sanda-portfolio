"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsAndConditions() {
    return (
        <main className="min-h-screen bg-[#000000] text-gray-300 font-sans relative pt-20 pb-24 selection:bg-[#3b82f6] selection:text-white">
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 max-w-4xl mx-auto backdrop-blur-md bg-black/50 border-b border-white/5">
                <Link href="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold tracking-tighter cursor-pointer flex items-center gap-2 hover:text-[#3b82f6] transition-colors text-white"
                    >
                        <ArrowLeft size={20} /> Back to Hub
                    </motion.div>
                </Link>
            </header>

            <motion.article
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="max-w-3xl mx-auto px-6 mt-12 space-y-8"
            >
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Terms & Conditions</h1>
                    <p className="text-[#3b82f6] font-mono text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">1. Agreement to Terms</h2>
                    <p className="leading-relaxed font-light">
                        By accessing this website, you agree to be bound by these Terms and Conditions and agree that you are responsible for compliance with any applicable local laws.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">2. Intellectual Property Rights</h2>
                    <p className="leading-relaxed font-light">
                        The visual architecture, code mechanics, design assets, and custom text content on this site are the intellectual property of Sanda Veisa, unless otherwise stated.
                        They may not be extracted, copied, or reproduced without explicit written consent.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">3. Services & Collaboration</h2>
                    <p className="leading-relaxed font-light">
                        Any project estimates provided via the Estimator tool are initially non-binding calculations for discussion purposes.
                        A formal, binding agreement or contract will be presented and signed by both parties before any engineering or architectural work commences.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">4. Disclaimers</h2>
                    <p className="leading-relaxed font-light">
                        The materials on this website are provided on an 'as is' basis. While we strive for extreme precision and uptime, we make no warranties, expressed or implied, regarding the uninterrupted availability of this portfolio.
                    </p>
                </section>

            </motion.article>
        </main>
    );
}
