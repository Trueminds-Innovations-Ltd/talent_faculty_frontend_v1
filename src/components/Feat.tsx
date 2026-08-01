import { useState } from 'react';

import {
    Award,
    Video,
    Clock,
    Chart,
    Mobile,
    ArrowRight,

} from 'iconsax-react';

const Feat = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            id: 0,
            icon: <Mobile size={32} color="#10B981" variant="Bold" />,
            title: "Learn By Doing",
            description: "Build real-world projects instead of only watching videos.",
            color: "blue"
        },
        {
            id: 1,
            icon: <Video size={32} color="#3B82F6" variant="Bold" />,
            title: "Industry Mentorship",
            description: "Receive personalized guidance from experienced professionals.",
            color: "from-blue-500 to-blue-600"
        },
        {
            id: 2,
            icon: <Mobile size={32} color="#8B5CF6" variant="Bold" />,
            title: "Career-Focused Curriculum",
            description: "Develop skills employers actually demand.",
            color: "from-purple-500 to-purple-600"
        },
        {
            id: 3,
            icon: <Award size={32} color="#F59E0B" variant="Bold" />,
            title: "Collaborative Learning",
            description: "Learn alongside peers in structured cohorts.",
            color: "from-amber-500 to-amber-600"
        },
        {
            id: 4,
            icon: <Clock size={32} color="#EC489A" variant="Bold" />,
            title: "Track Your Growth",
            description: "Monitor your progress with assessments and achievements.",
            color: "from-pink-500 to-pink-600"
        },
        {
            id: 5,
            icon: <Chart size={32} color="#06B6D4" variant="Bold" />,
            title: "Certificates",
            description: "Earn certificates that showcase your accomplishments.",
            color: "from-cyan-500 to-cyan-600"
        }
    ];


    return (
        <section className="relative bg-white to-gray-50 py-10 lg:pt-20 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}

                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        <span className=" text-black">
                            Why Choose Talent Faculty?
                        </span>
                        <br />
                    </h2>
                    <p className="text-md text-gray-600 max-w-3xl mx-auto">
                        More than just online courses—we prepare you for the workplace with practical learning, mentorship, and real project experience.
                    </p>
                </div>


                {/* Features Grid */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-46">
                    {features.map((feature,) => (
                        <div
                            key={feature.id}
                            className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${activeFeature === feature.id ? 'ring-2 ring-emerald-500' : ''
                                }`}
                            onMouseEnter={() => setActiveFeature(feature.id)}
                        >
                            {/* Animated Border */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>

                            <div className="relative">
                                <div className={`w-10 h-10 rounded-xl  ${feature.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600  leading-relaxed">{feature.description}</p>
                                <div className="flex items-center justify-between">
                                    <ArrowRight size={18} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Feat;