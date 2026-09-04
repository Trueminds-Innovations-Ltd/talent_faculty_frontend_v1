import React, { useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThemeColors } from '../../components/ThemeColors'
import AuthLayout from '../../components/layout/AuthLayout'
import { authService } from '../../services/authService'
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function SignupVerifyEmail() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = (location.state as { email?: string } | null)?.email || 'you@example.com'

  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendSuccess, setResendSuccess] = useState<string | null>(null)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const otp = digits.join('')

  const handleDigitChange = (index: number, value: string) => {
    const clean = value.replace(/[^0-9]/g, '')
    if (!clean) {
      const next = [...digits]
      next[index] = ''
      setDigits(next)
      return
    }

    const next = [...digits]
    const chars = clean.split('')
    let cursor = index
    for (const ch of chars) {
      if (cursor < 6) {
        next[cursor] = ch
        cursor++
      }
    }
    setDigits(next)
    const nextFocus = Math.min(cursor, 5)
    inputRefs.current[nextFocus]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6)
    if (!pasted) return

    const next = [...digits]
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i]
    }
    setDigits(next)
    const nextFocus = Math.min(pasted.length, 5)
    inputRefs.current[nextFocus]?.focus()
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResendSuccess(null)

    if (otp.length < 6) {
      setError('Please enter the complete 6-digit verification code.')
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.verifyOtp({
        email,
        otp,
        verification_type: 'registration',
        verifiable_type: 'user',
      })

      const verified_token = response?.data?.verified_token

      if (verified_token) {
        navigate('/signup-submit-details', {
          state: {
            email,
            verified_token,
          },
        })
      } else {
        setError(response?.message || 'Verification failed. Please check the code and try again.')
      }
    } catch (err: unknown) {
      const apiErr = err as { message?: string; details?: string }
      setError(apiErr?.details || apiErr?.message || 'Invalid or expired OTP. Please request a new code.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setError(null)
    setResendSuccess(null)
    setIsResending(true)

    try {
      const res = await authService.verifyEmail({
        email,
        verification_type: 'registration',
        verifiable_type: 'user',
      })

      if (res?.success !== false) {
        setResendSuccess('A new verification code has been sent to your email.')
        setDigits(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
      } else {
        setError(res?.message || 'Failed to resend code. Please wait a moment.')
      }
    } catch (err: unknown) {
      const apiErr = err as { message?: string; details?: string }
      setError(apiErr?.details || apiErr?.message || 'Failed to resend code.')
    } finally {
      setIsResending(false)
    }
  }

  const leftPanelContent = (
    <div className="text-white">
      <p className="text-secondary text-xs font-medium tracking-widest uppercase mb-4">
        STEP 2 OF 3
      </p>
      <h1 className="font-display text-3xl lg:text-4xl xl:text-4xl leading-tight mb-6">
        One Code Stands Between <br /> You and Your Dashboard
      </h1>
      <p className="text-white/70 italic lg:text-lg leading-relaxed max-w-sm mb-12">
        Code expires after 10 minutes
      </p>
      {/* Steps list */}
      <div className="flex flex-col mb-8 gap-5">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#F2882F] shrink-0" />
          <span className="text-white font-semibold text-sm">Account</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#F2882F] shrink-0" />
          <span className="text-white font-medium text-sm">Verify</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-white/30 shrink-0" />
          <span className="text-white/40 font-medium text-sm">Details</span>
        </div>
      </div>
    </div>
  )

  return (
    <main className="flex flex-col w-full md:justify-center min-h-screen">
      <AuthLayout leftPanelContent={leftPanelContent} activeToggle="signup">
        <div className="w-full flex flex-col justify-center md:items-center">
          <h2 style={{ color: ThemeColors.neutralCoalblack }} className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">
            Check your inbox
          </h2>
          <p style={{ color: ThemeColors.neutralAsh3 }} className="text-xs md:text-sm leading-relaxed mb-6 text-center">
            We sent a 6-digit code to <span className="font-semibold text-neutral-800">{email}</span>.<br className="hidden sm:block" /> Enter it below to confirm it's you.
          </p>

          {/* Feedback banners */}
          {error && (
            <div className="mb-6 w-full max-w-md flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700 animate-fade-in">
              <AlertCircle size={17} className="shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {resendSuccess && (
            <div className="mb-6 w-full max-w-md flex items-start gap-2.5 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-800 animate-fade-in">
              <CheckCircle2 size={17} className="shrink-0 text-green-600 mt-0.5" />
              <span>{resendSuccess}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="w-full flex flex-col items-center">
            {/* 6-Digit Code Input Group */}
            <div className="flex gap-2 sm:gap-3 mb-8">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  disabled={isLoading}
                  autoFocus={index === 0}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  style={{ borderColor: ThemeColors.neutralAsh6, color: ThemeColors.neutralCoalblack }}
                  className="w-11 h-12 sm:w-12 sm:h-14 bg-white border rounded-lg text-center text-xl font-bold focus:outline-none focus:border-[#024F2A] focus:ring-1 focus:ring-[#024F2A] transition-all shadow-sm disabled:opacity-60"
                />
              ))}
            </div>

            {/* Verify Button */}
            <div className="w-full flex justify-center mb-4">
              <button
                type="submit"
                disabled={isLoading || otp.length < 6}
                className="w-full md:w-1/2 flex items-center justify-center gap-2 rounded-lg bg-[#057834] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2eb14f] hover:shadow-md active:scale-[0.99] disabled:opacity-60 cursor-pointer"
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
            </div>
          </form>

          {/* Footer Navigation Buttons */}
          <div className="flex flex-col items-center gap-4">
            <p style={{ color: ThemeColors.neutralAsh3 }} className="text-xs font-medium">
              Didn't get it?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                style={{ color: ThemeColors.primaryGreen }}
                className="font-bold hover:underline ml-1 cursor-pointer disabled:opacity-50"
              >
                {isResending ? 'Sending...' : 'Resend code'}
              </button>
            </p>
            <Link to="/signup-email">
              <button type="button" style={{ color: ThemeColors.primaryGreen }} className="text-xs font-semibold hover:underline cursor-pointer">
                Back
              </button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    </main>
  )
}