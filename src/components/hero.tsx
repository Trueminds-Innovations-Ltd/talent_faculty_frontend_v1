import { ArrowRight, Play } from "iconsax-react"
import { Link } from "react-router-dom"
import Reveal from "./common/Reveal"

export default function Hero() {
    return (
        <div className="bg-white md:mb-5 overflow-hidden">
            <div className="min-h-screen bg-white text-black items-center justify-center flex flex-col pt-20 pb-12">
                <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-4 flex flex-col items-center">
                    <Reveal animation="slide-down" delay={100}>
                        <div className="flex justify-center mb-4">
                            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2 transition-transform hover:scale-105 duration-200">
                                <span className="h-2 w-2 rounded-full bg-green-600 animate-ping"></span>
                                <p className="text-sm font-medium text-green-700">
                                    Build Real Skills for the Future
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal animation="slide-up" delay={200}>
                        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
                            Learn Practical Skills, Build Real Projects, <span className="text-primary underline decoration-primary/30 decoration-wavy">Launch Your Career.</span>
                        </h2>
                    </Reveal>

                    <Reveal animation="slide-up" delay={300}>
                        <p className="text-center text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mt-2">
                            Talent Faculty is a collaborative learning platform designed to help students and aspiring professionals gain real-world experience through expert-led courses, hands-on projects, mentorship, and measurable learning outcomes.
                        </p>
                    </Reveal>

                    <Reveal animation="zoom-in" delay={400}>
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 mb-3">
                            <Link to='/signup'>
                                <button className="px-6 py-3.5 flex items-center gap-2 bg-primary hover:bg-primary-dark rounded-xl text-white font-semibold shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
                                    <Play size="20" color="#d9e3f0" />
                                    <span>Start Learning</span>
                                </button>
                            </Link>

                            <a href='#Explore'>
                                <button className="border-2 flex items-center justify-center gap-2 border-gray-200 hover:border-primary hover:text-primary p-3 px-6 rounded-xl text-gray-700 font-semibold hover:bg-green-50/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
                                    <span>Explore Program</span>
                                    <ArrowRight size="20" color="currentColor" />
                                </button>
                            </a>
                        </div>
                    </Reveal>

                    <Reveal animation="fade" delay={500}>
                        <div className="flex items-center gap-3 pt-2">
                            <Link to='/admin/signin'>
                                <button className="px-4 py-2 flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-xs font-semibold text-neutral-700 transition hover:scale-105">
                                    <Play size="14" color="#057834" />
                                    Admin Demo
                                </button>
                            </Link>

                            <Link to='/instructor/signin'>
                                <button className="px-4 py-2 flex items-center gap-1.5 border border-neutral-200 hover:border-neutral-300 rounded-lg text-xs font-semibold text-neutral-700 transition hover:scale-105">
                                    <ArrowRight size="14" color="#057834" />
                                    Instructor Demo
                                </button>
                            </Link>
                        </div>
                    </Reveal>
                </div>

                <div className="bg-white text-center text-black px-5 w-full mt-4">
                    <Reveal animation="slide-up" delay={600}>
                        <div className="justify-center flex flex-col items-center text-center gap-5">
                            <h1 className="text-sm md:text-base font-medium text-gray-500">
                                Trusted by ambitious learners and forward-thinking organizations
                            </h1>
                            <div className="w-full max-w-5xl overflow-hidden relative"
                                style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                                <div className="animate-marquee flex items-center gap-16 w-max py-2">
                                    <img src="./supon.png" alt="Our partners" className="h-9 object-contain grayscale hover:grayscale-0 transition duration-300" />
                                    <img src="./supon.png" alt="Our partners" className="h-9 object-contain grayscale hover:grayscale-0 transition duration-300" />
                                    <img src="./supon.png" alt="Our partners" className="h-9 object-contain grayscale hover:grayscale-0 transition duration-300" />
                                    <img src="./supon.png" alt="Our partners" className="h-9 object-contain grayscale hover:grayscale-0 transition duration-300" />
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    )
}