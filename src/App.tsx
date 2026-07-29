import { useState } from 'react'
import { Link } from 'react-router-dom'
import TopNav from './components/TopNav'

export default function App() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const features = [
    {
      title: 'Smart Matching AI',
      description: 'Find subject-matter experts and educators whose research interests and teaching styles perfectly align with your department.',
      icon: (
        <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Verified Credentials',
      description: 'Every educator profile features verified publication history, academic background, teaching credentials, and peer reviews.',
      icon: (
        <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Flexible Engagements',
      description: 'Hire for full-time tenure tracks, temporary sabbatical coverage, online curriculum development, or guest lectures.',
      icon: (
        <svg className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  const popularFaculties = [
    {
      name: 'Dr. Evelyn Sterling',
      title: 'Professor of Quantum Computing',
      affiliation: 'Formerly MIT',
      imageBg: 'from-blue-600 to-indigo-600',
      initials: 'ES',
      specialty: 'Quantum Algorithms'
    },
    {
      name: 'Dr. Marcus Vance',
      title: 'Associate Professor of Bioethics',
      affiliation: 'Stanford University',
      imageBg: 'from-purple-600 to-pink-600',
      initials: 'MV',
      specialty: 'Genetic Ethics'
    },
    {
      name: 'Dr. Elena Rostova',
      title: 'Senior Lecturer in Machine Learning',
      affiliation: 'Oxford Research Lab',
      imageBg: 'from-indigo-600 to-purple-600',
      initials: 'ER',
      specialty: 'Neural Networks'
    }
  ]

  return (
    <div className="relative min-h-screen bg-primary-dark text-slate-100 overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[150px]" />
      <div className="absolute top-1/3 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[130px]" />

      {/* Navigation */}
      <TopNav />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">

          {/* Left Column: Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-sm font-semibold text-indigo-300">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
              Empowering Higher Education
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Connect with World-Class{' '}
              <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Academic Faculty
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              TalentFaculty is the premier platform connecting universities and research institutions with verified, elite academic educators, researchers, and subject-matter experts worldwide.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/Signup"
                className="inline-flex items-center justify-center rounded-xl bg-slate-500/10 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:from-indigo-500 hover:to-purple-500 hover:scale-[1.02] hover:shadow-indigo-500/35"
              >
                Find Faculty
              </a>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/20"
              >
                Join as Faculty
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-white/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                TRUSTED BY LEADING INSTITUTIONS
              </p>
              <div className="flex flex-wrap gap-6 items-center opacity-50">
                <span className="text-sm font-bold tracking-widest text-slate-400">HARVARD</span>
                <span className="text-sm font-bold tracking-widest text-slate-400">MIT</span>
                <span className="text-sm font-bold tracking-widest text-slate-400">STANFORD</span>
                <span className="text-sm font-bold tracking-widest text-slate-400">OXFORD</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Elements */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[450px] lg:max-w-none">

              {/* Outer Glow Effect */}
              <div className="absolute -inset-1.5 rounded-3xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-30 transition duration-1000" />

              {/* Main Card/Mockup */}
              <div className="relative rounded-2xl border border-white/10 bg-slate-900/20 p-6 backdrop-blur-xl shadow-2xl">

                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/70" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <span className="h-3 w-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">talent-faculty-directory.v1</span>
                </div>

                <div className="space-y-4">

                  {/* Search Bar Mock */}
                  <div className="relative rounded-lg bg-slate-900/20 border border-white/5 px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-xs">Search specialties (e.g. Bioethics, AI)</span>
                    </div>
                    <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] text-slate-500">⌘K</span>
                  </div>

                  {/* Faculty Card Stack */}
                  <div className="space-y-3">
                    {popularFaculties.map((fac, idx) => (
                      <div
                        key={fac.name}
                        className={`rounded-xl border border-white/5 bg-slate-900/10 p-3.5 transition-all duration-300 hover:bg-slate-900/60 hover:scale-[1.01] hover:border-white/10 flex items-center gap-3.5 ${idx === 0 ? 'border-indigo-500/30 bg-indigo-500/5' : ''
                          }`}
                      >
                        <div className={`h-11 w-11 rounded-lg bg-linear-to-br ${fac.imageBg} flex items-center justify-center text-sm font-bold text-white shadow-md`}>
                          {fac.initials}
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs font-semibold text-white truncate">{fac.name}</h4>
                            {idx === 0 && (
                              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.2 text-[9px] font-semibold text-emerald-400 animate-pulse">
                                Available
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{fac.title}</p>
                          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5">
                            <span className="text-[9px] text-slate-500 truncate">{fac.affiliation}</span>
                            <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 text-[9px] font-medium text-indigo-400">
                              {fac.specialty}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-white/5 bg-primary-900/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-indigo-400">Why TalentFaculty</h2>
            <h3 className="text-3xl font-bold sm:text-4xl text-white">Streamlining Academic Placements</h3>
            <p className="text-base text-slate-400">
              We bridge the gap between institutional needs and top academic experts, offering transparency, verification, and flexibility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="group relative rounded-2xl border border-white/5 bg-slate-900/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-slate-900/60"
              >
                {/* Glow behind icon */}
                <div className="absolute -inset-px rounded-2xl bg-linear-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950/80 border border-white/5 transition-transform duration-300 group-hover:scale-105">
                  {feat.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feat.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary-900 px-6 py-12 shadow-2xl sm:px-12 sm:py-16 md:px-16">

          {/* Radial Light */}
          <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 opacity-20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-white">
              Stay Updated on Academic Openings
            </h2>
            <p className="text-base text-slate-300 max-w-xl mx-auto">
              Get notified when top universities list new guest positions, research collaborations, or tenure opportunities.
            </p>

            {subscribed ? (
              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4 max-w-md mx-auto text-indigo-300 font-semibold animate-fade-in">
                ✨ Thank you! You've successfully subscribed to our newsletter.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="Enter your academic email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-slate-500/10 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/10 transition-colors duration-200 hover:from-indigo-500 hover:to-purple-500"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-primary-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} TalentFaculty. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6 sm:mt-0">
            <a href="#" className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
