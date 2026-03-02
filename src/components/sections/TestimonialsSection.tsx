"use client"

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Star Gym Owner',           // 🔄 Real naam baad mein update karna
        role: 'Owner, Star Gym',
        text: 'Mahid ne hamari gym ki website professionally design ki. Design bilkul modern aur energetic hai. Visitors ka response kaafi acha raha aur naye members bhi join ho rahe hain. Highly recommended!',
        image: '/icon.png',               // 🔄 Client photo baad mein update karna
        rating: 5,
    },
    {
        id: 2,
        name: 'Coming Soon',              // 🔄 Agla client
        role: 'Future Client',
        text: 'We are looking forward to working with mrmahid on our next project. His attention to detail and premium design sense is unmatched in the industry.',
        image: '/icon.png',
        rating: 5,
    },
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
                                {/* Star Rating */}
                                <div className="flex space-x-1 mb-6 justify-center sm:justify-start">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

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
