"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, MessageSquare, Mail, MapPin } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        businessType: '',
        budget: '',
        projectType: '',
        message: ''
    });
    const [submittingType, setSubmittingType] = useState<'whatsapp' | 'email' | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
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

    const handleAction = async (type: 'whatsapp' | 'email') => {
        if (!validate()) return;
        setSubmittingType(type);

        try {
            if (type === 'email') {
                const subject = encodeURIComponent(`New Project Inquiry from ${formData.name}`);
                const body = encodeURIComponent(`Name: ${formData.name}\nBusiness: ${formData.businessType}\nProject: ${formData.projectType}\nBudget: ${formData.budget || 'Not specified'}\n\nMessage:\n${formData.message}`);
                window.location.href = `mailto:mrmahid141528@gmail.com?subject=${subject}&body=${body}`;
            } else if (type === 'whatsapp') {
                const whatsappText = encodeURIComponent(`*🚀 Web Design Request!*\n\n*👤 Name:* ${formData.name}\n*🏢 Business:* ${formData.businessType}\n*🛠 Project:* ${formData.projectType}\n*💰 Budget:* ${formData.budget || 'Not specified'}\n\n*💬 Message:* ${formData.message}\n\n_Sent from mrmahid.com_`);
                window.open(`https://wa.me/918372932895?text=${whatsappText}`, '_blank');
            }

            setIsSuccess(true);
            setFormData({ name: '', businessType: '', budget: '', projectType: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        } finally {
            setSubmittingType(null);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };


    return (
        <section id="contact" className="relative py-32 bg-background z-10 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

                    {/* Contact Info (Left) */}
                    <div className="lg:col-span-2 flex flex-col justify-center">
                        <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Get In Touch</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                            Let's Build Your <br /><span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Digital Future</span>
                        </h2>
                        <p className="text-muted mb-12 text-lg">
                            Ready to elevate your business? Fill out the form or reach out directly. I usually respond within 24 hours.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full glass-panel border border-border bg-card flex items-center justify-center text-primary shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-medium mb-1">Email</h4>
                                    <a href="mailto:mrmahid141528@gmail.com" className="text-muted hover:text-primary transition-colors cursor-hover">mrmahid141528@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full glass-panel border border-border bg-card flex items-center justify-center text-accent shrink-0">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-medium mb-1">WhatsApp</h4>
                                    <a href="https://wa.me/918372932895" target="_blank" className="text-muted hover:text-accent transition-colors cursor-hover">+91 83729 32895</a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full glass-panel border border-border bg-card flex items-center justify-center text-secondary shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-medium mb-1">Location</h4>
                                    <p className="text-muted">West Bengal, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="lg:col-span-3">
                        <div className="glass-panel border border-border bg-card backdrop-blur-xl rounded-[2rem] p-8 md:p-10 relative">

                            <AnimatePresence>
                                {isSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute inset-0 z-20 bg-background/90 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center text-center p-8 border border-accent/20"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.2 }}
                                            className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6"
                                        >
                                            <CheckCircle2 size={40} />
                                        </motion.div>
                                        <h3 className="text-3xl font-bold text-foreground mb-2">Request Ready!</h3>
                                        <p className="text-muted max-w-sm">
                                            Opening your email client and WhatsApp...
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-muted font-medium ml-2">Name *</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={`w-full bg-card border ${errors.name ? 'border-red-500' : 'border-border'} rounded-xl px-5 py-4 text-foreground placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors cursor-hover`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs ml-2">{errors.name}</p>}
                                    </div>

                                    {/* Business Type */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-muted font-medium ml-2">Business Type *</label>
                                        <input
                                            name="businessType"
                                            value={formData.businessType}
                                            onChange={handleChange}
                                            placeholder="e.g. Healthcare, Retail"
                                            className={`w-full bg-card border ${errors.businessType ? 'border-red-500' : 'border-border'} rounded-xl px-5 py-4 text-foreground placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors cursor-hover`}
                                        />
                                        {errors.businessType && <p className="text-red-500 text-xs ml-2">{errors.businessType}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Project Type */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-muted font-medium ml-2">Project Type *</label>
                                        <select
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                            className={`w-full bg-card border ${errors.projectType ? 'border-red-500' : 'border-border'} rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-primary transition-colors cursor-hover appearance-none`}
                                        >
                                            <option value="" disabled className="bg-[#1a1a1a] text-white">Select a type</option>
                                            <option value="ecommerce" className="bg-[#1a1a1a] text-white">E-commerce Store</option>
                                            <option value="portfolio" className="bg-[#1a1a1a] text-white">Portfolio / Resume Website</option>
                                            <option value="business" className="bg-[#1a1a1a] text-white">Business / Corporate Website</option>
                                            <option value="clinic" className="bg-[#1a1a1a] text-white">Clinic / Healthcare Website</option>
                                            <option value="educational" className="bg-[#1a1a1a] text-white">Educational / School Management Portal</option>
                                            <option value="restaurant" className="bg-[#1a1a1a] text-white">Restaurant / Cafe Website</option>
                                            <option value="realestate" className="bg-[#1a1a1a] text-white">Real Estate / Property Listing</option>
                                            <option value="blog" className="bg-[#1a1a1a] text-white">Blog / News / Magazine</option>
                                            <option value="landingpage" className="bg-[#1a1a1a] text-white">Landing Page / Lead Generation</option>
                                            <option value="microsaas" className="bg-[#1a1a1a] text-white">Micro-SaaS / Web Utility Tools</option>
                                            <option value="booking" className="bg-[#1a1a1a] text-white">Booking / Appointment System</option>
                                            <option value="affiliate" className="bg-[#1a1a1a] text-white">Affiliate / Product Discovery Website</option>
                                            <option value="socialnetwork" className="bg-[#1a1a1a] text-white">Social Network / Community Forum</option>
                                            <option value="event" className="bg-[#1a1a1a] text-white">Event Management Website</option>
                                        </select>
                                        {errors.projectType && <p className="text-red-500 text-xs ml-2">{errors.projectType}</p>}
                                    </div>

                                    {/* Budget */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-muted font-medium ml-2">Estimated Budget</label>
                                        <select
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full bg-card border border-border rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-primary transition-colors cursor-hover appearance-none"
                                        >
                                            <option value="" disabled className="bg-[#1a1a1a] text-white">Select range</option>
                                            <option value="budget_5-10" className="bg-[#1a1a1a] text-white">₹5,000 – ₹10,000</option>
                                            <option value="budget_10-20" className="bg-[#1a1a1a] text-white">₹10,000 – ₹20,000</option>
                                            <option value="budget_20-35" className="bg-[#1a1a1a] text-white">₹20,000 – ₹35,000</option>
                                            <option value="budget_35-60" className="bg-[#1a1a1a] text-white">₹35,000 – ₹60,000</option>
                                            <option value="budget_60-1lakh" className="bg-[#1a1a1a] text-white">₹60,000 – ₹1,00,000</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="text-sm text-muted font-medium ml-2">Project Details *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your goals..."
                                        rows={4}
                                        className={`w-full bg-card border ${errors.message ? 'border-red-500' : 'border-border'} rounded-xl px-5 py-4 text-foreground placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors cursor-hover resize-none`}
                                    />
                                    {errors.message && <p className="text-red-500 text-xs ml-2">{errors.message}</p>}
                                </div>

                                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleAction('whatsapp')}
                                        disabled={submittingType !== null}
                                        className="cursor-hover group flex-1 flex items-center justify-center space-x-2 py-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] relative overflow-hidden"
                                    >
                                        <div className="relative z-10 flex items-center space-x-2">
                                            <span>{submittingType === 'whatsapp' ? 'Opening...' : 'Send via WhatsApp'}</span>
                                            {submittingType !== 'whatsapp' && <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleAction('email')}
                                        disabled={submittingType !== null}
                                        className="cursor-hover group flex-1 flex items-center justify-center space-x-2 py-4 bg-primary text-foreground rounded-xl font-medium hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-primary/50 relative overflow-hidden"
                                    >
                                        <div className="relative z-10 flex items-center space-x-2">
                                            <span>{submittingType === 'email' ? 'Opening...' : 'Send via Email'}</span>
                                            {submittingType !== 'email' && <Mail className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                        </div>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
