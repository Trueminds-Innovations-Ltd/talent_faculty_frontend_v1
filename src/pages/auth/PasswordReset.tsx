import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import StepIndicator from '../../components/common/StepIndicator'
import { authService } from '../../services/authService'
import { AlertCircle } from 'lucide-react'

const PasswordReset: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [serverError, setServerError] = useState<string | null>(null)
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

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setServerError(null)

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setError('Please enter your email address.')
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.forgotPassword({
        email: trimmedEmail,
        verification_type: 'password_reset',
        verifiable_type: 'user',
      })

      if (response?.success !== false) {
        navigate('/signup6', { state: { email: trimmedEmail } })
      } else {
        setServerError(response?.message || 'Failed to send reset code. Please try again.')
      }
    } catch (err: unknown) {
      const apiErr = err as { message?: string; details?: string }
      setServerError(apiErr?.details || apiErr?.message || 'Failed to send reset code. Please verify your email.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout leftPanelContent={leftPanelContent} activeToggle="signin">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-1">
          Reset your password
        </h2>
        <p className="text-neutral-400 text-sm mb-6">
          Enter the email tied to your account and we'll send a code to verify it's you.
        </p>

        {serverError && (
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-3.5 text-sm text-red-700 animate-fade-in">
            <AlertCircle size={18} className="shrink-0 text-red-500 mt-0.5" />
            <div className="flex-1">{serverError}</div>
          </div>
        )}

        <form onSubmit={handleSendCode} className="space-y-6">
          <Input
            label="Email address"
            type="email"
            placeholder="You@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            className="mt-2 bg-[#057834]"
          >
            Send code
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-6">
          <Link to="/login" className="text-primary-dark hover:text-primary-dark font-medium transition-colors">
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default PasswordReset