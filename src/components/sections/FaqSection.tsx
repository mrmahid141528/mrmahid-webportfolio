"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "How long does it take to build a website?",
        answer: "The timeline depends entirely on the project type and the features required. A simple business website or portfolio can be completed in 2 to 5 days. However, custom web applications, school portals, or comprehensive e-commerce stores may take 1 to 20 weeks or more."
    },
    {
        question: "How much will the website development cost?",
        answer: "The cost is based on your specific requirements. A basic landing page starts around ₹5,000, while custom websites with advanced features, custom databases, and admin panels can range from ₹50,000 to over ₹1,00,000. We always discuss your exact needs first to provide a precise estimate."
    },
    {
        question: "Will my website work seamlessly on mobile and tablet?",
        answer: "Yes, absolutely. Every website is built using a strict mobile-first approach. We ensure the user interface is clean, highly responsive, and completely free of visual clutter so that it delivers a premium experience across all devices—mobile, tablet, and desktop."
    },
    {
        question: "How do Domain and Hosting work? Are they included in the price?",
        answer: "A Domain (your website name, like .com or .in) and Hosting (the internet space where your website lives) require annual renewals. We can include these in your complete website package, or you can purchase them independently and provide us with the access details to set everything up."
    },
    {
        question: "Can I update the website myself once it is live?",
        answer: "Yes, we set up a straightforward, manual admin control panel for you. This allows you to easily manage your product catalog, edit text, update images, or post blogs on your own without needing any coding knowledge or dealing with overly complex database setups."
    },
    {
        question: "Will my website rank on Google?",
        answer: "We build the foundation of your website to be fully SEO-optimized. This includes ensuring fast loading speeds, writing clean code, and setting up proper page structures so search engines can easily read your site. However, ranking at the very top for competitive keywords will require ongoing SEO efforts and quality content over time."
    },
    {
        question: "What details do you need from me to start the project?",
        answer: "To get started on your website, we will need a few basic things from your end:\n\n• Your brand/business Logo\n• The content and text for the website (About Us, Services, Product Details, etc.)\n• High-quality images of your business or products\n• Links to any reference websites (if there is a specific design or layout you like)"
    }
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-background relative z-10 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Answers</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto">
                        Everything you need to know about pricing, process, and functionality before we start building your digital future.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`glass-panel border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-primary/50 bg-card/80' : 'border-border bg-card/30 hover:bg-card/50'}`}
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                            >
                                <h3 className={`text-xl font-medium transition-colors ${openIndex === index ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                                    {faq.question}
                                </h3>
                                <div className={`shrink-0 ml-4 p-2 rounded-full border transition-all duration-300 ${openIndex === index ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-transparent text-muted'}`}>
                                    {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 md:px-8 pb-8 pt-2">
                                            <div className="text-muted leading-relaxed whitespace-pre-wrap">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
