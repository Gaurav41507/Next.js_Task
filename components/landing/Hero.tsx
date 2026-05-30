"use client";

import { useState } from "react";

const heroImages = [
    "/images/hero1.png",
    "/images/hero2.png",
    "/images/hero3.png",
    "/images/hero4.png",
];
export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [prevSlideIndex, setPrevSlideIndex] = useState(0);

    const changeSlide = (newIndex: number) => {
        setPrevSlideIndex(currentSlide);
        setCurrentSlide(newIndex);
    };

    const nextSlide = () => {
        changeSlide(currentSlide === heroImages.length - 1 ? 0 : currentSlide + 1);
    };
    const prevSlide = () => {
        changeSlide(currentSlide === 0 ? heroImages.length - 1 : currentSlide - 1);
    };

    const isForward = (() => {
        if (currentSlide === prevSlideIndex) return true;
        if (currentSlide === 0 && prevSlideIndex === heroImages.length - 1) return true;
        if (currentSlide === heroImages.length - 1 && prevSlideIndex === 0) return false;
        return currentSlide > prevSlideIndex;
    })();

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {heroImages.map((src, index) => {
                const isActive = index === currentSlide;
                const isPrev = index === prevSlideIndex;
                const isIdle = !isActive && !isPrev;

                let transform = "translateX(0)";
                if (isActive) {
                    transform = "translateX(0)";
                } else if (isPrev) {
                    transform = isForward ? "translateX(-100%)" : "translateX(100%)";
                } else {
                    transform = isForward ? "translateX(100%)" : "translateX(-100%)";
                }

                return (
                    <div
                        key={index}
                        className="absolute inset-0 overflow-hidden"
                        style={{
                            transform,
                            opacity: isActive ? 1 : 0,
                            zIndex: isActive ? 1 : 0,
                            transition: isIdle
                                ? "none"
                                : "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-in-out",
                        }}
                    >
                        <img
                            src={src}
                            alt={`Hero Background ${index + 1}`}
                            className={`h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${
                                isActive ? "scale-105" : "scale-100"
                            }`}
                        />
                    </div>
                );
            })}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background:
                        "linear-gradient(13.45deg, rgba(5,5,5,0.65) 18%, rgba(5,5,5,0) 72%)",
                }}
            />
            <div className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-[0.4rem] md:flex lg:left-7">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => changeSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-[0.42rem] w-[0.42rem] rounded-full transition-all duration-500 ${currentSlide === index
                            ? "bg-white scale-110"
                            : "bg-white/40 hover:bg-white/70"
                            }`}
                    />
                ))}
            </div>

            <div className="absolute right-5 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3 md:right-7 lg:right-9">
                <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="flex h-[2.9rem] w-[2.9rem] items-center justify-center rounded-full border border-white/55 bg-transparent text-white text-[1rem] transition-all duration-300 hover:bg-white hover:text-black"
                >
                    ←
                </button>
                <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="flex h-[2.9rem] w-[2.9rem] items-center justify-center rounded-full border border-white/55 bg-transparent text-white text-[1rem] transition-all duration-300 hover:bg-white hover:text-black"
                >
                    →
                </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10" style={{ padding: "0 3.5rem 3.5rem" }}>


                <h2 className="text-[1.75rem] uppercase leading-[1.2] tracking-[0.04em] text-white sm:text-[2.2rem] md:text-[2.7rem] lg:text-[3rem] xl:text-[3.2rem]">
                    Bottle The Moment
                </h2>


                <p className="mt-2 text-[1.2rem] uppercase leading-[1.3] tracking-[0.04em] text-white/90 sm:text-[1.6rem] md:text-[2rem] lg:text-[2.3rem] xl:text-[2.5rem]">
                    Bespoke Scents For Unforgettable Memories
                </p>


                <div
                    style={{
                        marginTop: "1.5rem",
                        width: "100%",
                        height: "1px",
                        background:
                            "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.55) 5%, rgba(255,255,255,0.55) 95%, transparent 100%)",
                    }}
                />
                <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

                    <p className="max-w-[17rem] text-[0.7rem] leading-[1.75] tracking-[0.02em] text-white/80 sm:text-[0.75rem]">
                        Expertly crafted fragrances that bring your stories to life,
                        from personal celebrations to corporate gifts
                    </p>

                    <button className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22rem] text-white transition-opacity duration-300 hover:opacity-70 md:mb-0.5">
                        Begin The Journey
                        <span className="twinkle-dot h-[0.32rem] w-[0.32rem] rounded-full bg-white" />
                    </button>

                </div>

            </div>

        </section>
    );
}