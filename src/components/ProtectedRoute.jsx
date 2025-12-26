import React, { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const ProtectedRoute = ({ children }) => {
  const { token, userData, isLoading } = useContext(AppContext)
  const location = useLocation()

  // Simple check - if no token, redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-stone-200">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-stone-900">Loading...</h3>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute


