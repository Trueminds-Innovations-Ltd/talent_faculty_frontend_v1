import { TickCircle, ArrowRight2 } from 'iconsax-react';
import Reveal from './common/Reveal';

interface PricingPlan {
    id: string;
    name: string;
    tagline: string;
    price: string;
    priceLabel: string;
    originalPrice?: string;
    features: string[];
    cta: string;
    highlighted?: boolean;
    badge?: string;
    animation: 'slide-right' | 'zoom-in' | 'slide-left';
}

const plans: PricingPlan[] = [
    {
        id: 'starter',
        name: 'Starter',
        tagline: 'Perfect for Beginners',
        price: '₦0',
        priceLabel: 'Free',
        originalPrice: undefined,
        features: [
            'Access to beginner courses',
            'Weekly assignments',
            'Progress tracking',
            'Community access',
            'Completion certificate',
        ],
        cta: 'Get Started',
        animation: 'slide-right',
    },
    {
        id: 'professional',
        name: 'Professional',
        tagline: 'Best for career growth',
        price: '₦60,000',
        priceLabel: 'Per Program',
        features: [
            'Everything in Starter',
            'Live mentor sessions',
            'Real-world projects',
            'Portfolio development',
            'Career guidance',
        ],
        cta: 'Enroll Now',
        highlighted: true,
        badge: 'Popular',
        animation: 'zoom-in',
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        tagline: 'For Teams and Organizations',
        price: 'Custom',
        priceLabel: 'Pricing',
        features: [
            'Team onboarding',
            'Dedicated program manager',
            'Admin dashboard',
            'Progress analytics',
            'Custom learning paths',
        ],
        cta: 'Contact Sales',
        animation: 'slide-left',
    },
];

const PricingSection = () => {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16 overflow-hidden">
            {/* Header */}
            <Reveal animation="slide-down" delay={100}>
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Find the Program That's <span className="text-primary">Right for You</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 mt-3 leading-relaxed">
                        Whether you're just starting your career or looking to upskill, Talent
                        Faculty offers structured, mentor-led programs designed to help you
                        gain practical experience and grow with confidence.
                    </p>
                </div>
            </Reveal>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {plans.map((plan, idx) => {
                    const isHighlighted = plan.highlighted;

                    return (
                        <Reveal
                            key={plan.id}
                            animation={plan.animation}
                            delay={idx * 150}
                            className="h-full"
                        >
                            <div
                                className={`relative rounded-3xl p-8 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                                    isHighlighted
                                        ? 'bg-primary text-white shadow-xl ring-2 ring-primary-dark/20'
                                        : 'bg-white text-gray-900 border border-gray-100 shadow-sm'
                                }`}
                            >
                                {plan.badge && (
                                    <span className="absolute top-6 right-6 bg-white text-primary text-xs font-bold px-3.5 py-1 rounded-full shadow-sm animate-pulse-subtle">
                                        {plan.badge}
                                    </span>
                                )}

                                <div>
                                    {/* Name & tagline */}
                                    <h3 className="font-bold text-xl">{plan.name}</h3>
                                    <p
                                        className={`text-sm mt-1 ${
                                            isHighlighted ? 'text-white/80' : 'text-gray-500'
                                        }`}
                                    >
                                        {plan.tagline}
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-2 mt-6 mb-6">
                                        <span className="text-3xl font-extrabold">{plan.price}</span>
                                        <span
                                            className={`text-sm font-medium ${
                                                isHighlighted ? 'text-white/80' : 'text-gray-400'
                                            }`}
                                        >
                                            {plan.priceLabel}
                                        </span>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3.5 mb-8">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2.5 text-sm">
                                                <TickCircle
                                                    size={18}
                                                    variant="Bold"
                                                    className={
                                                        isHighlighted ? 'text-white' : 'text-primary'
                                                    }
                                                />
                                                <span
                                                    className={
                                                        isHighlighted ? 'text-white/95' : 'text-gray-700'
                                                    }
                                                >
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA */}
                                <button
                                    type="button"
                                    className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer ${
                                        isHighlighted
                                            ? 'bg-neutral-900 hover:bg-black text-white shadow-lg'
                                            : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                                    }`}
                                >
                                    <span>{plan.cta}</span>
                                    <ArrowRight2 size={16} variant="Linear" />
                                </button>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
};

export default PricingSection;