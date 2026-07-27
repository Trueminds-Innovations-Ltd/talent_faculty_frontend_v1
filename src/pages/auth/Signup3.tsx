import { ThemeColors } from "../../components/ThemeColors";

export default function Signup3 () {
    return (
        <main className="flex flex-col md:flex-row w-full min-h-screen">
              <div className="flex md:w-[360px] lg:w-[589px] py-10 md:py-0 md:min-h-screen relative overflow-hidden bg-[#024F2A]">

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-12 xl:px-16 w-full">
          <p style={{color: ThemeColors.secondaryOrange}} className="text-xs font-semibold uppercase tracking-widest mb-4 md:mb-6">
            <span className="hidden md:inline">almost there</span>
            <span className="md:hidden">STEP 2 OF 3</span>
          </p>
          
          {/* Desktop Heading */}
          <h1 className="hidden md:block text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-2">
            One Code Stands Between You and Your Dashboard
          </h1>
          
          {/* Mobile Heading */}
          <h1 className="md:hidden text-[22px] font-bold text-white leading-tight mb-2">
            One code stands between you and your dashboard.
          </h1>

          <p className="text-base hidden md:block text-white/60 leading-relaxed max-w-xs mb-10">
            Code expires after 10 minutes
          </p>

          {/* Steps list */}
          <div className="hidden md:flex flex-col space-y-2">
            {/* Step 1 - Account (active) */}
            <div className="flex items-center gap-3">
              <span style={{backgroundColor: ThemeColors.secondaryOrange}} className="w-3 h-3 rounded-full shrink-0" />
              <span style={{color: ThemeColors.secondaryOrange}} className="font-semibold text-xs">Account</span>
            </div>

            {/* Step 2 - Verify */}
            <div className="flex items-center gap-3">
              <span style={{backgroundColor: ThemeColors.secondaryOrange}} className="w-4 h-4 rounded-full shrink-0" />
              <span style={{color: ThemeColors.secondaryOrange}} className="40 font-medium text-xs">Verify</span>
            </div>

            {/* Step 3 - Details */}
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-white/30 shrink-0" />
              <span className="text-white/40 font-medium text-xs">Details</span>
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

      {/* Right Form Section */}
      <div style={{ backgroundColor: ThemeColors.secondaryAsh }} className="flex-1 flex flex-col relative items-center md:justify-center p-6 md:p-12 min-h-[60vh] md:min-h-screen">
        
        {/* Header Toggle Switch */}
        <div className="md:absolute md:top-12 mt-2 md:mt-0 mb-10 md:mb-0 bg-white rounded-full p-1.5 flex items-center shadow-sm">
          <button type="button" style={{ color: ThemeColors.neutralCoalblack }} className="px-6 py-2 rounded-full text-xs font-semibold">
            Sign In
          </button>
          <button type="button" style={{ backgroundColor: ThemeColors.secondaryGreen, color: ThemeColors.secondaryWhite }} className="px-6 py-2 rounded-full text-xs font-semibold shadow-sm">
            Sign Up
          </button>
        </div>

        {/* Main Card Content */}
        <div className="w-full max-w-md flex flex-col justify-center items-center">
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
          <button type="button" style={{ backgroundColor: ThemeColors.primaryGreen }} className="w-full py-3.5 rounded-lg text-white font-semibold text-sm hover:opacity-95 transition-opacity shadow-sm mb-6">
            Verify
          </button>

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
      </div>
        </main>
    )
}