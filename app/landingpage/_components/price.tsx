import Link from 'next/link';

const plans = [
    {
        name: 'Starter',
        price: 'Free',
        description: 'Perfect for trying out our platform',
        features: [
            'Up to 3 projects',
            'Basic templates',
            'Community support',
            '1GB storage',
            'Basic analytics'
        ],
        cta: 'Get Started',
        popular: false
    },
    {
        name: 'Pro',
        price: '$29',
        period: '/month',
        description: 'Best for professionals and growing businesses',
        features: [
            'Unlimited projects',
            'Premium templates',
            'Priority support',
            '10GB storage',
            'Advanced analytics',
            'Custom domain',
            'Team collaboration'
        ],
        cta: 'Start Free Trial',
        popular: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For large organizations with specific needs',
        features: [
            'Everything in Pro',
            'Unlimited storage',
            'Dedicated support',
            'Custom integrations',
            'SLA guarantee',
            'Advanced security',
            'Custom branding'
        ],
        cta: 'Contact Sales',
        popular: false
    }
];

const Price = () => {
    return (
        <section id="pricing" className="py-20 bg-[var(--background-dark)]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-xl text-[var(--foreground)] max-w-2xl mx-auto">
                        Choose the perfect plan for your needs. All plans include a 14-day free trial.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <div 
                            key={index}
                            className={`rounded-2xl p-8 border border-[var(--foreground)] ${
                                plan.popular 
                                    ? 'bg-[var(--foreground)] text-[var(--text-foreground)] shadow-xl scale-105' 
                                    : 'bg-[var(--background-dark)] text-[var(--foreground)]'
                            }`}
                        >
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <div className="mb-4">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                {plan.period && (
                                    <span className={`text-lg ${plan.popular ? 'text-[var(--text-foreground)]' : 'text-[var(--foreground)]'}`}>
                                        {plan.period}
                                    </span>
                                )}
                            </div>
                            <p className={`mb-6 ${plan.popular ? 'text-[var(--text-foreground)]' : 'text-[var(--foreground)]'}`}>
                                {plan.description}
                            </p>
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <svg 
                                            className={`w-5 h-5 mr-2 ${plan.popular ? 'text-[var(--text-foreground)]' : 'text-[var(--foreground)]'}`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M5 13l4 4L19 7" 
                                            />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                                className={`block w-full py-3 px-6 rounded-full text-center font-semibold transition-colors ${
                                    plan.popular
                                        ? 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--background-dark)]'
                                        : 'bg-[var(--foreground)] text-[var(--text-foreground)] hover:bg-[#e0e0e0]'
                                }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Price;