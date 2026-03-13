import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const ToasterContext = createContext(undefined)

export function ToasterProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const toast = (message, type = 'info') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 2000) 
    }

    return (
        <ToasterContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[200] space-y-2 flex flex-col items-end pointer-events-none">
                <AnimatePresence>
                    {toasts.map(t => (
                        <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-auto flex items-center space-x-3 px-4 py-3 bg-stone-900 text-white rounded-lg shadow-lg border border-white/10 min-w-[200px]">
                            <div className="flex-shrink-0">
                                {t.type === 'success' && <CheckCircle className="w-4 h-4 text-green-400" />}
                                {t.type === 'error' && <XCircle className="w-4 h-4 text-red-400" />}
                                {t.type === 'info' && <Info className="w-4 h-4 text-purple-400" />}
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest flex-grow">{t.message}</p>
                            <button onClick={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))} className="text-white/40 hover:text-white transition-colors">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToasterContext.Provider>
    )
}

export const useToaster = () => {
    const context = useContext(ToasterContext)
    if (!context) throw new Error('useToaster must be used within ToasterProvider')
    return context
}
