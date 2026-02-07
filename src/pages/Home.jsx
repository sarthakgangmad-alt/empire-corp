import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Ruler, Clock, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageSequencePlayer from '../components/ImageSequencePlayer';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { LiquidMetalButton } from '../components/ui/LiquidMetal';

export default function Home() {
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center bg-stone-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ImageSequencePlayer
                        sequencePath="/sequence"
                        frameCount={26}
                        fps={12}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-900/80 to-transparent z-10" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center space-x-2 text-orange-500 font-bold uppercase tracking-widest mb-6">
                            <span className="w-12 h-0.5 bg-orange-500"></span>
                            <span>Premium Construction Services</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-none">
                            Building Quality. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                Delivering Results.
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-300 mb-10 max-w-2xl leading-relaxed font-light">
                            Empire Construction Corp provides residential and commercial construction services with a focus on structural integrity, timeline adherence, and transparent project management.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link to="/contact">
                                <LiquidMetalButton
                                    size="lg"
                                    icon={<ArrowRight className="w-5 h-5" />}
                                    metalConfig={{ colorBack: '#ea580c', colorTint: '#fb923c' }}
                                    className="font-bold uppercase tracking-wider"
                                >
                                    Request Consultation
                                </LiquidMetalButton>
                            </Link>
                            <Link to="/services" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-stone-500 text-white font-bold uppercase tracking-wider hover:bg-white hover:text-stone-900 hover:border-white transition-all rounded-sm">
                                View Our Services
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
                >
                    <div className="w-6 h-10 border-2 border-stone-500 rounded-full flex justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Services Preview Section */}
            <section className="py-24 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 px-2">
                        <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">What We Build</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2">Our Expertise</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Residential Construction', desc: 'Custom homes built from foundation to final inspection.', icon: '01' },
                            { title: 'Commercial Renovation', desc: 'Office, retail, and industrial space optimization.', icon: '02' },
                            { title: 'Design & Engineering', desc: 'Structural planning and architectural design services.', icon: '03' }
                        ].map((service, i) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="p-10 bg-stone-50 border border-stone-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="text-6xl font-black text-stone-200 absolute top-4 right-6 opacity-50 group-hover:opacity-20 transition-opacity select-none">
                                    {service.icon}
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-stone-900 mb-4 pr-12 group-hover:text-orange-900 transition-colors">{service.title}</h3>
                                    <p className="text-stone-600 mb-8 leading-relaxed">{service.desc}</p>
                                    <Link to="/services" className="text-stone-900 font-bold text-sm uppercase tracking-wider flex items-center group-hover:text-orange-600 transition-colors">
                                        Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-orange-600 group-hover:w-full transition-all duration-500" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link to="/services" className="inline-flex items-center text-stone-900 font-bold hover:text-orange-600 uppercase tracking-wide group">
                            Explore All Services <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Empire (Differentiation) */}
            <section className="py-24 bg-stone-950 text-white relative overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-900 transform skew-x-12 translate-x-32" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Our Approach</span>
                            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-8">Why Choose Empire?</h2>
                            <p className="text-stone-400 text-lg mb-10 leading-relaxed">
                                We don't just build structures; we build trust. Our process is designed to eliminate the common headaches of construction through transparency, compliance, and rigorous quality control.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: 'Licensed & Insured', desc: 'Full liability coverage and worker compensation.', icon: ShieldCheck },
                                    { title: 'Code Compliance', desc: 'Adherence to all local building codes and rigorous inspections.', icon: Ruler },
                                    { title: 'Project Transparency', desc: 'Detailed timelines and regular progress updates.', icon: Clock },
                                    { title: 'Experienced Team', desc: 'Certified tradespeople with specialized expertise.', icon: Users }
                                ].map((item, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        key={item.title}
                                        className="flex items-start"
                                    >
                                        <div className="bg-stone-800 p-3 rounded-lg mr-5 text-orange-500">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                                            <p className="text-stone-400 text-sm">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="relative h-[600px] hidden lg:block">
                            {/* Image Grid Effect */}
                            <div className="absolute top-10 right-10 w-4/5 h-4/5 border-2 border-orange-600/30 rounded-3xl" />
                            <img
                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2548&auto=format&fit=crop"
                                alt="Construction Site"
                                className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl filter brightness-75 hover:brightness-100 transition-all duration-700"
                            />
                            <div className="absolute bottom-10 left-[-40px] bg-white text-stone-900 p-8 rounded-lg shadow-xl max-w-xs">
                                <p className="font-bold text-4xl text-orange-600 mb-2">15+</p>
                                <p className="text-sm font-bold uppercase tracking-wider">Years of Excellence in Construction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Completions Preview */}
            <section className="py-24 bg-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Portfolio</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-6">Recent Completions</h2>
                        <div className="w-24 h-1 bg-stone-300 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: 'Lakeside Modern', type: 'Residential Build', loc: 'Toronto', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop' },
                            { name: 'Urban Office', type: 'Commercial Renovation', loc: 'Mississauga', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop' },
                            { name: 'Heritage Restore', type: 'Restoration', loc: 'Oakville', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop' }
                        ].map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative h-96 cursor-pointer overflow-hidden rounded-lg shadow-lg"
                            >
                                <img src={project.img} alt={project.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/20 transition-colors" />
                                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-stone-950/90 to-transparent pt-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-orange-400 font-bold text-xs uppercase tracking-wider mb-2">{project.type}</p>
                                    <h3 className="text-white text-2xl font-bold mb-1">{project.name}</h3>
                                    <p className="text-stone-300 text-sm flex items-center">
                                        <MapPin size={14} className="mr-1" /> {project.loc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/portfolio" className="inline-block px-8 py-3 border-2 border-stone-900 text-stone-900 font-bold uppercase tracking-wider hover:bg-stone-900 hover:text-white transition-all rounded-sm">
                            View Full Portfolio
                        </Link>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="order-2 lg:order-1">
                            <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">How We Work</span>
                            <h2 className="text-4xl font-bold text-stone-900 mt-2 mb-10">The Empire Process</h2>

                            <div className="relative border-l-2 border-stone-200 ml-4 space-y-12">
                                {[
                                    { step: '01', title: 'Consultation & Scope', desc: 'We discuss your vision, assess the site, and provide a preliminary feasibility review.' },
                                    { step: '02', title: 'Design & Planning', desc: 'Architectural blueprints, engineering approvals, and permit acquisition.' },
                                    { step: '03', title: 'Construction Execution', desc: 'Managed on-site operations with regular quality control checkpoints.' },
                                    { step: '04', title: 'Handover & Warranty', desc: 'Final walkthrough, code compliance verification, and project closeout.' }
                                ].map((stage, i) => (
                                    <div key={stage.step} className="relative pl-12">
                                        <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-orange-500" />
                                        <h3 className="text-xl font-bold text-stone-900 mb-2 flex items-center">
                                            <span className="text-stone-300 mr-4 font-mono text-sm">{stage.step}</span>
                                            {stage.title}
                                        </h3>
                                        <p className="text-stone-600 leading-relaxed">{stage.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="order-1 lg:order-2 bg-stone-50 p-8 rounded-3xl border border-stone-100 flex items-center justify-center relative overflow-hidden cursor-none"
                        >
                            {/* Reveal Image Follower */}
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: hoverPos.x - 128, // Center the 256px circle
                                        y: hoverPos.y - 128
                                    }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                                    className="absolute top-0 left-0 w-64 h-64 rounded-full overflow-hidden border-4 border-orange-500/20 shadow-2xl z-0 pointer-events-none"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2670&auto=format&fit=crop"
                                        alt="Precision Blueprint Detail"
                                        className="w-full h-full object-cover scale-150"
                                    />
                                </motion.div>
                            )}

                            <div className="text-center relative z-10">
                                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Ruler size={48} className="text-orange-600" />
                                    </motion.div>
                                </div>
                                <h3 className="text-2xl font-bold text-stone-900 mb-4 mix-blend-darken">Precision in Every Detail</h3>
                                <p className="text-stone-500 max-w-sm mx-auto mix-blend-darken">
                                    We believe that a successful project is built on careful planning and clear communication.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-stone-950 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-orange-900/20 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Client Stories</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Trusted by Industry Leaders</h2>
                        </div>
                        {/* Optional 5-star summary */}
                        <div className="hidden md:flex flex-col items-end">
                            <div className="flex text-orange-500 mb-2">
                                <Star fill="#f97316" size={20} />
                                <Star fill="#f97316" size={20} />
                                <Star fill="#f97316" size={20} />
                                <Star fill="#f97316" size={20} />
                                <Star fill="#f97316" size={20} />
                            </div>
                            <p className="text-stone-400 font-medium">Top Rated Construction Firm</p>
                        </div>
                    </div>

                    <div className="w-full">
                        <TestimonialCarousel />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-stone-900 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.15),transparent_60%)]" />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
                    <p className="text-xl text-stone-400 mb-10">
                        Empire Construction Corp is currently accepting new inquiries. Contact us to discuss your requirements.
                    </p>
                    <div className="flex justify-center">
                        <Link to="/contact">
                            <LiquidMetalButton
                                size="lg"
                                icon={<ArrowRight className="w-5 h-5" />}
                                metalConfig={{ colorBack: '#ea580c', colorTint: '#fb923c' }} // Orange
                                className="font-bold text-lg"
                            >
                                Schedule a Consultation
                            </LiquidMetalButton>
                        </Link>
                    </div>
                    <p className="mt-6 text-sm text-stone-500 font-mono uppercase tracking-widest">
                        Response within one business day
                    </p>
                </div>
            </section>
        </div>
    );
}

// Helper component for map pin (Icon already imported)
function MapPin({ size, className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}
