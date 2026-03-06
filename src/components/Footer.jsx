import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ChevronRight, Github } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-black border-t border-stone-800 pt-16 sm:pt-24 pb-8 sm:pb-12 text-stone-500 overflow-hidden">
            <div className="container mx-auto px-6 sm:px-8 max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 sm:gap-20 mb-20">

                    {/* Brand Focus */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link to="/" className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter flex items-center space-x-2">
                            <div className="w-2 h-6 bg-purple-500 rounded-full" />
                            <span>Hidden Leaf</span>
                        </Link>
                        <p className="text-xs sm:text-sm leading-relaxed max-w-xs font-medium uppercase tracking-tight">
                            Premium apparel and curated essentials for the modern wanderer. Designed with precision.
                        </p>
                        <div className="flex space-x-5">
                            {[Facebook, Twitter, Instagram, Github].map((Icon, idx) => (
                                <Icon key={idx} className="w-5 h-5 text-stone-600 hover:text-white transition-colors cursor-pointer" />
                            ))}
                        </div>
                    </div>

                    {/* Links Matrix */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Store</h3>
                        <ul className="space-y-4">
                            {['New Arrivals', 'Best Sellers', 'Collections', 'Limited'].map(link => (
                                <li key={link}>
                                    <Link to="/" className="hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center group">
                                        <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-purple-500" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Support</h3>
                        <ul className="space-y-4">
                            {['Shipping', 'Returns', 'Sizing', 'Contact'].map(link => (
                                <li key={link}>
                                    <Link to="/" className="hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center group">
                                        <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-purple-500" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Matrix */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Connect</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start space-x-4 group">
                                <div className="p-3 bg-stone-900 rounded-xl group-hover:bg-purple-900/30 transition-colors">
                                    <MapPin className="w-4 h-4 text-purple-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-stone-400 tracking-widest uppercase">Location</p>
                                    <p className="text-[10px] font-black text-white uppercase tracking-tighter">Anand Nagar, Pune, India</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-4 group">
                                <div className="p-3 bg-stone-900 rounded-xl group-hover:bg-purple-900/30 transition-colors">
                                    <Mail className="w-4 h-4 text-purple-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-stone-400 tracking-widest uppercase">Email</p>
                                    <p className="text-[10px] font-black text-white lowercase">zorolufft07@gmail.com</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-4 group">
                                <div className="p-3 bg-stone-900 rounded-xl group-hover:bg-purple-900/30 transition-colors">
                                    <Phone className="w-4 h-4 text-purple-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-stone-400 tracking-widest uppercase">Phone</p>
                                    <p className="text-[10px] font-black text-white">+91 9822XXXXXX</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] space-y-6 md:space-y-0 text-center md:text-left">
                    <p>© {currentYear} Hidden Leaf Collection. All rights reserved.</p>
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/" className="hover:text-white transition-colors">Terms</Link>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-white">Active Node</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
