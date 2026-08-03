import { TickCircle, ArrowRight2 } from 'iconsax-react';

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
    },
];

const PricingSection = () => {
    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-20">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Find the Program That's Right for You
                </h2>
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                    Whether you're just starting your career or looking to upskill, Talent
                    Faculty offers structured, mentor-led programs designed to help you
                    gain practical experience and grow with confidence.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {plans.map((plan) => {
                    const isHighlighted = plan.highlighted;

                    return (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl p-6 flex flex-col h-full transition-transform duration-200 ${isHighlighted
                                ? 'bg-primary text-white shadow-xl md:-translate-y-3'
                                : 'bg-white text-gray-900 border border-gray-200'
                                }`}
                        >
                            {plan.badge && (
                                <span className="absolute top-6 right-6 bg-white text-primary text-xs font-semibold px-3 py-1 rounded-full">
                                    {plan.badge}
                                </span>
                            )}

                            {/* Name & tagline */}
                            <h3 className="font-bold text-lg">{plan.name}</h3>
                            <p
                                className={`text-sm mt-1 ${isHighlighted ? 'text-white/80' : 'text-gray-500'
                                    }`}
                            >
                                {plan.tagline}
                            </p>

                            {/* Price */}
                            <div className="flex items-baseline gap-2 mt-6 mb-6">
                                <span className="text-2xl font-bold">{plan.price}</span>
                                <span
                                    className={`text-sm ${isHighlighted ? 'text-white/70' : 'text-gray-400'
                                        }`}
                                >
                                    {plan.priceLabel}
                                </span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 flex-1">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-sm">
                                        <TickCircle
                                            size={18}
                                            variant="Bold"
                                            className={
                                                isHighlighted ? 'text-white' : 'text-primary'
                                            }
                                        />
                                        <span
                                            className={
                                                isHighlighted ? 'text-white/90' : 'text-gray-700'
                                            }
                                        >
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                type="button"
                                className={`mt-8 w-full flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors duration-200 ${isHighlighted
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                    : 'border border-gray-300 hover:border-bhgreen hover:text-bhgreen text-gray-700'
                                    }`}
                            >
                                {plan.cta}
                                <ArrowRight2 size={16} variant="Linear" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default PricingSection;