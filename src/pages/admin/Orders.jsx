import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowLeft, Search, Eye, Truck, CheckCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminOrders() {
    const { isAdmin } = useAuth()
    const [orders] = useState([
        { id: 'ORD-8921', customer: 'Rahul Sharma', date: 'Oct 12, 2026', total: 299.00, status: 'Delivered', color: 'text-green-600', bg: 'bg-green-100' },
        { id: 'ORD-7742', customer: 'Priya Singh', date: 'Oct 11, 2026', total: 124.50, status: 'Shipped', color: 'text-stone-600', bg: 'bg-stone-200' },
        { id: 'ORD-6631', customer: 'Amit Kumar', date: 'Oct 10, 2026', total: 850.00, status: 'Processing', color: 'text-orange-600', bg: 'bg-orange-100' },
        { id: 'ORD-5520', customer: 'Sneha Patel', date: 'Oct 09, 2026', total: 45.99, status: 'Pending', color: 'text-stone-500', bg: 'bg-stone-100' },
    ])

    if (!isAdmin) return <div className="pt-48 text-center font-bold uppercase">Restricted Access</div>

    return (
        <div className="min-h-screen pt-32 pb-16 px-6 container mx-auto">
            <div className="space-y-10">
                <div className="flex justify-between items-end">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-stone-900 uppercase tracking-tight">Orders</h1>
                        <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest">Global Logistics Matrix</p>
                    </div>
                    <Link to="/admin" className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 flex items-center group transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Control Panel
                    </Link>
                </div>

                <div className="bg-white/60 border border-stone-300/50 rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-stone-200/50 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                            <tr>
                                <th className="px-6 py-4">Sequence ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Inspect</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-300/30">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-white/40 transition-colors">
                                    <td className="px-6 py-4 font-bold text-xs text-stone-600">#{order.id}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-stone-900">{order.customer}</td>
                                    <td className="px-6 py-4 font-bold text-stone-900">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${order.bg} ${order.color} text-[10px] font-black uppercase tracking-widest`}>
                                            {order.status === 'Delivered' && <CheckCircle className="w-3.5 h-3.5" />}
                                            {order.status === 'Shipped' && <Truck className="w-3.5 h-3.5" />}
                                            {order.status === 'Processing' && <Clock className="w-3.5 h-3.5" />}
                                            <span>{order.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-stone-400 hover:text-stone-900 transition-colors">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
