import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import OtpInput from '../../components/common/OtpInput'

export default function Signup6() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = (location.state as { email?: string } | null)?.email || 'you@example.com'

  const [code, setCode] = useState('')
  const [resent, setResent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    navigate('/signup9', { state: { email } })
  }

  const handleResend = () => {
    setResent(true)
    setTimeout(() => setResent(false), 3000)
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-sans">
      {/* Left Panel - Green Gradient */}
      <div className="lg:flex  lg:w-[42%] xl:w-[40%] min-h-[20vh] lg:min-h-screen  relative overflow-hidden bg-[#024F2A]">
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center mt-10 md:mt-0 px-12 xl:px-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F2882F] mb-6">
            step 2 of 3
          </p>

          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-2">
            One code stands between you and your dashboard.
          </h1>

          <p className="text-base hidden md:block text-white/60 italic leading-relaxed max-w-xs mb-10">
            Code expires after 10 minutes.
          </p>

          {/* Steps list */}
          <div className="flex  flex-col mb-8 gap-5">
            {/* Step 1 - Account (active) */}
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#F2882F] shrink-0" />
              <span className="text-white font-semibold text-sm">Request</span>
            </div>

            {/* Step 2 - Verify */}
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#F2882F] shrink-0" />
              <span className="text-white font-medium text-sm">Verify</span>
            </div>

            {/* Step 3 - Details */}
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-white/30 shrink-0" />
              <span className="text-white/40 font-medium text-sm">Reset</span>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0">
          <img
            src="./Ellipse 1.png"
            alt="ellipse_1"
            className="w-[420px] h-[391px] drop-shadow-2xl"
          />
        </div>

        <div className="absolute right-0 bottom-0">
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <OtpInput
              length={6}
              value={code}
              onChange={setCode}
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-[#057834] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2eb14f] hover:shadow-md active:scale-[0.99]"
            >
              Verify
            </button>
          </form>

          {/* Bottom Links */}
          <p className="mt-8 text-center text-sm text-[#6b7280]">
            Didn't get it?{' '}
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-[#34C759] hover:text-[#2eb14f] transition-colors"
            >
              {resent ? 'Code sent!' : 'Resend Code'}
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