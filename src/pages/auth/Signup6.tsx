import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import OtpInput from '../../components/common/OtpInput'
import { authService } from '../../services/authService'
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function Signup6() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = (location.state as { email?: string } | null)?.email || 'you@example.com'

  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendSuccess, setResendSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResendSuccess(null)

    if (code.length < 6) {
      setError('Please enter the full 6-digit code.')
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.verifyOtp({
        email,
        otp: code,
        verification_type: 'password_reset',
        verifiable_type: 'user',
      })

      const verified_token = response?.data?.verified_token

      if (verified_token) {
        navigate('/signup9', { state: { email, verified_token } })
      } else {
        setError(response?.message || 'Verification failed. Please check the code and try again.')
      }
    } catch (err: unknown) {
      const apiErr = err as { message?: string; details?: string }
      setError(apiErr?.details || apiErr?.message || 'Invalid or expired OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setError(null)
    setResendSuccess(null)
    setIsResending(true)

    try {
      const res = await authService.forgotPassword({
        email,
        verification_type: 'password_reset',
        verifiable_type: 'user',
      })

      if (res?.success !== false) {
        setResendSuccess('A new reset code has been sent to your email.')
        setCode('')
      } else {
        setError(res?.message || 'Failed to resend code.')
      }
    } catch (err: unknown) {
      const apiErr = err as { message?: string; details?: string }
      setError(apiErr?.details || apiErr?.message || 'Failed to resend code.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-sans">
      {/* Left Panel - Green Gradient */}
      <div className="lg:flex lg:w-[42%] xl:w-[40%] min-h-[20vh] lg:min-h-screen relative overflow-hidden bg-[#024F2A]">
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center mt-10 md:mt-0 px-12 xl:px-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F2882F] mb-6">
            step 2 of 3
          </p>

          <h1 className="text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-2">
            One code stands between you and your dashboard.
          </h1>

          <p className="text-base md:block text-white/60 italic leading-relaxed max-w-xs mb-10">
            Code expires after 10 minutes.
          </p>

          {/* Steps list */}
          <div className="flex flex-col mb-8 gap-5">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#F2882F] shrink-0" />
              <span className="text-white font-semibold text-sm">Request</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#F2882F] shrink-0" />
              <span className="text-white font-medium text-sm">Verify</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-white/30 shrink-0" />
              <span className="text-white/40 font-medium text-sm">Reset</span>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 pointer-events-none">
          <img
            src="./Ellipse 1.png"
            alt="ellipse_1"
            className="w-[420px] h-[391px] drop-shadow-2xl"
          />
        </div>

        <div className="absolute right-0 bottom-0 pointer-events-none">
          <img
            src="./Ellipse 2.png"
            alt="ellipse_2"
            className="w-[420px] h-[391px] drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#f2faf3] px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1">
              Check your inbox
            </h2>

            <p className="text-sm text-[#6b7280]">
              We sent a 6-digit code to{' '}
              <span className="text-[#4b5563] font-medium">{email}</span>.
              Enter it below to confirm the reset request.
            </p>
          </div>

          {/* Feedback Banners */}
          {error && (
            <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700 animate-fade-in">
              <AlertCircle size={17} className="shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {resendSuccess && (
            <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-800 animate-fade-in">
              <CheckCircle2 size={17} className="shrink-0 text-green-600 mt-0.5" />
              <span>{resendSuccess}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <OtpInput
              length={6}
              value={code}
              onChange={setCode}
            />

            <button
              type="submit"
              disabled={isLoading || code.length < 6}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#057834] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2eb14f] hover:shadow-md active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Verify</span>
              )}
            </button>
          </form>

          {/* Bottom Links */}
          <p className="mt-8 text-center text-sm text-[#6b7280]">
            Didn't get it?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-[#34C759] hover:text-[#2eb14f] transition-colors cursor-pointer disabled:opacity-50"
            >
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          </p>

          <p className="mt-2 text-center text-sm">
            <Link
              to="/login"
              className="font-semibold text-[#1a1a1a] hover:text-[#057834] transition-colors"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}