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
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row lg:overflow-hidden">
      {/* Left Panel - Green */}
      <div className="relative w-full lg:w-[42%] xl:w-[40%] bg-primary-dark overflow-hidden lg:h-full lg:overflow-y-auto">
        {/* Decorative blurred circles */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-primary/40 blur-[80px]" />
        <div className="absolute top-[20%] right-[-5%] w-[200px] h-[200px] rounded-full bg-secondary/30 blur-[60px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[250px] h-[250px] rounded-full bg-primary/30 blur-[70px]" />



        {/* Left panel content */}
        <div className="relative z-10 flex flex-col justify-center min-h-full px-8 py-12 lg:px-12 lg:py-16 xl:px-16">
          {leftPanelContent}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 bg-[#E6F4EA] min-h-screen lg:flex justify-center flex-col pt-10 pb-6  lg:h-screen overflow-y-auto">

        {/* Form content */}
        <div className="px-6 py-8 lg:px-12 lg:py-4 xl:px-20 max-w-2xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
