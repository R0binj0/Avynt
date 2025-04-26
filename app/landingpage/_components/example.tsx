import { 
    RocketLaunchIcon, 
    PaintBrushIcon, 
    DevicePhoneMobileIcon, 
    ChartBarIcon 
} from '@heroicons/react/24/outline';

const features = [
    {
        title: 'Lightning Fast',
        description: 'Build and deploy your projects in minutes, not days. Our platform is optimized for speed and performance.',
        icon: RocketLaunchIcon,
    },
    {
        title: 'Beautiful Designs',
        description: 'Choose from hundreds of professionally designed templates and customize them to match your brand.',
        icon: PaintBrushIcon,
    },
    {
        title: 'Responsive Ready',
        description: 'Your website will look perfect on all devices, from mobile phones to large desktop screens.',
        icon: DevicePhoneMobileIcon,
    },
    {
        title: 'Analytics & Insights',
        description: 'Track your performance with built-in analytics and make data-driven decisions.',
        icon: ChartBarIcon,
    },
];

const Example = () => {
    return (
        <section id="features" className="py-20 bg-[var(--background)]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
                        Everything you need to succeed
                    </h2>
                    <p className="text-xl text-[var(--foreground)] max-w-2xl mx-auto">
                        Our platform provides all the tools and features you need to create 
                        stunning websites and grow your online presence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="p-6 rounded-2xl bg-[var(--background)] hover:bg-[#303030] transition-colors border border-[var(--background-dark)]"
                        >
                            <feature.icon className="w-12 h-12 text-[var(--foreground)] mb-4" />
                            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-[var(--foreground)]">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Example;