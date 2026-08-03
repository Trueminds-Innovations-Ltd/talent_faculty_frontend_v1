
import { ThemeColors } from "../../components/ThemeColors";
import { Link } from "react-router-dom";

export default function Signup10() {
  return (
    <main className="flex flex-col md:flex-row w-full min-h-screen font-sans">
      {/* Left Sidebar Banner */}
      <div
        style={{ backgroundColor: ThemeColors.secondaryGreen }}
        className="flex md:w-[360px] lg:w-[589px] py-12 md:py-0 md:min-h-screen relative overflow-hidden shrink-0"
      >
        {/* Decorative Ellipses */}
        <div className="absolute left-0 top-0 pointer-events-none opacity-50 md:opacity-100">
          <img
            src="./Ellipse 1.png"
            alt="ellipse_1"
            className="w-[300px] lg:w-[420px] h-[300px] lg:h-[391px] drop-shadow-2xl"
          />
        </div>
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-50 md:opacity-100">
          <img
            src="./Ellipse 2.png"
            alt="ellipse_2"
            className="w-[300px] lg:w-[420px] h-[300px] lg:h-[391px] drop-shadow-2xl"
          />
        </div>

        {/* Left Content */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-12 xl:px-16 w-full">
          {/* "Done" text is visible on desktop, hidden on mobile to match design */}
          <p
            style={{ color: ThemeColors.secondaryOrange }}
            className="hidden md:block text-xs font-semibold tracking-wide mb-6"
          >
            Done
          </p>

          <h1 className="text-[22px] md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
            Welcome back <br className="hidden md:block" />
            to TalentFaculty.
          </h1>
        </div>
      </div>

      {/* Right Form Section */}
      <div
        style={{ backgroundColor: ThemeColors.secondaryAsh }}
        className="flex-1 flex flex-col relative items-center justify-center p-6 md:p-12 min-h-[60vh] md:min-h-screen"
      >
        <div className=" items-center w-full flex flex-col text-center mt-8 md:mt-0">

          {/* Logo Placeholder */}
          <div className="flex flex-col mb-8 items-center md:mb-20">
            <img
              src="./logo1.png"
              alt="TalentFaculty Logo"
              className="h-10 md:h-25 object-contain"
            />
          </div>

          {/* Success Checkmark Icon */}
          <div
            className="mb-8 rounded-full  border-2 flex flex-col items-center justify-center h-14 w-14 md:h-16 md:w-16"
            style={{ borderColor: ThemeColors.primaryGreen }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 md:w-8 md:h-8"
            >
              <path
                d="M5 13L9 17L19 7"
                stroke={ThemeColors.primaryGreen}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Headings & Text */}
          <h2
            style={{ color: ThemeColors.neutralCoalblack }}
            className="text-lg md:text-xl font-bold mb-3"
          >
            You are all set
          </h2>

          <p
            style={{ color: ThemeColors.neutralAsh2 }}
            className="text-xs md:text-sm leading-relaxed mb-10 max-w-[260px] md:max-w-xs"
          >
            Your password has been updated, use it the next time you sign in.
          </p>

          {/* Action Button */}
          <Link to='/login' className="w-full max-w-xs">
            <button
              type="button"
              style={{ backgroundColor: ThemeColors.primaryGreen }}
              className="w-full px-10 py-3.5 rounded-lg text-white font-semibold text-sm hover:opacity-95 transition-opacity shadow-sm"
            >
              Back to sign in
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}