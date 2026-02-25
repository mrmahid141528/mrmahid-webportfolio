"use client"

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Rahul Singhania',
        role: 'CEO, Al-Azeem Industries',
        text: 'Mahid completely transformed our B2B online presence. The WhatsApp ecommerce platform he built increased our organic orders by 40% within local markets. Absolutely premium work.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Dr. Anjali Sharma',
        role: 'Founder, Sharma Clinic',
        text: 'The website design is sleek, modern, and perfectly reflects our brand. The patients love the easy booking system, and the overall load speed is incredibly fast.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Vikram Das',
        role: 'Owner, Urban Styles',
        text: 'Working with mrmahid was the best decision for my clothing store. The attention to UI details and the smooth animations make my store feel like a top-tier brand.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
    }
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            nextTestimonial();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    };

    const nextTestimonial = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className="relative py-32 bg-[#0a101d] overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center flex flex-col items-center">

                <span className="text-secondary text-sm font-semibold tracking-widest uppercase mb-4 block">Testimonials</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
                    Client <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Stories</span>
                </h2>

                {/* Carousel Container */}
                <div className="relative w-full max-w-4xl h-[400px] sm:h-[300px] flex items-center justify-center">

                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute w-full px-4"
                        >
                            <div className="glass-panel border border-white/10 bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 relative overflow-hidden group">

                                {/* Quotation Mark Watermark */}
                                <Quote className="absolute top-8 right-8 w-32 h-32 text-white/5 -rotate-12 pointer-events-none" />

                                <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-10 relative z-10 italic">
                                    "{testimonials[currentIndex].text}"
                                </p>

                                <div className="flex items-center justify-center sm:justify-start space-x-4 relative z-10">
                                    <div
                                        className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-primary/50"
                                        style={{ backgroundImage: `url(${testimonials[currentIndex].image})` }}
                                    />
                                    <div className="text-left">
                                        <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{testimonials[currentIndex].name}</h4>
                                        <p className="text-sm text-accent font-medium">{testimonials[currentIndex].role}</p>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-20 pointer-events-none px-4 md:-mx-12">
                        <button
                            onClick={prevTestimonial}
                            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full glass-panel border border-white/10 bg-white/5 hover:bg-primary/20 text-white transition-colors cursor-hover hover:scale-110 active:scale-95"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full glass-panel border border-white/10 bg-white/5 hover:bg-primary/20 text-white transition-colors cursor-hover hover:scale-110 active:scale-95"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                </div>

                {/* Pagination Dots */}
                <div className="flex space-x-3 mt-12 z-20">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`transition-all duration-300 rounded-full cursor-hover ${currentIndex === idx ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
