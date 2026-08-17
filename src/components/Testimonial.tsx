interface Testimonial {
    id: string;
    quote: string;
    name: string;
    avatar: string;
    highlighted?: boolean;
}

const testimonials: Testimonial[] = [
    {
        id: 'damiloju',
        quote:
            "Talent Faculty completely changed how I approach learning. The hands-on projects and mentor feedback gave me practical experience that I couldn't get from watching videos alone.",
        name: 'Damiloju Abe',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
        id: 'jonathan',
        quote:
            'The curriculum is practical, the platform is easy to use, and every project feels like real industry work. I gained confidence in my skills within a few weeks.',
        name: 'Jonathan Okeke',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        id: 'mirabel',
        quote: 'The structured learning kept me on track.',
        name: 'Mirabel Philips',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        id: 'mercy',
        quote: 'Mentor feedback made a real difference.',
        name: 'Mercy Ishola',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        highlighted: true,
    },
];

// Nigerian flag as a small circular badge (green - white - green)
const NigeriaFlag = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-5 rounded-sm overflow-hidden" aria-label="Nigeria">
        <rect x="0" y="0" width="8" height="24" fill="#008751" />
        <rect x="8" y="0" width="8" height="24" fill="#ffffff" />
        <rect x="16" y="0" width="8" height="24" fill="#008751" />
    </svg>
);

const QuoteMark = ({ light = false }: { light?: boolean }) => (
    <span
        className={`font-serif text-5xl leading-none select-none ${light ? 'text-white/90' : 'text-orange-500'
            }`}
        aria-hidden="true"
    >
        &ldquo;
    </span>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    const { quote, name, avatar, highlighted } = testimonial;

    return (
        <div
            className={`rounded-2xl p-6 flex flex-col h-full shadow-sm ${highlighted ? 'bg-primary text-white' : 'bg-white text-gray-900'
                }`}
        >
            <QuoteMark light={highlighted} />

            <p
                className={`text-sm leading-relaxed mt-2 flex-1 ${highlighted ? 'text-white/95' : 'text-gray-700'
                    }`}
            >
                {quote}
            </p>

            <div className="flex items-center gap-3 mt-6">
                <img
                    src={avatar}
                    alt={name}
                    className="w-9 h-9 rounded-full object-cover"
                />
                <span
                    className={`text-sm font-semibold flex-1 ${highlighted ? 'text-white' : 'text-gray-900'
                        }`}
                >
                    {name}
                </span>
                <NigeriaFlag />
            </div>
        </div>
    );
};

const TestimonialsSection = () => {
    const [big, topRight, bottomLeft, bottomRight] = testimonials;

    return (
        <section id="test" className="w-full max-w-7xl mx-auto px-4 py-20">
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    What Our Learners Say
                </h2>
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                    Hear from learners who have transformed their skills, built
                    real-world projects, and taken meaningful steps toward their career
                    goals with Talent Faculty.
                </p>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:auto-rows-fr">
                {/* Big card spans both rows on the left */}
                <div className="sm:row-span-2">
                    <TestimonialCard testimonial={big} />
                </div>

                {/* Top-right wide card */}
                <div className="sm:col-span-2">
                    <TestimonialCard testimonial={topRight} />
                </div>

                {/* Bottom two smaller cards */}
                <div>
                    <TestimonialCard testimonial={bottomLeft} />
                </div>
                <div>
                    <TestimonialCard testimonial={bottomRight} />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;