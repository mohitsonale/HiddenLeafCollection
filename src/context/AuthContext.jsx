import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    const login = async (email, password) => {
        if (email === 'admin@sparkiit.com' && password === 'admin123') {
            const adminUser = { id: 'admin-1', email, role: 'admin' }
            setUser(adminUser)
            localStorage.setItem('user', JSON.stringify(adminUser))
        } else {
            const normalUser = { id: 'user-1', email, role: 'user' }
            setUser(normalUser)
            localStorage.setItem('user', JSON.stringify(normalUser))
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
