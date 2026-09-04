import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import { useAuth } from '../../context/AuthContext'
import { Loader2, AlertCircle } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!formData.password) {
      setError('Please enter your password.')
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.login({
        email: formData.email.trim(),
        password: formData.password,
      })

      if (response?.data?.user && response?.data?.token) {
        login(response.data.user, response.data.token)
        navigate('/dashboard')
      } else {
        setError(response?.message || 'Login failed. Please check your credentials.')
      }
    } catch (err: unknown) {
      const apiErr = err as { message?: string; details?: string }
      setError(apiErr?.details || apiErr?.message || 'Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen">

      {/* Left Panel - Green Gradient */}
      <div className="lg:w-[42%] xl:w-[40%] lg:flex min-h-[43vh] md:min-h-[68vh] lg:min-h-screen relative overflow-hidden bg-primary-dark">
        {/* Tab Toggle */}
        <div className="flex px-6 pt-6 pb-4 relative z-100 lg:hidden mb-10">
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => setActiveTab('signin')}
              className={`rounded-full px-6 py-2 text-sm transition-all duration-200 ${
                activeTab === 'signin'
                  ? 'bg-white text-primary-dark shadow-md'
                  : 'text-white hover:bg-[#057834]/5'
              }`}
            >
              Sign In
            </button>
            <Link
              to="/signup"
              className="rounded-full px-6 py-2 text-sm text-white hover:bg-[#057834]/5 transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center mt-8 md:mt-1 mb-8 lg:mb-0 lg:mt-0 px-12 xl:px-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-6">
            Welcome back
          </p>
          <h1 className="text-3xl lg:text-4xl font-display xl:text-5xl text-white leading-tight mb-2">
            Every course is a path.
          </h1>
          <h1 className="text-3xl lg:text-4xl font-display xl:text-5xl text-white leading-tight mb-8">
            Let's find yours.
          </h1>
          <p className="text-base text-white/60 italic leading-relaxed max-w-xs">
            TalentFlow tracks progress the way a good mentor would, one deliberate step after another.
          </p>
        </div>
        <div className="absolute left-0 top-0 pointer-events-none">
          <img src="./Ellipse 1.png" alt="ellipse_1" className="w-[420px] h-[391px] drop-shadow-2xl" />
        </div>
        <div className="absolute right-0 bottom-0 pointer-events-none">
          <img src="./Ellipse 2.png" alt="ellipse_2" className="w-[420px] h-[391px] drop-shadow-2xl" />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col items-center lg:min-h-screen justify-center bg-[#E6F4EA] px-6 py-12 sm:px-12 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Tab Toggle */}
          <div className="md:justify-center hidden lg:flex mb-10">
            <div className="inline-flex items-center rounded-full border border-[#34C759]/30 bg-white p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('signin')}
                className={`rounded-full px-6 py-2 text-sm transition-all duration-200 ${
                  activeTab === 'signin'
                    ? 'bg-primary-dark text-white shadow-md'
                    : 'text-primary-dark hover:bg-primary-dark/5'
                }`}
              >
                Sign In
              </button>
              <Link
                to="/signup"
                className="rounded-full px-6 py-2 text-sm text-primary-dark hover:bg-[#34C759]/5 transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1">Welcome back</h2>
            <p className="text-sm text-[#6b7280]">
              Sign in to pick up right where you left.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-3.5 text-sm text-red-700 animate-fade-in">
              <AlertCircle size={18} className="shrink-0 text-red-500 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="You@example.com"
                  disabled={isLoading}
                  className="w-full rounded-lg border border-[#d1d5db] bg-white py-3 pl-11 pr-4 text-sm text-[#1a1a1a] placeholder-[#9ca3af] outline-none transition-colors focus:border-[#34C759] focus:ring-1 focus:ring-[#34C759] disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  className="w-full rounded-lg border border-[#d1d5db] bg-white py-3 pl-4 pr-11 text-sm text-[#1a1a1a] placeholder-[#9ca3af] outline-none transition-colors focus:border-[#34C759] focus:ring-1 focus:ring-[#34C759] disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280] transition-colors"
                >
                  {showPassword ? (
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#d1d5db] text-[#34C759] focus:ring-[#34C759] focus:ring-offset-0"
                />
                <span className="text-sm text-[#4b5563]">Remember me</span>
              </label>
              <Link to="/passwordReset" className="text-sm font-medium text-[#34C759] hover:text-[#2eb14f] transition-colors">
                Forgot password ?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#057834] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2eb14f] hover:shadow-md active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7 flex items-center">
            <span className="flex-1 border-t border-[#d1d5db]" />
            <span className="px-4 text-sm text-[#9ca3af]">or continue with</span>
            <span className="flex-1 border-t border-[#d1d5db]" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#d1d5db] bg-white py-3 text-sm font-medium text-[#1a1a1a] transition-all duration-200 hover:bg-[#f9fafb] hover:shadow-sm"
            >
              Google
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#d1d5db] bg-white py-3 text-sm font-medium text-[#1a1a1a] transition-all duration-200 hover:bg-[#f9fafb] hover:shadow-sm"
            >
              Github
            </button>
          </div>

          {/* Bottom Link */}
          <p className="mt-8 text-center text-sm text-[#6b7280]">
            New to Talentflow ?{' '}
            <Link to="/signup" className="font-semibold text-[#34C759] hover:text-[#2eb14f] transition-colors">
              Create an Account
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}