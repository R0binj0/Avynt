import Link from 'next/link';

const Header = () => {
    return (
        <header className="fixed w-full bg-[var(--background-dark)] backdrop-blur-md z-50 border-b border-[var(--background-dark)]">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-[var(--foreground)]">
                        Avynt
                    </Link>
                    
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                            Features
                        </Link>
                        <Link href="#pricing" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                            Pricing
                        </Link>
                        <Link href="#testimonials" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                            Testimonials
                        </Link>
                        <Link href="#contact" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link 
                            href="/login" 
                            className="hidden md:block text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors"
                        >
                            Login
                        </Link>
                        <Link 
                            href="/signup" 
                            className="bg-[var(--foreground)] text-[var(--text-foreground)] px-6 py-2 rounded-full hover:bg-[#e0e0e0] transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;