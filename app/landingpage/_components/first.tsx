import Image from 'next/image';
import Link from 'next/link';

const First = () => {
    return (
        <section className="pt-32 pb-20 bg-[var(--background)]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6">
                            Transform Your Ideas Into
                            <span className="text-[var(--foreground)]"> Reality</span>
                        </h1>
                        <p className="text-xl text-[var(--foreground)] mb-8 max-w-2xl">
                            Create stunning websites and applications with our powerful platform. 
                            No coding required - just drag, drop, and launch.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link 
                                href="/signup" 
                                className="bg-[var(--foreground)] text-[var(--text-foreground)] px-8 py-3 rounded-full hover:bg-[#e0e0e0] transition-colors text-lg font-semibold"
                            >
                                Get Started Free
                            </Link>
                           {/*  <Link 
                                href="#demo" 
                                className="border border-[var(--foreground)] text-[var(--foreground)] px-8 py-3 rounded-full hover:bg-[var(--background-dark)] transition-colors text-lg font-semibold"
                            >
                                Watch Demo
                            </Link> */}
                        </div>
                        {/* <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--background)] bg-[var(--background-dark)]" />
                                ))}
                            </div>
                            <p className="text-[var(--foreground)]">
                                <span className="font-semibold">10,000+</span> users trust us
                            </p>
                        </div> */}
                    </div>
                    <div className="flex-1">
                        <div className="relative w-full aspect-square max-w-2xl mx-auto">
                            <Image
                                src="/hero-image.png"
                                alt="Platform Preview"
                                fill
                                className="object-cover rounded-2xl shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default First;