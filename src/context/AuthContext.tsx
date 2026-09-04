import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { User } from '../types/auth'
import {
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
  removeStoredToken,
  removeStoredUser,
} from '../services/apiClient'
import { dashboardService } from '../services/dashboardService'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (updatedFields: Partial<User>) => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser<User>())
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const login = useCallback((newUser: User, newToken: string) => {
    setUser(newUser)
    setToken(newToken)
    setStoredToken(newToken)
    setStoredUser(newUser)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    removeStoredToken()
    removeStoredUser()
  }, [])

  const updateUser = useCallback((updatedFields: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null
      const updated = { ...prev, ...updatedFields }
      setStoredUser(updated)
      return updated
    })
  }, [])

  const refreshUser = useCallback(async () => {
    const currentToken = getStoredToken()
    if (!currentToken) return

    try {
      const res = await dashboardService.getUserProfile()
      if (res?.data) {
        setUser(res.data)
        setStoredUser(res.data)
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    const currentToken = getStoredToken()
    const currentUser = getStoredUser<User>()

    if (currentToken && currentUser) {
      setUser(currentUser)
      setToken(currentToken)
    } else if (currentToken && !currentUser) {
      setToken(currentToken)
      refreshUser()
    }

    setIsLoading(false)
  }, [refreshUser])

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
    updateUser,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
