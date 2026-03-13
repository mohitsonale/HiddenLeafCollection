import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Users, DollarSign, Package, BarChart3, Globe, ChevronRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AdminDashboard() {
    const { isAdmin } = useAuth()
    const [stats] = useState([
        { name: 'Revenue', value: '$45,231', icon: DollarSign, trend: '+12%', color: 'text-stone-900', bg: 'bg-stone-200' },
        { name: 'Orders', value: '1,234', icon: ShoppingBag, trend: '+8%', color: 'text-stone-900', bg: 'bg-stone-200' },
        { name: 'Customers', value: '892', icon: Users, trend: '+15%', color: 'text-stone-900', bg: 'bg-stone-200' },
        { name: 'Products', value: '48', icon: Package, trend: '+2%', color: 'text-stone-900', bg: 'bg-stone-200' },
    ])

    if (!isAdmin) return <div className="pt-48 text-center font-bold uppercase">Restricted Access</div>

    return (
        <div className="min-h-screen pt-32 pb-16 px-6 container mx-auto">
            <div className="space-y-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-stone-900 uppercase tracking-tight">Console</h1>
                    <div className="flex items-center space-x-4 bg-stone-900 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                        <Globe className="w-4 h-4 mr-2" />
                        Live
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div key={stat.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="bg-white/60 p-6 rounded-2xl border border-stone-300/50 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <span className="text-green-600 text-[10px] font-bold">{stat.trend}</span>
                            </div>
                            <div>
                                <h3 className="text-stone-500 text-[10px] font-bold uppercase tracking-widest">{stat.name}</h3>
                                <div className="text-2xl font-bold text-stone-900">{stat.value}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/60 p-8 rounded-2xl border border-stone-300/50 space-y-6">
                        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Performance
                        </h3>
                        <div className="h-48 w-full flex items-end justify-between space-x-2">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="flex-grow bg-stone-900 rounded-t-lg transition-all" />
                            ))}
                        </div>
                    </div>

                    <div className="bg-stone-900 p-8 rounded-2xl text-white space-y-6">
                        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Management</h3>
                        <div className="space-y-3">
                            <Link to="/admin/products" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                                <span className="text-xs font-bold">Products</span>
                                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/admin/orders" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                                <span className="text-xs font-bold">Orders</span>
                                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
