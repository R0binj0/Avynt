import Image from 'next/image';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'CEO at TechStart',
        image: '/testimonials/sarah.jpg',
        content: 'This platform has transformed how we build our digital presence. The intuitive interface and powerful features have saved us countless hours of development time.',
        rating: 5
    },
    {
        name: 'Michael Chen',
        role: 'Founder of DesignHub',
        image: '/testimonials/michael.jpg',
        content: "The best website builder I've ever used. The templates are modern, and the customization options are endless. Highly recommended!",	
        rating: 5
    },
    {
        name: 'Emily Rodriguez',
        role: 'Marketing Director',
        image: '/testimonials/emily.jpg',
        content: "We've seen a 40% increase in conversion rates since switching to this platform. The analytics and optimization tools are game-changers.",
        rating: 5
    }
];

const Feedback = () => {
    return (
        <section id="testimonials" className="py-20 bg-[var(--background)]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
                        Loved by businesses worldwide
                    </h2>
                    <p className="text-xl text-[var(--foreground)] max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. Here&apos;s what our customers have to say about their experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index}
                            className=" border border-[var(--background-dark)] bg-[var(--background)] rounded-2xl p-8 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center mb-6">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--foreground)]">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-[var(--foreground)] text-sm">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-[var(--foreground)]"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-[var(--foreground)]">
                                &quot;{testimonial.content}&quot;
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center justify-center space-x-2 bg-[var(--background)] rounded-full px-6 py-2">
                        <span className="text-[var(--foreground)] font-semibold">4.9/5</span>
                        <span className="text-[var(--foreground)]">average rating</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;