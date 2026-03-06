import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, ArrowLeft, Star, Heart, ShieldCheck, Truck, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useToaster } from '../context/ToasterContext'

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()
    const { toast } = useToaster()

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [id])

    if (loading) return (
        <div className="pt-48 h-screen flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">Archiving Data...</span>
        </div>
    )

    if (!product) return (
        <div className="pt-48 text-center space-y-6">
            <h1 className="text-3xl font-black text-stone-900 uppercase">Item Missing</h1>
            <button onClick={() => navigate('/')} className="bg-stone-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase">Marketplace</button>
        </div>
    )

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        toast(`${product.title} added to collection`, 'success')
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="pt-28 sm:pt-40 pb-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Link to="/" className="inline-flex items-center space-x-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 sm:mb-12 group">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Marketplace</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24">
                {/* Gallery Focus */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-8 sm:p-20 flex items-center justify-center border border-stone-300/30 shadow-2xl shadow-stone-900/5 aspect-square overflow-hidden relative group">
                        <img
                            src={product.image}
                            className="max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                            alt={product.title}
                        />
                        <div className="absolute top-6 right-6">
                            <button className="p-3 bg-white/80 backdrop-blur-md rounded-2xl text-stone-400 hover:text-red-500 transition-all shadow-sm">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="aspect-square bg-white border border-stone-200 rounded-2xl overflow-hidden p-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                                <img src={product.image} className="max-w-full max-h-full object-contain" alt="Preview" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Matrix */}
                <div className="flex flex-col justify-center space-y-10 sm:space-y-12">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-600 bg-purple-50 px-4 py-2 rounded-lg border border-purple-100">{product.category}</span>
                            <div className="h-px flex-grow bg-stone-200" />
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tighter uppercase leading-[0.9]">{product.title}</h1>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating?.rate || 0) ? 'fill-stone-900 text-stone-900' : 'text-stone-300'}`} />
                                ))}
                            </div>
                            <span className="text-xs font-black text-stone-900">{product.rating?.rate}</span>
                            <span className="text-stone-300 text-xs">|</span>
                            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{product.rating?.count} Reviews</span>
                        </div>
                    </div>

                    <div className="text-5xl sm:text-7xl font-black text-stone-900 tracking-tighter">${product.price.toFixed(2)}</div>

                    <div className="space-y-4">
                        <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-medium uppercase tracking-tight max-w-lg">{product.description}</p>
                    </div>

                    {/* Purchase Unit */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center bg-stone-200/50 rounded-2xl border border-stone-300/50 overflow-hidden h-14 w-full">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-full hover:bg-stone-300 transition-colors text-xl font-bold">-</button>
                            <span className="w-12 text-center text-lg font-black text-stone-900">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="flex-1 h-full hover:bg-stone-300 transition-colors text-xl font-bold">+</button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-grow bg-stone-900 text-white h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-black active:scale-95 shadow-2xl shadow-stone-900/10 flex items-center justify-center space-x-3"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span>Add To collection</span>
                        </button>
                    </div>

                    {/* Trust Matrix */}
                    <div className="grid grid-cols-2 gap-6 pt-10 border-t border-stone-200">
                        <div className="flex items-center space-x-4 group">
                            <div className="p-3 bg-stone-200/50 rounded-xl group-hover:bg-purple-100 transition-colors">
                                <Truck className="w-5 h-5 text-stone-600 group-hover:text-purple-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-stone-900">Zero Cost Delivery</span>
                                <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">Across 120 Nodes</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 group">
                            <div className="p-3 bg-stone-200/50 rounded-xl group-hover:bg-purple-100 transition-colors">
                                <ShieldCheck className="w-5 h-5 text-stone-600 group-hover:text-purple-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-stone-900">Archive Authenticated</span>
                                <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">Hidden Leaf Verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
