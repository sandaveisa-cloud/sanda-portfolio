"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Globe, Server, Database, ChevronRight, Mail, Github, Linkedin, Calculator, Send, Facebook, Search, Zap, Shield } from 'lucide-react';
import { dictionaries, Language } from '../dictionaries';

export default function Portfolio() {
  const [typedCode, setTypedCode] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  // Multi-language State
  const [lang, setLang] = useState<Language>('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = dictionaries[lang];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/sanda.veisa@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 8000); // Hide after 8 seconds
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const codeToType = `const developer = {
  name: "Sanda Veisa",
  role: "Modern Web Architect",
  core_stack: ["Next.js", "React", "Supabase", "WordPress", "Tailwind"],
  languages: {
    fluent: ["Latvian", "Russian", "English"],
    learning: ["Spanish"]
  },
  projects: [
    "Moonlit Keen Design", 
    "Gardais Kumoss", 
    "Balearic Yacht Charter", 
    "Bulkotava"
  ]
};

developer.buildExperience();`;

  // Typing effect at the beginning
  useEffect(() => {
    if (showPortfolio) return;
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedCode(codeToType.substring(0, i));
      i++;
      if (i > codeToType.length) {
        clearInterval(typingInterval);
        setTimeout(() => setIsBuilding(true), 500);
        setTimeout(() => setShowPortfolio(true), 1200); // Transitions to full site much faster
      }
    }, 20); // Faster typing speed

    return () => clearInterval(typingInterval);
  }, [showPortfolio]);

  // View: Terminal Intro Screen
  if (!showPortfolio) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-[#00ffcc] flex flex-col items-center justify-center font-mono p-4">
        <div className="max-w-3xl w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#111111] rounded-lg border border-[#333] shadow-2xl shadow-[#00ffcc]/10 overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 bg-[#1a1a1a] border-b border-[#333]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto text-xs text-gray-500 font-sans tracking-widest">sanda_veisa_init.tsx</div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-10 h-[450px] overflow-hidden relative">
              <pre className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                <code>{typedCode}</code>
                <span className="animate-pulse ml-1 inline-block w-2 h-5 bg-[#00ffcc] align-middle"></span>
              </pre>

              <AnimatePresence>
                {isBuilding && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 border-4 border-[#00ffcc] border-t-transparent rounded-full animate-spin mb-6"></div>
                    <p className="text-[#00ffcc] text-lg animate-pulse tracking-widest">Compiling awesome interface...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // View: Actual Stunning Portfolio
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#00ffcc] selection:text-black font-sans relative overflow-hidden">

      {/* Abstract Background pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/5 gap-4 md:gap-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
        >
          SandaVeisa<span className="text-[#00ffcc]">.</span>
        </motion.div>
        <div className="flex items-center gap-8">
          <motion.nav
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="hidden md:flex gap-6 text-sm font-medium text-gray-400"
          >
            <a href="#about" className="hover:text-[#00ffcc] transition-colors">{t.nav.vision}</a>
            <a href="#projects" className="hover:text-[#00ffcc] transition-colors">{t.nav.projects}</a>
            <a href="#estimate" className="hover:text-[#00ffcc] transition-colors">{t.nav.estimate}</a>
            <a href="#contact" className="hover:text-[#00ffcc] transition-colors">{t.nav.contact}</a>
          </motion.nav>

          {/* Language Switcher */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 text-xs font-mono">
            <button onClick={() => setLang('en')} className={`px-2 py-1 rounded border ${lang === 'en' ? 'bg-[#00ffcc]/10 border-[#00ffcc] text-[#00ffcc]' : 'border-white/10 text-gray-500 hover:text-white'}`}>EN</button>
            <button onClick={() => setLang('es')} className={`px-2 py-1 rounded border ${lang === 'es' ? 'bg-[#00ffcc]/10 border-[#00ffcc] text-[#00ffcc]' : 'border-white/10 text-gray-500 hover:text-white'}`}>ES</button>
            <button onClick={() => setLang('ru')} className={`px-2 py-1 rounded border ${lang === 'ru' ? 'bg-[#00ffcc]/10 border-[#00ffcc] text-[#00ffcc]' : 'border-white/10 text-gray-500 hover:text-white'}`}>RU</button>
          </motion.div>
        </div>
      </header>

      {/* Hero Banner Area */}
      <section className="relative pt-40 pb-20 px-6 max-w-6xl mx-auto flex flex-col justify-center min-h-[80vh] z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute -top-[100px] -right-[100px] w-96 h-96 bg-[#00ffcc]/10 rounded-full blur-[120px] pointer-events-none"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00ffcc] text-xs font-mono mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffcc] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ffcc]"></span>
            </span>
            {t.hero.systemStatus}
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            {t.hero.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#3b82f6]">{t.hero.title2}</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10 font-light">
            {t.hero.description}
          </p>

          <div className="flex gap-4">
            <a href="#projects" className="px-7 py-3.5 rounded bg-[#00ffcc] text-black font-semibold hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,204,0.4)] transition-all flex items-center gap-2">
              {t.hero.exploreBtn} <ChevronRight size={18} />
            </a>
            <a href="mailto:sanda.veisa@gmail.com" className="px-7 py-3.5 rounded bg-transparent border border-white/20 hover:bg-white/5 transition-all font-medium flex items-center gap-2 text-white">
              <Mail size={18} /> {t.hero.talkBtn}
            </a>
          </div>
        </motion.div>
      </section>

      {/* Projects Timeline Area */}
      <section id="projects" className="py-24 px-6 relative z-10 bg-[#070707] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-4">
              <Code2 className="text-[#00ffcc]" size={40} />
              {t.projects.title}
            </h2>
            <div className="hidden md:block text-gray-500 font-mono text-sm border-b border-gray-600 pb-1">
              {t.projects.subtitle}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Project 1: Moonlit Keen Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative rounded-2xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/10 overflow-hidden transition-all hover:border-[#ec4899]/40 flex flex-col md:flex-row shadow-2xl"
            >
              <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 relative">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded bg-[#ec4899]/10 text-[#ec4899] text-xs font-mono border border-[#ec4899]/30 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ec4899] animate-pulse"></span> {t.projects.inDevelopment}
                  </span>
                  <span className="px-3 py-1 rounded bg-white/5 text-white text-xs font-mono border border-white/10">Next.js / Headless</span>
                  <span className="px-3 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono border border-indigo-500/20">Brand Experience</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
                  Moonlit Keen Design
                </h3>
                <div className="flex items-center gap-2 text-gray-400 font-mono text-sm mb-4 bg-black/30 w-fit px-3 py-1 rounded border border-white/5">
                  <Globe size={14} className="text-[#ec4899]" /> mk-design-homedecor.company.site <span className="ml-2 text-[10px] text-gray-500 px-1.5 py-0.5 border border-gray-500/30 rounded-full">TRANSITIONING</span>
                </div>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg font-light">
                  A massive, highly ambitious eCommerce and luxury brand experience platform. We are currently architecting the transition from a basic template to a super-stylish, beautifully animated, premium web platform tailored for bespoke home decor.
                </p>
                <div className="flex items-center text-[#ec4899] text-sm font-semibold opacity-60 group-hover:opacity-100 transition-opacity transform translate-x-[-5px] group-hover:translate-x-0">
                  <a href="https://mk-design-homedecor.company.site/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    View Live Staging <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
              <div className="w-full md:w-[40%] bg-black/80 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at center, #ec4899 0%, transparent 70%)' }}></div>
                <div className="relative z-10 w-full h-full border border-[#ec4899]/20 bg-[#ec4899]/10 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center p-6 text-center shadow-inner">
                  <Code2 size={48} className="text-[#ec4899]/50 mb-4 animate-pulse" />
                  <p className="text-[#ec4899]/70 font-mono text-xs uppercase tracking-widest">[ Blueprinting Layouts ]</p>
                </div>
              </div>
            </motion.div>

            {/* Project 2: Balearic Yacht Charter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative rounded-2xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/10 overflow-hidden transition-all hover:border-[#00ffcc]/40 flex flex-col md:flex-row shadow-2xl"
            >
              <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">Supabase</span>
                  <span className="px-3 py-1 rounded bg-white/5 text-white text-xs font-mono border border-white/10">Next.js / React</span>
                  <span className="px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20">Vercel</span>
                  <span className="px-3 py-1 rounded bg-orange-500/10 text-orange-400 text-xs font-mono border border-orange-500/20">Git</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
                  Balearic Yacht Charter
                  <a href="https://www.balearicyachtcharters.com/en" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00ffcc] transition-colors" title="View Live">
                    <Globe size={24} />
                  </a>
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg font-light">
                  A high-end, headless architecture platform engineered for luxury yacht charters. Connecting a blazingly fast frontend (deployed globally on Vercel's edge network) with deeply relational, secure cloud databases on Supabase.
                </p>
                <div className="flex items-center text-[#00ffcc] text-sm font-semibold opacity-60 group-hover:opacity-100 transition-opacity transform translate-x-[-5px] group-hover:translate-x-0">
                  <a href="https://www.balearicyachtcharters.com/en" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {t.projects.exploreLive} <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>

              {/* Abstract Visuals for Project */}
              <div className="w-full md:w-[40%] bg-black/50 p-6 flex flex-col justify-center relative border-l border-white/5 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at right center, #3b82f6 0%, transparent 70%)' }}></div>
                <div className="relative z-10 space-y-4 font-mono text-xs text-blue-300">
                  <div className="p-3 bg-black/60 rounded border border-blue-900/50 backdrop-blur-md">
                    <span>{'>'} connection established...</span><br />
                    <span>{'>'} querying yacht directory...</span><br />
                    <span className="text-emerald-400">200 OK — Supabase Engine</span>
                  </div>
                  <Database size={80} className="mx-auto mt-8 text-blue-500/40 animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Project 2: Gardais Kumoss */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative rounded-2xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/10 overflow-hidden transition-all hover:border-[#C59D5F]/50 flex flex-col md:flex-row-reverse shadow-2xl"
            >
              <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded bg-[#C59D5F]/10 text-[#C59D5F] text-xs font-mono border border-[#C59D5F]/30">WordPress Custom Theme</span>
                  <span className="px-3 py-1 rounded bg-yellow-400/10 text-yellow-300 text-xs font-mono border border-yellow-400/20">PHP Engine</span>
                  <span className="px-3 py-1 rounded bg-purple-500/10 text-purple-400 text-xs font-mono border border-purple-500/20">WooCommerce</span>
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white flex items-center gap-3">
                  Gardais Kumoss
                  <a href="https://gardaiskumoss.co.uk" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#C59D5F] transition-colors" title="View Live">
                    <Globe size={24} />
                  </a>
                </h3>
                <div className="flex items-center gap-2 text-gray-400 font-mono text-sm mb-4 bg-black/30 w-fit px-3 py-1 rounded border border-white/5">
                  <Globe size={14} className="text-[#C59D5F]" /> gardaiskumoss.co.uk <span className="ml-2 text-[10px] text-emerald-500 px-1.5 py-0.5 border border-emerald-500/30 rounded-full">{t.projects.live}</span>
                </div>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg font-light">
                  A bespoke, premium confectionery platform. Successfully migrated to a high-performance live environment. Features a perfectly integrated bilingual setup (Polylang) and a 100% custom React-based Cake Constructor with WhatsApp automated checkout.
                </p>
                <div className="flex items-center text-[#C59D5F] text-sm font-semibold opacity-60 group-hover:opacity-100 transition-opacity transform translate-x-[-5px] group-hover:translate-x-0">
                  <a href="https://gardaiskumoss.co.uk" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Explore Modern Patisserie <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>

              <div className="w-full md:w-[40%] bg-black/50 p-6 flex flex-col justify-center border-r border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at left center, #C59D5F 0%, transparent 70%)' }}></div>
                {/* Code Window visual */}
                <div className="relative z-10 bg-[#0a0a0a] rounded-lg border border-[#333] p-4 shadow-xl">
                  <div className="flex gap-1.5 mb-4 border-b border-[#222] pb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <pre className="font-mono text-[10px] sm:text-xs text-gray-400 leading-relaxed">
                    <span className="text-pink-400">function</span> <span className="text-blue-300">gk_cake_builder_render</span>() {'{'}<br />
                    &nbsp;&nbsp;<span className="text-gray-500">// Bypassing defaults for pure speed</span><br />
                    &nbsp;&nbsp;<span className="text-pink-400">echo</span> <span className="text-yellow-300">"&lt;div class='premium-UI'&gt;"</span>;<br />
                    &nbsp;&nbsp;<span className="text-blue-300">process_whatsapp_logic</span>();<br />
                    {'}'}
                  </pre>
                </div>
              </div>
            </motion.div>

            {/* Project 3: Lovable (Bulkotava) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative rounded-2xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/10 overflow-hidden transition-all hover:border-white/40 flex flex-col md:flex-row shadow-2xl"
            >
              <div className="w-full border-b md:border-b-0 md:border-r border-white/5 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded bg-white/10 text-white text-xs font-mono border border-white/20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse"></span> {t.projects.inDevelopment}
                  </span>
                  <span className="px-3 py-1 rounded bg-red-500/10 text-red-400 text-xs font-mono border border-red-500/20">Lovable Engine</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">Bulkotava</h3>
                <p className="text-gray-400 mb-0 leading-relaxed text-lg font-light">
                  A modern web application currently in active architectural staging. Utilizing the capabilities of the Lovable engine to establish foundation logic and UI/UX standards, while awaiting final client media and content for the official production build.
                </p>
              </div>
              <div className="w-full md:w-64 bg-black/80 flex items-center justify-center p-8 relative">
                <div className="grid grid-cols-3 gap-2 w-full h-full opacity-30">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-sm h-8 w-full animate-pulse" style={{ animationDelay: `$\{i * 0.15}s` }}></div>
                  ))}
                </div>
                <Server size={48} className="text-white/50 absolute z-10 animate-bounce" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* About & Stack Section */}
      <section id="about" className="py-24 px-6 relative bg-[#050505]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Globe className="text-[#00ffcc]" size={32} /> {t.about.title1}
            </h2>
            <div className="p-8 rounded-2xl bg-[#0e0e0e] border border-white/5">
              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light" dangerouslySetInnerHTML={{ __html: t.about.description1 }}></p>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400">Latvian 🇱🇻</span> <span className="text-[#00ffcc] font-mono text-sm">{t.about.native}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400">Russian 🇷🇺</span> <span className="text-[#00ffcc] font-mono text-sm">{t.about.native}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400">English 🇬🇧</span> <span className="text-[#00ffcc] font-mono text-sm">{t.about.fluent}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-400">Spanish 🇪🇸</span> <span className="text-yellow-500 font-mono text-sm">{t.about.learning}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Terminal className="text-[#00ffcc]" size={32} /> {t.about.title2}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-[#0e0e0e] border border-white/5 hover:border-[#00ffcc]/30 transition-colors">
                <h4 className="font-bold text-white mb-2 text-lg">Frontend</h4>
                <p className="text-gray-500 leading-relaxed">React, Next.js, Tailwind CSS, TypeScript, JavaScript, HTML5/CSS3</p>
              </div>
              <div className="p-6 rounded-xl bg-[#0e0e0e] border border-white/5 hover:border-[#3b82f6]/30 transition-colors">
                <h4 className="font-bold text-white mb-2 text-lg">Backend</h4>
                <p className="text-gray-500 leading-relaxed">Supabase, Node.js, PHP, Relational Databases</p>
              </div>
              <div className="p-6 rounded-xl bg-[#0e0e0e] border border-white/5 hover:border-[#C59D5F]/30 transition-colors">
                <h4 className="font-bold text-white mb-2 text-lg">CMS Engineering</h4>
                <p className="text-gray-500 leading-relaxed">Custom WordPress Themes, Plugin Arch., WooCommerce</p>
              </div>
              <div className="p-6 rounded-xl bg-[#0e0e0e] border border-white/5 hover:border-white/30 transition-colors">
                <h4 className="font-bold text-white mb-2 text-lg">Infrastructure</h4>
                <p className="text-gray-500 leading-relaxed">Vercel Edge, Git / Version Control, LocalWP, APIs</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Search/Audit Section */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-[#050505] to-[#0a0a0a] border-y border-white/5 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3b82f6]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center z-10 relative">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#3b82f6] text-xs font-mono mb-6">
              <Search size={14} /> SYSTEM_AUDIT // DIAGNOSTICS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Full System Architecture <br />& SEO Audit
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
              Not sure why your current site is underperforming? I actively conduct deep-dive technical reviews covering codebase quality, loading bottlenecks, and structural SEO metrics. No generic automated tests—only pure, actionable architectural insight.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-[#0e0e0e] p-4 rounded-xl border border-white/5">
                <Zap className="text-yellow-400 shrink-0" size={20} />
                <div>
                  <h4 className="text-white font-medium mb-1">Performance</h4>
                  <p className="text-gray-500 text-sm">Next.js/React optimization, rendering speed, and server response metrics.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#0e0e0e] p-4 rounded-xl border border-white/5">
                <Shield className="text-[#00ffcc] shrink-0" size={20} />
                <div>
                  <h4 className="text-white font-medium mb-1">Code & Security</h4>
                  <p className="text-gray-500 text-sm">Vulnerability checks, CMS bloat, and database structural flaws.</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <a href="#estimate" className="text-[#3b82f6] hover:text-white flex items-center gap-2 font-mono text-sm uppercase tracking-widest transition-colors group">
                Request Full Audit <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <div className="bg-[#111111] border border-[#3b82f6]/20 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-[#3b82f6]/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent opacity-50"></div>
              <div className="space-y-4 font-mono text-sm leading-relaxed">
                <div className="flex justify-between items-center text-gray-400 border-b border-white/5 pb-2">
                  <span>System Rating (Performance)</span> <span className="text-[#00ffcc]">99 / 100</span>
                </div>
                <div className="flex justify-between items-center text-gray-400 border-b border-white/5 pb-2">
                  <span>LCP (Largest Contentful Paint)</span> <span className="text-[#00ffcc]">0.8s avg.</span>
                </div>
                <div className="flex justify-between items-center text-gray-400 border-b border-white/5 pb-2">
                  <span>SEO Meta Integrity Check</span> <span className="text-yellow-400">Warnings Detected</span>
                </div>
                <div className="flex justify-between items-center text-gray-400 pb-2">
                  <span>Database Query Latency</span> <span className="text-[#00ffcc]">&lt;45ms</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enterprise Readiness Banner */}
      <section className="py-20 px-6 relative bg-gradient-to-r from-[#00ffcc]/5 to-[#3b82f6]/5 border-y border-white/5 overflow-hidden">
        {/* Abstract futuristic wave/dots background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%23ffffff\' fill-opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '1.5rem 1.5rem' }}></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#3b82f6] text-xs font-mono mb-4">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse"></span> {t.enterprise?.badge || 'ENTERPRISE SCALABILITY'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              {t.enterprise?.title || 'Architecting for High-Scale Operations'}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light border-l-2 border-[#3b82f6]/50 pl-4">
              {t.enterprise?.description || 'I am fully equipped to lead, program, and deploy complex frameworks for large-scale businesses.'}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="md:w-1/3 flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#3b82f6] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              <div className="relative z-10 bg-[#0e0e0e] border border-white/10 p-8 rounded-full shadow-2xl flex items-center justify-center">
                <Server size={80} className="text-[#3b82f6] opacity-90 group-hover:animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEW: Project Estimator Section */}
      <section id="estimate" className="py-24 px-6 relative bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00ffcc] text-xs font-mono mb-6">
              <Calculator size={14} /> {t.estimate.subtitle}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.estimate.title}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed mb-6">
              {t.estimate.description}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm md:text-base font-medium mx-auto max-w-2xl text-left">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span> {t.estimate.pricingNote}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#111111] border border-white/10 p-8 rounded-2xl shadow-xl relative overflow-hidden"
          >
            {/* Form Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ffcc]/5 rounded-full blur-[80px] pointer-events-none"></div>

            <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="New Project Estimate - Sanda Portfolio!" />

              {/* Success Message Banner */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-[#00ffcc]/10 border border-[#00ffcc] text-[#00ffcc] p-4 rounded-lg flex items-center justify-center text-center font-medium shadow-[0_0_20px_rgba(0,255,204,0.2)] mb-6"
                >
                  {t.estimate.successMessage}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">{t.estimate.name}</label>
                  <input type="text" name="name" required className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">{t.estimate.email}</label>
                  <input type="email" name="email" required className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc] transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">{t.estimate.projectType}</label>
                  <select name="project_type" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc] transition-colors appearance-none">
                    <option value="web">{t.estimate.typeOptions.web}</option>
                    <option value="app">{t.estimate.typeOptions.app}</option>
                    <option value="ecommerce">{t.estimate.typeOptions.ecommerce}</option>
                    <option value="audit">{t.estimate.typeOptions.audit}</option>
                    <option value="other">{t.estimate.typeOptions.other}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">{t.estimate.budget}</label>
                  <select name="budget" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc] transition-colors appearance-none">
                    <option value="medium">{t.estimate.budgetOptions.medium}</option>
                    <option value="small">{t.estimate.budgetOptions.small}</option>
                    <option value="large">{t.estimate.budgetOptions.large}</option>
                    <option value="enterprise">{t.estimate.budgetOptions.enterprise}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">{t.estimate.details}</label>
                <textarea name="details" rows={4} required className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc] transition-colors resize-none"></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-[#00ffcc] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,204,0.4)]'} font-semibold rounded-lg px-4 py-4 transition-all flex items-center justify-center gap-2`}
              >
                {isSubmitting ? 'Processing...' : t.estimate.submit} {!isSubmitting && <Send size={18} />}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer id="contact" className="py-20 text-center border-t border-white/10 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#00ffcc]/50 to-transparent"></div>
        <div className="max-w-2xl mx-auto relative z-10 px-6">
          <h2 className="text-4xl font-bold mb-8">{t.footer.title1} <br /><span className="text-gray-500">{t.footer.title2}</span></h2>
          <div className="flex justify-center gap-6 mb-12 flex-wrap">
            <a href="mailto:sanda.veisa@gmail.com" title="Email" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00ffcc] hover:text-black hover:scale-110 transition-all shadow-[0_0_0_rgba(0,255,204,0)] hover:shadow-[0_0_20px_rgba(0,255,204,0.4)]">
              <Mail size={24} />
            </a>
            <a href="https://www.linkedin.com/in/sanda-veisa-60148a3ab/" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#3b82f6] hover:text-white hover:scale-110 transition-all shadow-none hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/sandaveisa-cloud" title="GitHub" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              <Github size={24} />
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61587802724966" title="Facebook" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877f2] hover:text-white hover:scale-110 transition-all shadow-none hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]">
              <Facebook size={24} />
            </a>
          </div>
          <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Sanda Veisa <span className="text-[#00ffcc] px-2">|</span> {t.footer.copyright}
          </p>
        </div>
      </footer>
    </main >
  );
}
