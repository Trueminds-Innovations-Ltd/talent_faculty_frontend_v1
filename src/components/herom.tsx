

import Reveal from './common/Reveal';

export default function Herom() {
    return (
        <div className="min-h-[80vh] bg-white text-black text-left justify-center flex flex-col md:flex-row items-center max-w-7xl mx-auto px-6 py-20 overflow-hidden">
            <div className="relative md:w-1/2 justify-center space-y-6 flex flex-col">
                <Reveal animation="slide-left" delay={100}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 w-fit">
                        <span className="h-2 w-2 rounded-full bg-green-600 animate-ping"></span>
                        <p className="text-xs font-semibold text-green-700">
                            The Creators & Innovators
                        </p>
                    </div>
                </Reveal>

                <Reveal animation="slide-left" delay={200}>
                    <h1 className="text-left text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                        Meet the people behind <span className="text-primary underline decoration-primary/30">Talent Faculty.</span>
                    </h1>
                </Reveal>

                <Reveal animation="slide-left" delay={300}>
                    <p className="text-left text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-lg">
                        Great products are built by people who bring different skills, perspectives and ideas to the table. Meet the designers, developers and creatives who contributed to making Talent Faculty possible.
                    </p>
                </Reveal>
            </div>

            <div className="justify-center md:w-1/2 flex flex-col mt-10 md:mt-0">
                <Reveal animation="slide-right" delay={300}>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-green-100 to-emerald-50 rounded-3xl blur-2xl opacity-70 -z-10" />
                        <img
                            src="./herom.png"
                            alt="Talent Faculty Team Illustration"
                            className="w-full h-auto object-contain drop-shadow-xl animate-float-slow"
                        />
                    </div>
                </Reveal>
            </div>
        </div>
    )
}