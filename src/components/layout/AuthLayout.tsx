import React from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: React.ReactNode
  leftPanelContent: React.ReactNode
  showToggle?: boolean
  activeToggle?: 'signin' | 'signup'
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  leftPanelContent,
  showToggle = true,
  activeToggle = 'signup',
}) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Green */}
      <div className="relative w-full lg:w-[42%] xl:w-[40%] bg-primary-dark overflow-hidden">
        {/* Decorative blurred circles */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-primary/40 blur-[80px]" />
        <div className="absolute top-[20%] right-[-5%] w-[200px] h-[200px] rounded-full bg-secondary/30 blur-[60px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[250px] h-[250px] rounded-full bg-primary/30 blur-[70px]" />

        {/* Mobile toggle - shown only on small screens */}
        {showToggle && (
          <div className="lg:hidden px-6 pt-6 pb-4">
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1">
              <Link
                to="/login"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeToggle === 'signin'
                    ? 'bg-white text-primary-dark'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup4"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeToggle === 'signup'
                    ? 'bg-white text-primary-dark'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        {/* Left panel content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-8 py-12 lg:px-12 lg:py-16 xl:px-16">
          {leftPanelContent}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 bg-primary-light min-h-screen overflow-y-auto">
        {/* Desktop toggle - shown only on large screens */}
        {showToggle && (
          <div className="hidden lg:flex justify-center pt-10 pb-6">
            <div className="inline-flex bg-white rounded-full p-1 shadow-sm">
              <Link
                to="/login"
                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeToggle === 'signin'
                    ? 'bg-primary-dark text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup4"
                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeToggle === 'signup'
                    ? 'bg-primary-dark text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        {/* Form content */}
        <div className="px-6 py-8 lg:px-12 lg:py-4 xl:px-20 max-w-2xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
