import { useState } from 'react';
import { Add, Minus } from 'iconsax-react';
import Reveal from './common/Reveal';

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

const faqs: FaqItem[] = [
    {
        id: 'who-can-join',
        question: 'Who can join Talent Faculty?',
        answer:
            "Talent Faculty is open to students, graduates, professionals, and anyone looking to develop practical, career-ready skills. Whether you're just starting your journey or looking to upskill, there's a program for you.",
    },
    {
        id: 'prior-experience',
        question: 'Do I need prior experience?',
        answer:
            "No prior experience is required for our beginner programs. We start with the fundamentals and build up from there, so you can join regardless of your current skill level.",
    },
    {
        id: 'course-delivery',
        question: 'How are the courses delivered?',
        answer:
            'Courses are delivered online through a mix of self-paced video lessons, live mentor sessions, and hands-on projects, all accessible from your dashboard.',
    },
    {
        id: 'own-pace',
        question: 'Can I learn at my own pace?',
        answer:
            'Yes. Most course content is self-paced, so you can learn around your schedule. Live sessions are recorded in case you need to catch up.',
    },
    {
        id: 'certificate',
        question: 'Will I receive a certificate after completing a program?',
        answer:
            'Yes, you will receive a completion certificate for every program you finish, which you can add to your portfolio or share on LinkedIn.',
    },
    {
        id: 'mentors',
        question: 'Will I have access to mentors?',
        answer:
            'Professional and Enterprise plans include access to live mentor sessions where you can get feedback on your work and ask questions directly.',
    },
    {
        id: 'track-progress',
        question: 'How do I track my progress?',
        answer:
            'Your dashboard shows completed lessons, assignments, and projects in real time, so you always know exactly where you stand in each program.',
    },
];

const FaqSection = () => {
    const [openId, setOpenId] = useState<string | null>(faqs[0].id);

    const toggleFaq = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_1.4fr] gap-10">
                {/* Left column */}
                <Reveal animation="slide-left" delay={100}>
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                            Got Questions? We've Got <span className="text-primary">Answers.</span>
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
                            Find answers to the most common questions about our programs,
                            learning experience, mentorship, certificates, and enrollment
                            process. Still need help? Our support team is always ready to
                            assist you.
                        </p>
                    </div>
                </Reveal>

                {/* Right column: accordion */}
                <div className="space-y-3.5">
                    {faqs.map((faq, idx) => {
                        const isOpen = openId === faq.id;

                        return (
                            <Reveal
                                key={faq.id}
                                animation="slide-right"
                                delay={idx * 70}
                            >
                                <div
                                    className={`rounded-2xl transition-all duration-300 ${
                                        isOpen
                                            ? 'border-2 border-primary bg-white shadow-md'
                                            : 'border border-gray-100 bg-gray-50/80 hover:bg-gray-50'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(faq.id)}
                                        aria-expanded={isOpen}
                                        className="w-full flex items-start justify-between gap-4 text-left px-6 py-4.5 cursor-pointer"
                                    >
                                        <span
                                            className={`text-sm sm:text-base font-bold transition-colors ${
                                                isOpen ? 'text-primary' : 'text-gray-900'
                                            }`}
                                        >
                                            {faq.question}
                                        </span>

                                        <span
                                            className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center mt-0.5 transition-transform duration-200 ${
                                                isOpen
                                                    ? 'border-primary bg-primary text-white rotate-180'
                                                    : 'border-gray-300 text-gray-500'
                                            }`}
                                        >
                                            {isOpen ? (
                                                <Minus color='white' size={14} variant="Linear" />
                                            ) : (
                                                <Add color='black' size={14} variant="Linear" />
                                            )}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="px-6 pb-5 pt-1 animate-fade-in">
                                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed border-t border-neutral-100 pt-3">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;