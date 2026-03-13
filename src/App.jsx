import { Routes, Route, useLocation } from 'react-router-dom'
import { ToasterProvider } from './context/ToasterContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminOrders from './pages/admin/Orders'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { AnimatePresence } from 'framer-motion'

function App() {
    const location = useLocation()
    return (
        <AuthProvider>
            <CartProvider>
                <ToasterProvider>
                    <div className="min-h-screen flex flex-col bg-[#daccbc] text-stone-900 overflow-x-hidden">
                        <Navbar />
                        <main className="flex-grow">
                            <AnimatePresence mode="wait">
                                <Routes location={location} key={location.pathname}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/product/:id" element={<ProductDetail />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/admin" element={<AdminDashboard />} />
                                    <Route path="/admin/products" element={<AdminProducts />} />
                                    <Route path="/admin/orders" element={<AdminOrders />} />
                                </Routes>
                            </AnimatePresence>
                        </main>
                        <Footer />
                    </div>
                </ToasterProvider>
            </CartProvider>
        </AuthProvider>
    )
}

export default App
