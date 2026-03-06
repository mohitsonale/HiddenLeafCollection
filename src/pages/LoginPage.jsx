import React from 'react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, LogIn } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login(email, password)
            const from = location.state?.from?.pathname || '/'
            navigate(from, { replace: true })
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center container mx-auto px-6 py-24 relative overflow-hidden">
            {/* Background stays dark beige via global CSS */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-12 rounded-3xl shadow-xl space-y-8 transition-all">
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-bold text-stone-900 uppercase tracking-tighter leading-none">Sign In</h1>
                    <p className="text-stone-700 text-[10px] font-bold uppercase tracking-widest">Hidden Leaf Collection</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-700 ml-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-white/50 border border-white/30 rounded-xl pl-12 pr-6 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-700 ml-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/50 border border-white/30 rounded-xl pl-12 pr-6 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-stone-900 hover:bg-black text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all flex items-center justify-center space-x-3 active:scale-95">
                        {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (
                            <>
                                <LogIn className="w-4 h-4" />
                                <span>Authorize Access</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="pt-6 border-t border-white/10">
                    <div className="bg-white/30 p-4 rounded-xl space-y-2">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-600">Sim Access</h4>
                        <div className="text-[10px] space-y-1 font-bold">
                            <p className="text-stone-800">Admin: <span className="text-purple-700">admin@sparkiit.com (admin123)</span></p>
                            <p className="text-stone-800">User: <span className="text-stone-600">user@example.com</span></p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
