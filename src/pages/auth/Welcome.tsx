
import React from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import AuthLayout from '../../components/layout/AuthLayout'
import Button from '../../components/common/Button'

const Welcome: React.FC = () => {
  const leftPanelContent = (
    <div className="text-white">
      <h1 className="font-display text-3xl lg:text-5xl xl:text-5xl leading-tight mb-6">
        Welcome back<br />to TalentFaculty.
      </h1>
    </div>
  )

  return (
    <AuthLayout leftPanelContent={leftPanelContent} showToggle={false}>
      <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center px-4 py-8 lg:py-16">
        
        {/* Logo */}
        <div className="mb-12 md:mb-16">
          <img
            src="/logo1.png"
            alt="TalentFaculty Logo"
            className="h-10 md:h-16 object-contain"
          />
        </div>

        {/* Success Checkmark Icon */}
        <div className="mb-8 rounded-full border-2 border-primary flex items-center justify-center h-14 w-14 md:h-16 md:w-16 text-primary">
          <Check size={32} strokeWidth={2.5} />
        </div>

        {/* Headings & Text */}
        <h2 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-3">
          Welcome to TalentFaculty
        </h2>

        <p className="text-sm md:text-base text-neutral-500 leading-relaxed mb-10 max-w-xs">
          Your account is ready, let's get you to your dashboard.
        </p>

        {/* Action Button */}
        <Link to="/dashboard" className="w-full">
          <Button
            type="button"
            variant="primary"
            fullWidth
            className="bg-[#057834] py-3.5"
          >
            Continue
          </Button>
        </Link>
      </div>
    </AuthLayout>
  )
}

export default Welcome