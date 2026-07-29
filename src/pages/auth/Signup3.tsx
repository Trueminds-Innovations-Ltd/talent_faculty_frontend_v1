
import { Link } from 'react-router-dom'
import { ThemeColors } from "../../components/ThemeColors";
import AuthLayout from '../../components/layout/AuthLayout';

export default function Signup3() {
  const leftPanelContent = (
    <div className="text-white">
      <p className="text-secondary text-xs font-medium tracking-widest uppercase mb-4">
        STEP 2 OF 3
      </p>
      <h1 className="font-display text-3xl lg:text-4xl xl:text-4xl leading-tight mb-6">
        One Code Stands Between <br /> You and Your Dashboard
      </h1>
      <p className="text-white/70  italic lg:text-lg leading-relaxed max-w-sm mb-12">
        Code expires after 10 minutes
      </p>
      {/* Steps list */}
      <div className="flex  flex-col mb-8 gap-5">
        {/* Step 1 - Account (active) */}
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#F2882F] shrink-0" />
          <span className="text-white font-semibold text-sm">Account</span>
        </div>

        {/* Step 2 - Verify */}
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#F2882F] shrink-0" />
          <span className="text-white font-medium text-sm">Verify</span>
        </div>

        {/* Step 3 - Details */}
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-white/30 shrink-0" />
          <span className="text-white/40 font-medium text-sm">Details</span>
        </div>
      </div>
    </div >
  )
  return (

    <main className="flex flex-col w-full md:justify-center  min-h-screen">

      {/* Right Form Section */}
      <AuthLayout leftPanelContent={leftPanelContent} activeToggle="signup" >
        {/* Main Card Content */}
        <div className="w-full    flex flex-col justify-center md:items-center">
          <h2 style={{ color: ThemeColors.neutralCoalblack }} className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">
            Check your inbox
          </h2>
          <p style={{ color: ThemeColors.neutralAsh3 }} className="text-xs md:text-sm leading-relaxed mb-8">
            We sent a 6-digit code to <span style={{ color: ThemeColors.neutralAsh2 }}>you@example.com</span>.<br className="hidden sm:block" /> Enter it below to confirm it's you.
          </p>

          {/* 6-Digit Code Input Group */}
          <div className="flex gap-2 sm:gap-3 mb-8">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                style={{ borderColor: ThemeColors.neutralAsh6, color: ThemeColors.neutralCoalblack }}
                className="w-11 h-12 sm:w-12 sm:h-14 bg-white border rounded-lg text-center text-xl font-bold focus:outline-none focus:border-[#024F2A] focus:ring-1 focus:ring-[#024F2A] transition-all shadow-sm"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Link to="/signup4" className='w-full flex justify-center mb-2'>
            <button
              type="submit"
              className="w-full md:w-1/2 rounded-lg bg-[#057834] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2eb14f] hover:shadow-md active:scale-[0.99]"
            >
              Verify
            </button>
          </Link>

          {/* Footer Navigation Buttons */}
          <div className="flex flex-col items-center gap-4">
            <p style={{ color: ThemeColors.neutralAsh3 }} className="text-xs font-medium">
              Didn't get it? <button type="button" style={{ color: ThemeColors.primaryGreen }} className="font-bold hover:underline ml-1">Resend code</button>
            </p>
            <button type="button" style={{ color: ThemeColors.primaryGreen }} className="text-xs font-semibold hover:underline">
              Back
            </button>
          </div>
        </div>
      </AuthLayout>


    </main>


  )
}