import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdSignup9() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    navigate('/admin/signup10')
  }

  const eyeOpen = (
    <svg
      className="h-4.5 w-4.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )

  const eyeClosed = (
    <svg
      className="h-4.5 w-4.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  )

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Left Panel - Green Gradient */}
      <div className="md:flex lg:w-[42%] xl:w-[40%] min-h-[20vh] md:min-h-screen relative overflow-hidden bg-[#024F2A]">
        <div className="relative z-10 flex flex-col justify-center mt-10 md:mt-0 px-12 xl:px-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F2882F] mb-6">
            step 3 of 3
          </p>

          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-2">
            Almost back in.
          </h1>

          <p className="text-base  md:block text-white/60 italic leading-relaxed max-w-xs mb-10">
            Choose a password you'll actually remember.
          </p>

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
              <span className="w-3 h-3 rounded-full bg-[#F2882F] shrink-0" />
              <span className="text-white font-semibold text-sm">Reset</span>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0">
          <img
            src="../Ellipse 1.png"
            alt="ellipse_1"
            className="w-[420px] h-[391px] drop-shadow-2xl"
          />
        </div>

        <div className="absolute right-0 bottom-0">
          <img
            src="../Ellipse 2.png"
            alt="ellipse_2"
            className="w-[420px] h-[391px] drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#f2faf3] px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1">
              Set a new password
            </h2>

            <p className="text-sm text-[#6b7280]">
              Make it something you haven't used on TalentFlow before.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter new password"
                  className="w-full rounded-lg border border-[#d1d5db] bg-white py-3 pl-4 pr-11 text-sm text-[#1a1a1a] placeholder-[#9ca3af] outline-none transition-colors focus:border-[#34C759] focus:ring-1 focus:ring-[#34C759]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280]"
                >
                  {showPassword ? eyeClosed : eyeOpen}
                </button>
              </div>

              <p className="mt-1.5 text-xs text-[#9ca3af]">
                Use 8+ characters with a number and a symbol.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                Confirm password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Re-enter new password"
                  className="w-full rounded-lg border border-[#d1d5db] bg-white py-3 pl-4 pr-11 text-sm text-[#1a1a1a] placeholder-[#9ca3af] outline-none transition-colors focus:border-[#34C759] focus:ring-1 focus:ring-[#34C759]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280]"
                >
                  {showConfirmPassword ? eyeClosed : eyeOpen}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#057834] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2eb14f] hover:shadow-md active:scale-[0.99]"
            >
              Reset password
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#6b7280]">
            <Link
              to="/admin/signin"
              className="font-semibold text-[#34C759] hover:text-[#2eb14f] transition-colors"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}