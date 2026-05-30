"use client";

import { useEffect, useState } from "react";

const slides = [
    {
        title: "The Broken Gift",
        description:
            "Move beyond predictable favors and corporate gifts to something genuinely memorable. Each recipient creates a personal fragrance that captures their unique experience.",
        image: "/images/hero2.png",
    },

    {
        title: "The Fragrance Gap",
        description:
            "Fragrance is the third most-gifted product on Earth, yet events ignore it. Until now.",
        image: "/images/hero3.png",
    },

    {
        title: "The Solution",
        description:
            "Create immersive scent experiences that transform events into unforgettable emotional memories.",
        image: "/images/hero1.png",
    },
];

export default function Scroll() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById("story-scroll");

            if (!section) return;

            const rect = section.getBoundingClientRect();

            const scrollProgress =
                (-rect.top / (rect.height - window.innerHeight)) * 100;

            if (scrollProgress < 33) {
                setActiveSlide(0);
            } else if (scrollProgress < 66) {
                setActiveSlide(1);
            } else {
                setActiveSlide(2);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section
            id="story-scroll"
            className="relative h-[300vh] bg-[#efefef]"
        >

            {/* Sticky Container */}
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">

                {/* Card */}
                <div className="relative h-[88vh] w-[90%] overflow-hidden rounded-[2rem]">

                    {/* Background Image */}
                    {slides.map((slide, index) => (
                        <img
                            key={index}
                            src={slide.image}
                            alt={slide.title}
                            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${activeSlide === index
                                ? "scale-100 opacity-100"
                                : "scale-110 opacity-0"
                                }`}
                        />
                    ))}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Content */}
                    <div className="relative z-10 flex h-full items-center px-8 sm:px-12 md:px-20">

                        <div className="max-w-2xl text-white">

                            {/* Animated Content */}
                            <div
                                key={activeSlide}
                                className="animate-[fadeIn_0.8s_ease]"
                            >

                                <h2 className="text-4xl uppercase leading-[130%] tracking-[-0.05em] sm:text-5xl md:text-6xl">

                                    {slides[activeSlide].title}

                                </h2>

                                <p className="mt-8 max-w-xl text-base leading-[170%] text-white/90 sm:text-lg">

                                    {slides[activeSlide].description}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}