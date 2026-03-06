
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ChevronLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, totalPrice, cartCount } = useCart()

    if (cart.length === 0) return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-48 pb-32 container mx-auto px-6 h-screen flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 bg-stone-300/20 rounded-full flex items-center justify-center border border-stone-300/30">
                <ShoppingBag className="w-10 h-10 text-stone-400" />
            </div>
            <div className="space-y-2">
                <h1 className="text-3xl font-black text-stone-900 uppercase tracking-tighter">Your Bag is Empty</h1>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest max-w-[250px] mx-auto">Discover our latest collection and start building your archive.</p>
            </div>
            <Link to="/" className="bg-stone-900 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95">
                Explore Collection
            </Link>
        </motion.div>
    )

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-28 sm:pt-36 pb-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
                <div className="space-y-1">
                    <h1 className="text-3xl sm:text-5xl font-black text-stone-900 uppercase tracking-tighter">Shopping Bag</h1>
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">{cartCount} items selected</p>
                </div>
                <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-stone-500 hover:text-stone-900 flex items-center group">
                    <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                    Continue Discovering
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Cart Items */}
                <div className="lg:col-span-8 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {cart.map(item => (
                            <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="bg-white/40 backdrop-blur-sm border border-stone-300/50 p-4 sm:p-6 rounded-3xl flex items-center gap-4 sm:gap-8 group">
                                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-2xl p-4 flex-shrink-0 border border-stone-200 shadow-sm overflow-hidden flex items-center justify-center">
                                    <img src={item.image} className="max-w-full max-h-full object-contain" alt={item.title} />
                                </div>

                                <div className="flex-grow min-w-0 space-y-3">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="text-xs sm:text-sm font-black text-stone-900 uppercase tracking-tight line-clamp-1">{item.title}</h3>
                                        <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-500 transition-colors p-1">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                        <div className="flex items-center bg-stone-200/50 rounded-xl border border-stone-300/50 overflow-hidden h-9">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 hover:bg-stone-300 transition-colors text-stone-600 font-bold">-</button>
                                            <span className="px-3 text-xs font-black text-stone-900 w-8 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 hover:bg-stone-300 transition-colors text-stone-600 font-bold">+</button>
                                        </div>
                                        <div className="text-sm sm:text-base font-black text-stone-900 tracking-tighter">${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-stone-900 rounded-[2.5rem] p-8 sm:p-10 text-white space-y-10 sticky top-32 shadow-2xl">
                        <h3 className="text-xl font-black uppercase tracking-tighter">Order Summary</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span className="text-white">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                                <span>Shipping</span>
                                <span className="text-green-500">FREE</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                                <span>Archive Tax</span>
                                <span className="text-white">$0.00</span>
                            </div>

                            <div className="pt-10 border-t border-white/10 flex justify-between items-end">
                                <span className="text-[10px] font-black text-stone-500 uppercase tracking-[0.3em]">Total</span>
                                <div className="text-4xl font-black tracking-tighter">${totalPrice.toFixed(2)}</div>
                            </div>
                        </div>

                        <button className="w-full bg-white text-stone-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-stone-200 flex items-center justify-center group active:scale-95">
                            <span>Checkout Your Line</span>
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </button>

                        <div className="pt-6 text-center">
                            <p className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Secure Global Delivery via Leaf Carrier</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
