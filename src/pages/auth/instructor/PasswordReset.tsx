import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../../components/layout/instruct/AuthLayout'
import Input from '../../../components/common/Input'
import Button from '../../../components/common/Button'
import StepIndicator from '../../../components/common/StepIndicator'

const InPasswordReset: React.FC = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { label: 'Request', status: 'current' as const },
    { label: 'Verify', status: 'upcoming' as const },
    { label: 'Reset', status: 'upcoming' as const },
  ]

  const leftPanelContent = (
    <div className="text-white">
      <p className="text-secondary text-xs font-medium tracking-widest uppercase mb-4">
        STEP 1 OF 3
      </p>
      <h1 className="font-display text-3xl lg:text-5xl xl:text-5xl leading-tight mb-6">
        It happens to<br />everyone.
      </h1>
      <p className="text-white/70 italic lg:text-lg leading-relaxed max-w-sm mb-12">
        We will help you get back in a minute.
      </p>
      <StepIndicator steps={steps} />
    </div>
  )

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setError('')
    setIsLoading(true)

    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false)
      alert(`Verification code has been sent to ${email}`)
    }, 1500)
  }

  return (
    <AuthLayout leftPanelContent={leftPanelContent}  >
      <div className="animate-fade-in">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-1">
          Reset your password
        </h2>
        <p className="text-neutral-400 text-sm mb-8">
          Enter the email tied to your account and we'll send a code to verify it's you.
        </p>

        <form onSubmit={handleSendCode} className="space-y-6">
          <Input
            label="Email address"
            type="email"
            placeholder="You@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          <Link to="/instructor/signup6">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              className="mt-2 bg-[#057834]"
            >
              Send code
            </Button>
          </Link>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-6">
          <Link to="/instructor/signin" className="text-primary-dark hover:text-primary-dark font-medium transition-colors">
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default InPasswordReset