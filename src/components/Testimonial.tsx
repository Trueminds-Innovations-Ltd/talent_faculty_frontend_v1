import Reveal from './common/Reveal';

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
        quote: 'The structured learning kept me on track throughout my learning journey.',
        name: 'Mirabel Philips',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        id: 'mercy',
        quote: 'Mentor feedback and live project critiques made a real difference in landing opportunities.',
        name: 'Mercy Ishola',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        highlighted: true,
    },
];

const NigeriaFlag = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-5 rounded-xs overflow-hidden" aria-label="Nigeria">
        <rect x="0" y="0" width="8" height="24" fill="#008751" />
        <rect x="8" y="0" width="8" height="24" fill="#ffffff" />
        <rect x="16" y="0" width="8" height="24" fill="#008751" />
    </svg>
);

const QuoteMark = ({ light = false }: { light?: boolean }) => (
    <span
        className={`font-serif text-5xl leading-none select-none ${light ? 'text-white/90' : 'text-orange-500'}`}
        aria-hidden="true"
    >
        &ldquo;
    </span>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    const { quote, name, avatar, highlighted } = testimonial;

    return (
        <div
            className={`rounded-3xl p-7 flex flex-col justify-between h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${
                highlighted ? 'bg-primary text-white' : 'bg-white text-gray-900'
            }`}
        >
            <div>
                <QuoteMark light={highlighted} />
                <p
                    className={`text-sm sm:text-base leading-relaxed mt-2 ${
                        highlighted ? 'text-white/95' : 'text-gray-700'
                    }`}
                >
                    {quote}
                </p>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-black/5">
                <img
                    src={avatar}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover shadow-xs"
                />
                <span
                    className={`text-sm font-bold flex-1 ${
                        highlighted ? 'text-white' : 'text-gray-900'
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
        <section id="test" className="w-full max-w-7xl mx-auto px-4 py-16 overflow-hidden">
            {/* Header */}
            <Reveal animation="slide-down" delay={100}>
                <div className="text-center max-w-xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        What Our <span className="text-primary">Learners Say</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 mt-3 leading-relaxed">
                        Hear from learners who have transformed their skills, built
                        real-world projects, and taken meaningful steps toward their career
                        goals with Talent Faculty.
                    </p>
                </div>
            </Reveal>

            {/* Bento grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:auto-rows-fr">
                {/* Big card spans both rows on the left */}
                <Reveal animation="slide-right" delay={200} className="sm:row-span-2 h-full">
                    <TestimonialCard testimonial={big} />
                </Reveal>

                {/* Top-right wide card */}
                <Reveal animation="slide-left" delay={300} className="sm:col-span-2 h-full">
                    <TestimonialCard testimonial={topRight} />
                </Reveal>

                {/* Bottom two smaller cards */}
                <Reveal animation="slide-up" delay={400} className="h-full">
                    <TestimonialCard testimonial={bottomLeft} />
                </Reveal>
                <Reveal animation="slide-up" delay={500} className="h-full">
                    <TestimonialCard testimonial={bottomRight} />
                </Reveal>
            </div>
        </section>
    );
};

export default TestimonialsSection;