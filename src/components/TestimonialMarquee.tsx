"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export type Testimonial = {
    id: string;
    name: string;
    role: string;
    company?: string;
    content: string;
    rating: number;
};

export default function TestimonialMarquee({ t }: { t: Record<string, any> }) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function fetchTestimonials() {
            try {
                const { data, error } = await supabase
                    .from('testimonials')
                    .select('*')
                    .eq('is_approved', true)
                    .order('created_at', { ascending: false });

                if (!error && data && isMounted) {
                    setTestimonials(data);
                }
            } catch (e) {
                console.error("Testimonial fetch error:", e);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }
        fetchTestimonials();
        return () => { isMounted = false; };
    }, []);

    if (isLoading || testimonials.length === 0) return null;

    // To make an infinite marquee, we duplicate the array a few times so it loops seamlessly.
    // If there are very few items, duplicate more to fill the screen breadth.
    let marqueeItems = [...testimonials];
    if (testimonials.length > 0) {
        while (marqueeItems.length < 10) {
            marqueeItems = [...marqueeItems, ...testimonials];
        }
    }

    return (
        <section className="py-24 relative bg-[#070707] border-y border-white/5 overflow-hidden z-10">
            <div className="max-w-6xl mx-auto px-6 mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-4 text-white">
                        <Star className="text-[#00ffcc]" size={40} />
                        {t.testimonials.title}
                    </h2>
                    <div className="text-gray-500 font-mono text-sm border-b border-gray-600 pb-1 w-fit">
                        {t.testimonials.subtitle}
                    </div>
                </div>
            </div>

            <div className="relative flex overflow-x-hidden">
                {/* Fading Edges for Marquee */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#070707] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#070707] to-transparent z-10 pointer-events-none"></div>

                <motion.div
                    className="flex gap-6 px-3 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: marqueeItems.length * 4, // Adjust speed based on item count
                    }}
                >
                    {marqueeItems.map((testimonial, idx) => (
                        <div
                            key={`testim-${testimonial.id}-${idx}`}
                            className="w-[300px] md:w-[420px] p-8 rounded-2xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/10 shrink-0 whitespace-normal flex flex-col shadow-2xl transition-all hover:border-[#00ffcc]/30"
                        >
                            <div className="flex-grow">
                                <div className="flex text-[#00ffcc] mb-6 gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < testimonial.rating ? "currentColor" : "none"} className={i < testimonial.rating ? "text-[#00ffcc]" : "text-gray-700"} />
                                    ))}
                                </div>
                                <p className="text-gray-300 text-lg leading-relaxed font-light mb-8 italic">
                                    &quot;{testimonial.content}&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-5">
                                <div className="w-10 h-10 rounded-full bg-[#00ffcc]/10 flex items-center justify-center font-bold text-[#00ffcc] border border-[#00ffcc]/30 shrink-0">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-white text-sm truncate">{testimonial.name}</h4>
                                    <p className="text-gray-500 text-xs font-mono truncate">{testimonial.role}{testimonial.company ? ` @ ${testimonial.company}` : ''}</p>
                                </div>
                                <span title={t.testimonials.badge} className="ml-auto shrink-0 flex">
                                    <ShieldCheck size={20} className="text-[#00ffcc]/50" />
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
