"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
    {
        id: "01",
        title: "Tap, Swipe, Dream",
        image: "/images/hero4.png",
        description:
            "It begins with digital invitations sent to your event guests or team members. Each recipient engages with our AI through natural conversation—sharing their unique perspective or meaningful connection.",
        extra:
            "Our technology transforms these insights into personalized fragrance profiles, which master perfumers bring to life using premium ingredients. The finished scents arrive in elegant packaging customisable for your event or brand—creating a sophisticated keepsake that's genuinely personal",
    },
    {
        id: "02",
        title: "Five-Minute AI Creation",
        image: "/images/hero3.png",
        description:
            "Our AI transforms insights into personalized fragrance profiles crafted with elegance.",
        extra:
            "Each profile captures the essence of the individual—turning a five-minute conversation into a bespoke scent that resonates on a deeply personal level.",
    },
    {
        id: "03",
        title: "Bottles Await On The Big Day",
        image: "/images/work1.png",
        description:
            "Finished scents arrive beautifully packaged creating unforgettable keepsakes.",
        extra:
            "Premium bottles, custom labels, and refined packaging ensure every recipient receives something truly extraordinary—a lasting memory of the occasion.",
    },
];

export default function HowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null);
    // ref for the grey track line element so we can measure its top/height
    const trackRef = useRef<HTMLDivElement>(null);
    // one ref per card row — we measure their vertical center on the pipe
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [progress, setProgress] = useState(0);
    // "active" = line has already crossed this dot (solid black)
    const [activeNodes, setActiveNodes] = useState<boolean[]>(steps.map(() => false));
    // ripple key incremented each time the dot is newly crossed (triggers re-mount of ring spans)
    const [rippleKeys, setRippleKeys] = useState<number[]>(steps.map(() => 0));
    const [isRippling, setIsRippling] = useState<boolean[]>(steps.map(() => false));

    // Store previous active state in a ref to detect transitions
    const prevActiveRef = useRef<boolean[]>(steps.map(() => false));

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !trackRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const scrollableHeight = rect.height - window.innerHeight;
            const raw = (-rect.top / scrollableHeight) * 100;
            const clamped = Math.min(Math.max(raw, 0), 100);
            setProgress(clamped);

            // The tip of the growing line in viewport-Y pixels
            const trackRect = trackRef.current.getBoundingClientRect();
            const lineTipY = trackRect.top + (clamped / 100) * trackRect.height;

            const newActive: boolean[] = [];

            rowRefs.current.forEach((rowEl, i) => {
                if (!rowEl) { newActive.push(false); return; }
                const rowRect = rowEl.getBoundingClientRect();
                // Dot sits at the vertical center of the row card
                const dotCenterY = rowRect.top + rowRect.height / 2;
                newActive.push(lineTipY >= dotCenterY);
            });

            // Detect newly activated nodes → fire ripple
            newActive.forEach((isNowActive, i) => {
                const wasActive = prevActiveRef.current[i];
                if (isNowActive && !wasActive) {
                    // Crossed downward → ripple ON
                    setRippleKeys((prev) => {
                        const next = [...prev];
                        next[i] = prev[i] + 1;
                        return next;
                    });
                    setIsRippling((prev) => {
                        const next = [...prev];
                        next[i] = true;
                        return next;
                    });
                    setTimeout(() => {
                        setIsRippling((prev) => {
                            const next = [...prev];
                            next[i] = false;
                            return next;
                        });
                    }, 1000);
                } else if (!isNowActive && wasActive) {
                    // Scrolled back up → deactivate silently
                    setIsRippling((prev) => {
                        const next = [...prev];
                        next[i] = false;
                        return next;
                    });
                }
            });

            prevActiveRef.current = newActive;
            setActiveNodes(newActive);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#efefef] px-6 py-24 md:px-12 lg:px-20"
        >
            <style>{`
                @keyframes howItWorksRipple {
                    0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.65; }
                    100% { transform: translate(-50%, -50%) scale(3.2); opacity: 0;    }
                }
                .hiw-ripple {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    border-radius: 9999px;
                    border: 1.5px solid black;
                    pointer-events: none;
                    animation: howItWorksRipple 0.9s ease-out forwards;
                }
                .hiw-ripple-2 {
                    animation-delay: 0.18s;
                }
            `}</style>

            {/* Heading */}
            <div className="mb-24 text-center">
                <h2 className="text-[2rem] uppercase tracking-[-0.05em] text-black sm:text-[2.5rem]">
                    How It Works
                </h2>
            </div>

            {/* Timeline wrapper — position:relative so the pipe is the coordinate parent */}
            <div className="relative mx-auto max-w-[1400px]">

                {/* Grey ghost track — full height */}
                <div
                    ref={trackRef}
                    className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-black/15 lg:block"
                    style={{ zIndex: 0 }}
                />

                {/* Black progress fill */}
                <div
                    className="absolute left-1/2 top-0 hidden w-[2px] -translate-x-1/2 bg-black lg:block"
                    style={{
                        height: `${progress}%`,
                        transition: "height 0.04s linear",
                        zIndex: 1,
                    }}
                />

                {/* Cards */}
                <div className="space-y-32 lg:space-y-40">
                    {steps.map((step, index) => {
                        const isLeft = index % 2 === 0;
                        const active = activeNodes[index];
                        const rippling = isRippling[index];

                        return (
                            <div
                                key={step.id}
                                ref={(el) => { rowRefs.current[index] = el; }}
                                className={`relative grid items-center gap-16 lg:grid-cols-2 ${isLeft ? "" : "lg:[&>*:first-child]:order-2"
                                    }`}
                            >
                                {/* ── Dot node — centered on the pipe ── */}
                                {/* Positioned absolute relative to the timeline wrapper via left-1/2 */}
                                <div
                                    className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                                    style={{ zIndex: 10 }}
                                >
                                    {/* Ripple rings — re-mount via key to re-trigger animation */}
                                    {rippling && (
                                        <>
                                            <span
                                                key={`r1-${rippleKeys[index]}`}
                                                className="hiw-ripple"
                                                style={{ width: "24px", height: "24px" }}
                                            />
                                            <span
                                                key={`r2-${rippleKeys[index]}`}
                                                className="hiw-ripple hiw-ripple-2"
                                                style={{ width: "24px", height: "24px" }}
                                            />
                                        </>
                                    )}

                                    {/* The dot itself */}
                                    <div
                                        className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-500"
                                        style={{
                                            borderColor: active ? "#000" : "rgba(0,0,0,0.25)",
                                            backgroundColor: active ? "#000" : "#efefef",
                                        }}
                                    >
                                        <div
                                            className="h-2.5 w-2.5 rounded-full transition-all duration-500"
                                            style={{
                                                backgroundColor: active
                                                    ? "#efefef"
                                                    : "rgba(0,0,0,0.25)",
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="relative">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="h-[24rem] w-full rounded-[0.8rem] object-cover sm:h-[32rem]"
                                    />
                                </div>

                                {/* Content */}
                                <div className="relative">
                                    <p className="text-[1rem] text-black/80">{step.id}</p>

                                    <h3 className="mt-4 max-w-md text-[2rem] uppercase leading-[130%] tracking-[-0.05em] text-black">
                                        {step.title}
                                    </h3>

                                    <p className="mt-8 max-w-lg text-[0.95rem] leading-[180%] text-black/70">
                                        {step.description}
                                    </p>

                                    <p className="mt-8 max-w-lg text-[0.8rem] leading-[180%] text-black/50">
                                        {step.extra}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}