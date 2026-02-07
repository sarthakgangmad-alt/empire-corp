import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        rating: "5.0",
        title: "Absolutely Exceptional!",
        text: "I’m beyond impressed with the level of professionalism and results delivered. Empire Corp’s team truly understands what clients need and goes the extra mile at every step. The entire experience was seamless and impactful — highly recommended!",
        name: "Richard H.",
        role: "Senior Partner, Horizon Group"
    },
    {
        rating: "4.9",
        title: "Transformed Our Expectations!",
        text: "Working with Empire Corp exceeded all our expectations. Their insight, strategic execution, and unwavering support made the project run smoothly and efficiently. If you want quality, vision, and reliability — this is where you get it.",
        name: "Amanda L.",
        role: "Director of Operations"
    },
    {
        rating: "5.0",
        title: "Unmatched Quality & Customer Focus",
        text: "Empire Corp’s commitment to excellence is obvious from day one. Their attention to detail, clear communication, and proactive problem-solving truly set them apart. We saw real value and measurable impact.",
        name: "Marcus T.",
        role: "Property Developer"
    },
    {
        rating: "4.8",
        title: "Highly Professional & Results-Driven",
        text: "From concept to completion, Empire Corp delivered on every promise. The team is proactive, knowledgeable, and always available to guide us. We’re extremely satisfied with the outcome.",
        name: "Jennifer W.",
        role: "Project Lead"
    },
    {
        rating: "4.9",
        title: "Elevated Our Business Growth!",
        text: "The expertise and support we received were outstanding. Empire Corp helped us refine our strategy, optimize execution, and scale faster than expected. One of the best decisions we’ve made.",
        name: "Robert C.",
        role: "CEO, C-Corp"
    }
];

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const timeoutRef = useRef(null);

    const slideDuration = 4000; // 4 seconds

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            paginate(1);
        }, slideDuration);

        return () => resetTimeout();
    }, [currentIndex]);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = testimonials.length - 1;
            if (nextIndex >= testimonials.length) nextIndex = 0;
            return nextIndex;
        });
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-between z-20 pointer-events-none">
                {/* Navigation Arrows */}
                <button
                    className="pointer-events-auto p-3 rounded-full bg-stone-800/50 text-stone-200 hover:bg-orange-500 hover:text-white transition-all backdrop-blur-sm -ml-4 md:-ml-12"
                    onClick={() => paginate(-1)}
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    className="pointer-events-auto p-3 rounded-full bg-stone-800/50 text-stone-200 hover:bg-orange-500 hover:text-white transition-all backdrop-blur-sm -mr-4 md:-mr-12"
                    onClick={() => paginate(1)}
                    aria-label="Next testimonial"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full px-4 md:px-12 cursor-grab active:cursor-grabbing"
                    >
                        <div className="bg-stone-900/80 backdrop-blur-md border border-stone-800 p-8 md:p-12 rounded-2xl relative shadow-2xl flex flex-col items-center text-center">

                            {/* Quote Icon */}
                            <div className="mb-6 text-orange-500 opacity-20">
                                <Quote size={64} />
                            </div>

                            {/* Stars */}
                            <div className="flex items-center space-x-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} fill="#f97316" className="text-orange-500 w-5 h-5" />
                                ))}
                                <span className="ml-3 text-stone-400 font-bold">{testimonials[currentIndex].rating}</span>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                "{testimonials[currentIndex].title}"
                            </h3>
                            <p className="text-stone-300 text-lg leading-relaxed mb-8 max-w-2xl">
                                {testimonials[currentIndex].text}
                            </p>

                            {/* Author */}
                            <div className="border-t border-stone-800 pt-6 w-full max-w-xs mx-auto">
                                <h4 className="text-white font-bold text-xl">{testimonials[currentIndex].name}</h4>
                                <p className="text-stone-500 text-sm">{testimonials[currentIndex].role}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 flex space-x-3 z-20">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-orange-500 w-8'
                                : 'bg-stone-600 hover:bg-stone-400'
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
