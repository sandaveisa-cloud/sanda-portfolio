"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-[#000000] text-gray-300 font-sans relative pt-20 pb-24 selection:bg-[#00ffcc] selection:text-black">
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 max-w-4xl mx-auto backdrop-blur-md bg-black/50 border-b border-white/5">
                <Link href="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold tracking-tighter cursor-pointer flex items-center gap-2 hover:text-[#00ffcc] transition-colors text-white"
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
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Privacy Policy</h1>
                    <p className="text-[#00ffcc] font-mono text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
                    <p className="leading-relaxed font-light">
                        Welcome to the professional portfolio and services network of Sanda Veisa.
                        This Privacy Policy outlines how your personal information is collected, used, and protected when you
                        visit the website or use the contact and estimation forms provided.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">2. Data We Collect</h2>
                    <p className="leading-relaxed font-light">
                        We only collect the minimum amount of data necessary to communicate effectively regarding your project:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 font-light">
                        <li><strong>Contact Information:</strong> Your name and email address when submitted via our Estimate or Contact forms.</li>
                        <li><strong>Project Details:</strong> Information regarding your project type, budget, and requirements voluntarily provided by you.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">3. How We Use Your Data</h2>
                    <p className="leading-relaxed font-light">
                        Any data collected is strictly used for the following purposes:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 font-light">
                        <li>To provide you with accurate project estimates and technical audits.</li>
                        <li>To initiate communication regarding potential engineering and development work.</li>
                    </ul>
                    <p className="leading-relaxed font-light text-[#00ffcc]/80 mt-4 border-l-2 border-[#00ffcc] pl-4 py-1">
                        We do not sell, rent, or lease your personal data to third parties under any circumstances.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">4. Data Security & Storage</h2>
                    <p className="leading-relaxed font-light">
                        Our forms utilize secure external infrastructure, and all transmitted data is secured via standard encryption protocols.
                        If no business relationship is established, communication records are routinely purged to ensure data minimization.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">5. Your Rights (Applicable GDPR)</h2>
                    <p className="leading-relaxed font-light">
                        You have the right to access, update, or request the deletion of the personal data we have collected about you.
                    </p>
                    <p className="leading-relaxed font-light">
                        To exercise these rights, please contact us directly at <a href="mailto:sanda.veisa@gmail.com" className="text-[#00ffcc] hover:underline">sanda.veisa@gmail.com</a>.
                    </p>
                </section>

            </motion.article>
        </main>
    );
}
