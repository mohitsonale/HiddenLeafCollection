import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useToaster } from '../context/ToasterContext'

export default function Home() {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [loading, setLoading] = useState(true)
    const { addToCart } = useCart()
    const { toast } = useToaster()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products')
                const data = await res.json()
                setProducts(data)
                setFilteredProducts(data)
                const cats = Array.from(new Set(data.map((p) => p.category)))
                setCategories(cats)
                setLoading(false)
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredProducts(products)
        } else {
            setFilteredProducts(products.filter(p => p.category === selectedCategory))
        }
    }, [selectedCategory, products])

    const handleAddToCart = (e, product) => {
        e.preventDefault()
        addToCart(product)
        toast(`${product.title} added to collection`, 'success')
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
     
            <section className="mb-12 sm:mb-20">
                <div className="relative h-[300px] sm:h-[450px] lg:h-[550px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-stone-900 group">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                        className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                        alt="Hero"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-center p-6 bg-gradient-to-t from-stone-900/40 to-transparent">
                        <div className="max-w-3xl space-y-4 sm:space-y-6">
                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                                Hidden Leaf Collection
                            </h1>
                            <p className="text-stone-300 text-xs sm:text-lg font-bold uppercase tracking-widest max-w-lg mx-auto">
                                Modern essentials for the minimalist wanderer.
                            </p>
                            <button className="bg-white text-stone-900 px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-stone-200 transition-all active:scale-95 shadow-xl">
                                Explore Archives
                            </button>
                        </div>
                    </div>
                </div>
            </section>

           
            <section className="mb-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                    <div className="space-y-1">
                        <h2 className="text-2xl sm:text-4xl font-black text-stone-900 uppercase tracking-tighter">Marketplace</h2>
                        <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.3em]">Signature Selection</p>
                    </div>

                    <div className="flex overflow-x-auto space-x-2 pb-2 sm:pb-0 w-full sm:w-auto invisible-scrollbar">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === 'all' ? 'bg-stone-900 text-white shadow-lg' : 'bg-white/40 text-stone-600 border border-stone-300 hover:bg-white'}`}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all capitalize whitespace-nowrap ${selectedCategory === cat ? 'bg-stone-900 text-white shadow-lg' : 'bg-white/40 text-stone-600 border border-stone-300 hover:bg-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, idx) => (
                            <div key={idx} className="bg-white/20 aspect-[4/5] rounded-3xl animate-pulse border border-stone-300/30" />
                        ))
                    ) : (
                        filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="flex flex-col bg-white/30 backdrop-blur-sm border border-stone-300/50 rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-stone-900/5 transition-all duration-300 relative h-full"
                            >
                               
                                <div className="relative aspect-square sm:aspect-[4/5] bg-white w-full overflow-hidden flex items-center justify-center p-8 sm:p-12">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <img
                                            src={product.image}
                                            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                            alt={product.title}
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <button className="p-2.5 bg-white/80 backdrop-blur-md rounded-full text-stone-400 hover:text-red-500 transition-colors shadow-sm">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                            
                                <div className="p-6 sm:p-7 flex flex-col flex-grow space-y-4">
                                    <div className="flex-grow min-h-[3rem]">
                                        <span className="text-sm sm:text-base font-black text-stone-900 line-clamp-2 leading-tight uppercase tracking-tight">
                                            {product.title}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Star className="w-3 h-3 fill-stone-900 text-stone-900" />
                                        <span className="text-[10px] font-black text-stone-900">{product.rating?.rate}</span>
                                        <span className="text-stone-300 text-[10px]">|</span>
                                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{product.category}</span>
                                    </div>

                                    <div className="pt-4 border-t border-stone-200/50 flex items-center justify-between">
                                        <span className="text-xl font-black text-stone-900 tracking-tighter">${product.price.toFixed(2)}</span>
                                        <button
                                            onClick={(e) => handleAddToCart(e, product)}
                                            className="flex items-center space-x-2 bg-stone-900 text-white px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all active:scale-90 shadow-lg"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            <span className="hidden sm:inline">Add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

    
            <section className="mt-20 sm:mt-32 pt-16 border-t border-stone-300/50 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
                {[
                    { label: 'Free Shipping', desc: 'Over $150 global orders' },
                    { label: 'Secure Pay', desc: 'Encrypted transactions' },
                    { label: 'Archive Quality', desc: 'Curated premium gear' },
                    { label: 'Fast Delivery', desc: 'Tracking on every piece' }
                ].map((item, i) => (
                    <div key={i} className="space-y-2">
                        <h4 className="text-[10px] sm:text-xs font-black text-stone-900 uppercase tracking-[0.2em]">{item.label}</h4>
                        <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest leading-none">{item.desc}</p>
                    </div>
                ))}
            </section>
        </motion.div>
    )
}
