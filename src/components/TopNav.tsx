import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Find Faculty', href: '#find-faculty', badge: 'New' },
    { label: 'Institutions', href: '#institutions' },
    { label: 'Resources', href: '#resources' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary-dark backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2.5 group">

              <img src="./logo1.png" alt="logo" className='h-15 w-full' />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-white group"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.label}
                  {link.badge && (
                    <span className="rounded-full bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                      {link.badge}
                    </span>
                  )}
                </span>
                <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 scale-x-0 rounded-full bg-indigo-500 transition-transform duration-200 group-hover:scale-x-100"></span>
              </a>
            ))}
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-300 transition-colors duration-200 hover:text-white px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="relative inline-flex items-center justify-center rounded-xl bg-slate-500/10 px-4.5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-all duration-200 hover:from-indigo-500 hover:to-purple-500 hover:scale-[1.02] hover:shadow-indigo-500/35 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50"
            >
              Join as Faculty
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-lg" id="mobile-menu">
          <div className="space-y-1.5 px-4 py-4.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="rounded-full bg-indigo-500/10 px-1.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/5 pt-5">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-indigo-500 hover:to-purple-500"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
