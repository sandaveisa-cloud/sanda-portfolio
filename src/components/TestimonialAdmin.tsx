"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Loader2, Check, X, Trash2, Star, ShieldAlert } from 'lucide-react';

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
    is_approved: boolean;
};

export default function TestimonialAdmin() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setTestimonials(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const toggleApproval = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from('testimonials')
            .update({ is_approved: !currentStatus })
            .eq('id', id);

        if (!error) {
            setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_approved: !currentStatus } : t));
        }
    };

    const deleteTestimonial = async (id: string) => {
        if (!confirm('Are you sure you want to permanently delete this testimony?')) return;
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (!error) {
            setTestimonials(testimonials.filter(t => t.id !== id));
        }
    };

    if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-[#00ffcc]" size={24} /></div>;

    if (testimonials.length === 0) return (
        <div className="p-12 text-center text-gray-500 border border-dashed border-white/10 rounded-xl">
            <ShieldAlert size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-mono text-sm uppercase">No Testimonials Found in Database</p>
        </div>
    );

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="text-xs text-gray-500 font-mono uppercase bg-black/50 border-b border-white/10">
                    <tr>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Client</th>
                        <th className="px-4 py-3">Rating</th>
                        <th className="px-4 py-3 w-full">Content</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {testimonials.map((t) => (
                        <tr key={t.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-4">
                                {t.is_approved ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                                        <Check size={12} /> LIVE
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-yellow-500/10 text-yellow-400 text-xs font-mono border border-yellow-500/20">
                                        <Loader2 size={12} /> PENDING
                                    </span>
                                )}
                            </td>
                            <td className="px-4 py-4">
                                <div className="font-bold text-white">{t.name}</div>
                                <div className="text-gray-500 text-xs">{t.role} {t.company && `@ ${t.company}`}</div>
                            </td>
                            <td className="px-4 py-4">
                                <div className="flex text-[#00ffcc]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} fill={i < t.rating ? "currentColor" : "none"} className={i < t.rating ? "" : "text-gray-700"} />
                                    ))}
                                </div>
                            </td>
                            <td className="px-4 py-4 max-w-xs truncate text-gray-300">
                                &quot;{t.content}&quot;
                            </td>
                            <td className="px-4 py-4 flex items-center gap-2">
                                <button
                                    onClick={() => toggleApproval(t.id, t.is_approved)}
                                    className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${t.is_approved ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-[#00ffcc] text-black hover:bg-white'}`}
                                >
                                    {t.is_approved ? 'UNPUBLISH' : 'APPROVE'}
                                </button>
                                <button
                                    onClick={() => deleteTestimonial(t.id)}
                                    className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
