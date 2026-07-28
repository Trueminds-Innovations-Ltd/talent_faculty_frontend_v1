import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signin() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signup')
  const [formData, setFormData] = useState({
    email: '',

  })




  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">

      {/* Left Panel - Green Gradient */}
      <div className=" md:flex  md:w-[360px] lg:w-[589px] min-h-[20vh] md:min-h-screen  relative overflow-hidden bg-[#024F2A]">

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center mt-10 md:mt-0 px-12 xl:px-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#34C759] mb-6">
            step 1 of 3
          </p>
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-2">
            First, an account.
          </h1>
          <p className="text-base hidden md:block text-white/60 italic leading-relaxed max-w-xs mb-10">
            Just the basics, you can shape your learning path in the next step
          </p>

          {/* Steps list */}
          <div className="flex hidden md:block flex-col gap-5">
            {/* Step 1 - Account (active) */}
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#F2882F] shrink-0" />
              <span className="text-white font-semibold text-sm">Account</span>
            </div>

            {/* Step 2 - Verify */}
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-white/30 shrink-0" />
              <span className="text-white/40 font-medium text-sm">Verify</span>
            </div>

            {/* Step 3 - Details */}
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-white/30 shrink-0" />
              <span className="text-white/40 font-medium text-sm">Details</span>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0">
          <img src="./Ellipse 1.png" alt="ellipse_1" className="w-[420px] h-[391px] drop-shadow-2xl" />
        </div>
        <div className="absolute right-0 bottom-0">
          <img src="./Ellipse 2.png" alt="ellipse_1" className="w-[420px] h-[391px] drop-shadow-2xl" />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col items-center md:justify-center bg-[#f2faf3] px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">

          {/* Tab Toggle */}
          <div className="flex md:justify-center mb-10">
            <div className="inline-flex items-center rounded-full border border-[#34C759]/30 bg-white p-1 shadow-sm">
              <Link
                to="/login"
                className="rounded-full px-6 py-2 text-sm font-semibold text-[#34C759] hover:bg-[#34C759]/5 transition-all duration-200"
              >
                Sign In
              </Link>

              <button
                onClick={() => setActiveTab('signin')}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 ${activeTab === 'signup'
                  ? 'bg-[#057834] text-white shadow-md'
                  : 'text-[#057834] hover:bg-[#057834]/5'
                  }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1">Get started</h2>
            <p className="text-sm text-[#6b7280]">
              Step 1 of 3, tell us who's joining.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">

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
                  className="w-full rounded-lg border border-[#d1d5db] bg-white py-3 pl-11 pr-4 text-sm text-[#1a1a1a] placeholder-[#9ca3af] outline-none transition-colors focus:border-[#34C759] focus:ring-1 focus:ring-[#34C759]"
                />
              </div>
            </div>







            <button
              type="submit"
              className="w-full rounded-lg bg-[#057834] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2eb14f] hover:shadow-md active:scale-[0.99]"
            >
              Continue
            </button>
          </form>


          {/* Bottom Link */}
          <p className="mt-8 text-center text-sm text-[#6b7280]">
            Already have an account ?{' '}
            <Link to="/login" className="font-semibold text-[#34C759] hover:text-[#2eb14f] transition-colors">
              Sign In
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}
