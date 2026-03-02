"use client"

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, MessageSquare, Mail, MapPin, AlertCircle } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

// 🔑 EmailJS Credentials — Set these in Render Environment Variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        businessType: '',
        budget: '',
        projectType: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const tempErrors: Record<string, string> = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.businessType) tempErrors.businessType = "Business Type is required";
        if (!formData.projectType) tempErrors.projectType = "Project Type is required";
        if (!formData.message) tempErrors.message = "Message is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setIsError(false);

        try {
            // Send email via EmailJS
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    business_type: formData.businessType,
                    project_type: formData.projectType,
                    budget: formData.budget || 'Not specified',
                    message: formData.message,
                    reply_to: 'mrmahid141528@gmail.com',
                },
                EMAILJS_PUBLIC_KEY
            );

            // Also open WhatsApp
            const text = `*New Project Inquiry*%0A%0A*Name:* ${formData.name}%0A*Business:* ${formData.businessType}%0A*Project:* ${formData.projectType}%0A*Budget:* ${formData.budget || 'Not specified'}%0A*Message:* ${formData.message}`;
            window.open(`https://wa.me/917865055431?text=${text}`, '_blank');

            setIsSuccess(true);
            setFormData({ name: '', businessType: '', budget: '', projectType: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);

        } catch {
            setIsError(true);
            setTimeout(() => setIsError(false), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };


    return (
        <section id="contact" className="relative py-32 bg-[#0F172A] z-10 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

                    {/* Contact Info (Left) */}
                    <div className="lg:col-span-2 flex flex-col justify-center">
                        <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Get In Touch</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Let's Build Your <br /><span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Digital Future</span>
                        </h2>
                        <p className="text-gray-400 mb-12 text-lg">
                            Ready to elevate your business? Fill out the form or reach out directly. I usually respond within 24 hours.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full glass-panel border border-white/10 bg-white/5 flex items-center justify-center text-primary shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Email</h4>
                                    <a href="mailto:mrmahid141528@gmail.com" className="text-gray-400 hover:text-primary transition-colors cursor-hover">mrmahid141528@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full glass-panel border border-white/10 bg-white/5 flex items-center justify-center text-accent shrink-0">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">WhatsApp</h4>
                                    <a href="https://wa.me/917865055431" target="_blank" className="text-gray-400 hover:text-accent transition-colors cursor-hover">+91 78650 55431</a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full glass-panel border border-white/10 bg-white/5 flex items-center justify-center text-secondary shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Location</h4>
                                    <p className="text-gray-400">West Bengal, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="lg:col-span-3">
                        <div className="glass-panel border border-white/10 bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 relative">

                            <AnimatePresence>
                                {isSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute inset-0 z-20 bg-[#0F172A]/90 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center text-center p-8 border border-accent/20"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.2 }}
                                            className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6"
                                        >
                                            <CheckCircle2 size={40} />
                                        </motion.div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                                        <p className="text-gray-400 max-w-sm">
                                            Thank you for reaching out. I&apos;ll get back to you shortly to discuss your project.
                                        </p>
                                    </motion.div>
                                )}
                                {isError && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute inset-0 z-20 bg-[#0F172A]/90 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center text-center p-8 border border-red-500/20"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.2 }}
                                            className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mb-6"
                                        >
                                            <AlertCircle size={40} />
                                        </motion.div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Something Went Wrong</h3>
                                        <p className="text-gray-400 max-w-sm">
                                            Email could not be sent. Please reach out directly via WhatsApp or email.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 font-medium ml-2">Name *</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors cursor-hover`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs ml-2">{errors.name}</p>}
                                    </div>

                                    {/* Business Type */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 font-medium ml-2">Business Type *</label>
                                        <input
                                            name="businessType"
                                            value={formData.businessType}
                                            onChange={handleChange}
                                            placeholder="e.g. Healthcare, Retail"
                                            className={`w-full bg-white/5 border ${errors.businessType ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors cursor-hover`}
                                        />
                                        {errors.businessType && <p className="text-red-500 text-xs ml-2">{errors.businessType}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Project Type */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 font-medium ml-2">Project Type *</label>
                                        <select
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                            className={`w-full bg-[#151e32] border ${errors.projectType ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors cursor-hover appearance-none`}
                                        >
                                            <option value="" disabled>Select a type</option>
                                            <option value="website">Website Design & Dev</option>
                                            <option value="ecommerce">E-Commerce Platform</option>
                                            <option value="branding">Brand Identity</option>
                                            <option value="uiux">UI/UX Design</option>
                                        </select>
                                        {errors.projectType && <p className="text-red-500 text-xs ml-2">{errors.projectType}</p>}
                                    </div>

                                    {/* Budget */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 font-medium ml-2">Estimated Budget</label>
                                        <select
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full bg-[#151e32] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors cursor-hover appearance-none"
                                        >
                                            <option value="" disabled>Select range</option>
                                            <option value="small">Less than ₹15,000</option>
                                            <option value="medium">₹15,000 - ₹50,000</option>
                                            <option value="large">Over ₹50,000</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 font-medium ml-2">Project Details *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your goals..."
                                        rows={4}
                                        className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors cursor-hover resize-none`}
                                    />
                                    {errors.message && <p className="text-red-500 text-xs ml-2">{errors.message}</p>}
                                </div>

                                <div className="pt-2">
                                    <MagneticButton className="cursor-hover group flex items-center justify-center space-x-2 w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-primary/50 relative overflow-hidden">
                                        {/* Button progress bg */}
                                        {isSubmitting && (
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 2 }}
                                                className="absolute inset-0 bg-white/20 z-0"
                                            />
                                        )}
                                        <div className="relative z-10 flex items-center space-x-2">
                                            <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
                                            {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                        </div>
                                    </MagneticButton>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
