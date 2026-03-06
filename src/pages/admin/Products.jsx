import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Edit, Trash2, X, Package, LayoutDashboard, Layers, Tag, DollarSign, Image as ImageIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminProducts() {
    const { isAdmin } = useAuth()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({ title: '', price: 0, category: '', image: '' })

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=10')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
    }, [])

    if (!isAdmin) return <div className="pt-48 text-center font-bold uppercase">Restricted Access</div>

    const handleDelete = (id) => {
        setProducts(products.filter(p => p.id !== id))
    }

    const handleSave = (e) => {
        e.preventDefault()
        if (currentProduct.id) {
            setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p))
        } else {
            const newProduct = { ...currentProduct, id: Math.max(...products.map(p => p.id), 0) + 1 }
            setProducts([newProduct, ...products])
        }
        setShowModal(false)
        setCurrentProduct({ title: '', price: 0, category: '', image: '' })
    }

    return (
        <div className="min-h-screen pt-32 pb-16 px-6 container mx-auto">
            <div className="space-y-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-stone-900 uppercase tracking-tight">Products</h1>
                    <button onClick={() => { setShowModal(true); setCurrentProduct({ title: '', price: 0, category: '', image: '' }) }} className="bg-stone-900 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Item
                    </button>
                </div>

                <div className="bg-white/60 border border-stone-300/50 rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-stone-200/50 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                            <tr>
                                <th className="px-6 py-4">Item</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-300/30">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-white/40 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-white rounded-lg p-2 border border-stone-200">
                                                <img src={product.image} className="w-full h-full object-contain" alt={product.title} />
                                            </div>
                                            <span className="text-sm font-bold text-stone-900 line-clamp-1">{product.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-bold text-stone-600 bg-stone-200/50 px-2 py-1 rounded-md">{product.category}</span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-stone-900">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => { setShowModal(true); setCurrentProduct(product) }} className="p-2 text-stone-500 hover:text-stone-900"><Edit className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(product.id)} className="p-2 text-stone-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal minimized animation */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold uppercase tracking-tight">{currentProduct.id ? 'Edit Item' : 'New Item'}</h2>
                            <button onClick={() => setShowModal(false)}><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-stone-500">Title</label>
                                    <input type="text" required value={currentProduct.title} onChange={e => setCurrentProduct({ ...currentProduct, title: e.target.value })} className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-stone-400" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-stone-500">Category</label>
                                    <input type="text" required value={currentProduct.category} onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })} className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-stone-400" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase text-stone-500">Price</label>
                                        <input type="number" required value={currentProduct.price} onChange={e => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })} className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-stone-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase text-stone-500">Image URL</label>
                                        <input type="text" required value={currentProduct.image} onChange={e => setCurrentProduct({ ...currentProduct, image: e.target.value })} className="w-full bg-stone-100 border border-stone-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-stone-400" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-black">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
