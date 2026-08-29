import { useState } from 'react';
import {
    Award,
    Video,
    Clock,
    Chart,
    Mobile,
    ArrowRight,
} from 'iconsax-react';
import Reveal from './common/Reveal';

const Feat = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            id: 0,
            icon: <Mobile size={32} color="#10B981" variant="Bold" />,
            title: "Learn By Doing",
            description: "Build real-world projects instead of only watching videos.",
            color: "from-emerald-500 to-emerald-600",
            animation: "slide-right" as const
        },
        {
            id: 1,
            icon: <Video size={32} color="#3B82F6" variant="Bold" />,
            title: "Industry Mentorship",
            description: "Receive personalized guidance from experienced professionals.",
            color: "from-blue-500 to-blue-600",
            animation: "slide-up" as const
        },
        {
            id: 2,
            icon: <Mobile size={32} color="#8B5CF6" variant="Bold" />,
            title: "Career-Focused Curriculum",
            description: "Develop skills employers actually demand.",
            color: "from-purple-500 to-purple-600",
            animation: "slide-left" as const
        },
        {
            id: 3,
            icon: <Award size={32} color="#F59E0B" variant="Bold" />,
            title: "Collaborative Learning",
            description: "Learn alongside peers in structured cohorts.",
            color: "from-amber-500 to-amber-600",
            animation: "slide-right" as const
        },
        {
            id: 4,
            icon: <Clock size={32} color="#EC489A" variant="Bold" />,
            title: "Track Your Growth",
            description: "Monitor your progress with assessments and achievements.",
            color: "from-pink-500 to-pink-600",
            animation: "slide-up" as const
        },
        {
            id: 5,
            icon: <Chart size={32} color="#06B6D4" variant="Bold" />,
            title: "Certificates",
            description: "Earn certificates that showcase your accomplishments.",
            color: "from-cyan-500 to-cyan-600",
            animation: "slide-left" as const
        }
    ];

    return (
        <section className="relative bg-white py-12 lg:pt-20 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <Reveal animation="slide-down" delay={100}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose <span className="text-primary">Talent Faculty?</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                            More than just online courses—we prepare you for the workplace with practical learning, mentorship, and real project experience.
                        </p>
                    </div>
                </Reveal>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {features.map((feature, idx) => (
                        <Reveal
                            key={feature.id}
                            animation={feature.animation}
                            delay={idx * 120}
                            className="h-full"
                        >
                            <div
                                className={`group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full flex flex-col justify-between ${
                                    activeFeature === feature.id ? 'ring-2 ring-emerald-500 shadow-md' : ''
                                }`}
                                onMouseEnter={() => setActiveFeature(feature.id)}
                            >
                                {/* Animated Border Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl blur-md opacity-0 group-hover:opacity-20 transition duration-500 -z-10`} />

                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                                </div>

                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-100">
                                    <span className="text-xs font-semibold text-neutral-400 group-hover:text-primary transition-colors">Explore Feature</span>
                                    <ArrowRight size={18} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1.5 transition-all" />
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Feat;