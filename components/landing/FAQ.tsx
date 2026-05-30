"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
    {
        question:
            "LOREM IPSUM DOLOR SIT AMET CONSECTETUR VITAE VITAE AUGUE LOBORTIS DICTUM?",
        answer:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
    },
    {
        question:
            "NEMO ENIM IPSAM VOLUPTATEM QUIA VOLUPTAS SIT ASPERNATUR AUT ODIT AUT FUGIT?",
        answer: "This is the second FAQ answer.",
    },
    {
        question: "NEQUE PORRO QUISQUAM EST, QUI DOLOREM IPSUM?",
        answer: "This is the third FAQ answer.",
    },
    {
        question:
            "UT ENIM AD MINIMA VENIAM, QUIS NOSTRUM EXERCITATIONEM ULLAM CORPORIS?",
        answer: "This is the fourth FAQ answer.",
    },
    {
        question:
            "QUIS AUTEM VEL EUM IURE REPREHENDERIT QUI IN EA VOLUPTATE VELIT ESSE?",
        answer: "This is the fifth FAQ answer.",
    },
];

export default function FAQSection() {
    // initially all closed
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-black min-h-screen flex items-center justify-center px-3 md:px-6">

            {/* MAIN WHITE BOX */}
            <div
                className="
          bg-[#efefef]
          rounded-[20px]
          w-full
          max-w-7xl
          min-h-[600px]
          px-2
          md:px-20
          py-12
          grid
          md:grid-cols-[180px_1fr]
          gap-8
        "
            >

                {/* LEFT SIDE */}
                <div>
                    <h2 className="text-[42px] font-light tracking-wide text-black">
                        FAQS
                    </h2>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col">
                    {faqData.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="border-t border-gray-400 py-5"
                            >

                                {/* QUESTION */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-start justify-between gap-4 text-left"
                                >
                                    <h3
                                        className="
                      text-[13px]
                      uppercase
                      tracking-[2px]
                      leading-[20px]
                      text-black
                      max-w-[88%]
                    "
                                    >
                                        {item.question}
                                    </h3>

                                    {/* ICON */}
                                    <div
                                        className="
                      w-[38px]
                      h-[38px]
                      rounded-full
                      border
                      border-gray-500
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                    "
                                    >
                                        {isOpen ? (
                                            <Minus size={16} strokeWidth={1.5} />
                                        ) : (
                                            <Plus size={16} strokeWidth={1.5} />
                                        )}
                                    </div>
                                </button>

                                {/* ANSWER */}
                                <div
                                    className={`
                    grid
                    transition-all
                    duration-300
                    ease-in-out
                    ${isOpen
                                            ? "grid-rows-[1fr] opacity-100 mt-4"
                                            : "grid-rows-[0fr] opacity-0"
                                        }
                  `}
                                >
                                    <div className="overflow-hidden">
                                        <p
                                            className="
                        text-[14px]
                        leading-7
                        text-gray-700
                        max-w-[620px]
                      "
                                        >
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* BOTTOM BORDER */}
                    <div className="border-t border-gray-400"></div>
                </div>
            </div>
        </section>
    );
}