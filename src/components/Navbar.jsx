import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { cartCount } = useCart()
    const { user, isAdmin, logout } = useAuth()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => setIsOpen(false), [location.pathname])

    const navLinks = [
        { name: 'Collections', path: '/' },
        ...(isAdmin ? [{ name: 'Console', path: '/admin' }] : []),
    ]

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-[#1c1917]/95 backdrop-blur-md shadow-2xl py-3' : 'bg-[#1c1917] py-5'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">

                {/* Left Side: Logo & Search */}
                <div className="flex items-center space-x-6 sm:space-x-12 flex-grow sm:flex-grow-0">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 -ml-2 text-white hover:text-purple-400">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <Link to="/" className="text-xl sm:text-2xl font-black tracking-tighter text-white uppercase flex items-center space-x-2">
                            <div className="w-2 h-6 bg-purple-500 rounded-full hidden sm:block" />
                            <span>Hidden Leaf</span>
                        </Link>
                    </div>

                    {/* Normal Search Bar (Left Position) */}
                    <div className="hidden lg:flex relative group w-64 xl:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 group-focus-within:text-purple-500 transition-colors" />
                        <input type="text" placeholder="Search archives..." className="w-full bg-stone-800 border border-stone-700/50 rounded-xl pl-11 pr-4 py-2 text-[11px] font-black uppercase tracking-widest text-white outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-stone-600" />
                    </div>
                </div>

                {/* Right Side: Links & Actions */}
                <div className="flex items-center space-x-6 sm:space-x-10">
                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center space-x-10">
                        {navLinks.map(link => (
                            <Link key={link.path} to={link.path} className={`text-[10px] font-black tracking-[0.3em] uppercase transition-all hover:text-white ${location.pathname === link.path ? 'text-white border-b-2 border-purple-500' : 'text-stone-500'}`}>
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-3 sm:space-x-5">
                        <button className="lg:hidden p-2 text-stone-400 hover:text-white">
                            <Search className="w-5 h-5" />
                        </button>

                        <Link to="/cart" className="relative p-2 text-stone-400 hover:text-white transition-colors group">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-purple-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#1c1917]">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="hidden sm:flex items-center space-x-4 border-l border-stone-800 pl-4">
                                <button onClick={logout} className="p-2 bg-stone-800 rounded-lg hover:bg-stone-700 text-stone-400 hover:text-red-400 transition-all">
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="hidden sm:block bg-white text-black px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-stone-200 transition-all">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden" />
                        <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[#1c1917] z-[100] lg:hidden shadow-3xl flex flex-col p-8">
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-xl font-black text-white uppercase tracking-tighter">Menu</span>
                                <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-white"><X className="w-6 h-6" /></button>
                            </div>

                            <div className="relative mb-10">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                <input type="text" placeholder="Search..." className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-11 pr-4 py-4 text-xs font-black uppercase tracking-widest text-white outline-none" />
                            </div>

                            <div className="flex flex-col space-y-8 flex-grow">
                                {navLinks.map(link => (
                                    <Link key={link.path} to={link.path} className={`text-sm font-black uppercase tracking-widest transition-all ${location.pathname === link.path ? 'text-purple-500' : 'text-stone-400 hover:text-white'}`}>
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-stone-800 mt-auto">
                                {!user ? <Link to="/login" className="w-full bg-white text-black py-4 rounded-xl font-black text-xs uppercase tracking-widest text-center block">Sign In</Link>
                                    : <button onClick={logout} className="w-full bg-stone-900 text-red-500 py-4 rounded-xl font-black text-xs uppercase tracking-widest">Sign Out</button>}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    )
}
