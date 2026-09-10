import { ArrowRight, Play } from "iconsax-react"
import { Link } from "react-router-dom"
import Reveal from "./common/Reveal"

const CalltoAction = () => {
    return (
        <section className="w-full mx-auto px-4 py-16 overflow-hidden">
            <Reveal animation="zoom-in" delay={100}>
                <div className="text-center max-w-7xl relative mx-auto w-full rounded-3xl bg-primary h-auto md:h-[420px] lg:h-[540px] overflow-hidden shadow-2xl">
                    <img src="./logoo.png" alt="logo" className="absolute -top-24 -left-24 w-80 opacity-10 rotate-12 pointer-events-none" />
                    <img src="./logoo.png" alt="logo" className="absolute top-10 left-1/3 w-72 opacity-10 -rotate-6 pointer-events-none" />
                    <img src="./logoo.png" alt="logo" className="absolute top-1/2 right-0 w-96 opacity-10 pointer-events-none" />
                    <img src="./logoo.png" alt="logo" className="absolute bottom-0 left-1/4 w-80 opacity-10 rotate-45 pointer-events-none" />
                    <img src="./logoo.png" alt="logo" className="absolute -bottom-24 right-1/3 w-72 opacity-10 pointer-events-none" />

                    <div className="absolute rounded-3xl inset-0 bg-black/40 backdrop-blur-xs pointer-events-none" />

                    <div className="flex relative z-10 flex-col md:flex-row items-center justify-between w-full h-full text-white">
                        <div className="p-8 sm:p-12 lg:p-16 text-left w-full max-w-lg lg:max-w-xl">
                            <Reveal animation="slide-left" delay={200}>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                                    A Learning Dashboard Designed for Success
                                </h2>
                            </Reveal>

                            <Reveal animation="slide-left" delay={300}>
                                <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed">
                                    Stay organized with a personalized dashboard that keeps your courses, assignments, assessments, certificates, and progress in one place.
                                </p>
                            </Reveal>

                            <Reveal animation="slide-up" delay={400}>
                                <div className="flex flex-wrap items-center gap-4 mt-8">
                                    <Link to='/dashboard'>
                                        <button className="bg-white flex items-center justify-center gap-2 text-primary px-6 py-3.5 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 active:scale-95 transition duration-300 shadow-lg shadow-black/10 cursor-pointer text-sm sm:text-base">
                                            <ArrowRight size="20" color="#34C759" />
                                            <span>See Dashboard</span>
                                        </button>
                                    </Link>
                                    <Link to='/signup'>
                                        <button className="border-2 flex items-center justify-center gap-2 border-white/80 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-white/20 hover:scale-105 active:scale-95 transition duration-300 cursor-pointer text-sm sm:text-base">
                                            <Play size="20" color="white" />
                                            <span>Start Learning</span>
                                        </button>
                                    </Link>
                                </div>
                            </Reveal>
                        </div>

                        <div className="hidden md:flex relative h-full items-end justify-end flex-1 pr-6 lg:pr-10">
                            <Reveal animation="slide-right" delay={300} className="w-full flex justify-end">
                                <img
                                    src="./MacBook.png"
                                    alt="Talent Faculty Dashboard MacBook Mockup"
                                    className="max-w-[420px] lg:max-w-[560px] object-contain drop-shadow-2xl animate-float-slow"
                                />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};

export default CalltoAction;