import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0a101d] border-t border-white/5 pt-16 pb-8 text-center relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col items-center justify-center space-y-8">

                    {/* Logo */}
                    <div className="flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="mrmahid logo"
                            width={320}
                            height={100}
                            className="w-auto h-16 md:h-20 object-contain opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-6">
                        {[
                            { icon: Github, href: "#" },
                            { icon: Twitter, href: "#" },
                            { icon: Linkedin, href: "#" },
                            { icon: Instagram, href: "#" },
                        ].map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-hover"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* Copyright */}
                    <p className="text-gray-500 text-sm">
                        &copy; {currentYear} Md Mahid Raza. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
}
