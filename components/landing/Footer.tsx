"use client";

import Image from "next/image";

import {
    FaInstagram,
    FaFacebookF,
    FaLinkedinIn,
    FaTiktok,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
    return (
        <footer className="bg-[#F7F5EF] w-full pt-12 pb-8 md:pt-[70px] md:pb-[28px]">

            <div className="max-w-[1180px] mx-auto px-6">

                {/* TOP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 lg:gap-[40px]">

                    {/* LOGO */}
                    <div className="flex justify-start">
                        <Image
                            src="/images/Footerlogo1.png"
                            alt="logo"
                            width={210}
                            height={52}
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* COLUMN 1 */}
                    <div className="flex flex-col gap-4 sm:gap-[28px]">
                        <a href="/" className="footerText">
                            HOME
                        </a>

                        <a href="/" className="footerText">
                            LEPARFUM.AI
                        </a>
                    </div>

                    {/* COLUMN 2 */}
                    <div className="flex flex-col gap-4 sm:gap-[28px]">
                        <a href="/" className="footerText">
                            WEDDINGS
                        </a>

                        <a href="/" className="footerText">
                            CORPORATE & GIFTING
                        </a>

                        <a href="/" className="footerText">
                            HOSPITALITY
                        </a>
                    </div>

                    {/* COLUMN 3 */}
                    <div className="flex flex-col gap-4 sm:gap-[28px]">

                        <a
                            href="mailto:enquiries@leparfum.ai"
                            className="footerText flex items-center gap-3"
                        >
                            <HiOutlineMail size={15} />
                            ENQUIRIES@LEPARFUM.AI
                        </a>

                        <a
                            href="mailto:media@leparfum.ai"
                            className="footerText flex items-center gap-3"
                        >
                            <HiOutlineMail size={15} />
                            MEDIA@LEPARFUM.AI
                        </a>

                        <a href="/" className="footerText">
                            PRIVACY POLICY
                        </a>

                        <a href="/" className="footerText">
                            TERMS OF SERVICE
                        </a>

                        <a href="/" className="footerText">
                            COOKIES SETTINGS
                        </a>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="mt-10 md:mt-[42px] border-t border-[#CFCBC2]"></div>

                {/* BOTTOM */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-[26px]">

                    {/* COPYRIGHT */}
                    <p className="footerTextNormal text-center sm:text-left">
                        © 2025 leparfum.ai. All rights reserved.
                    </p>

                    {/* SOCIALS */}
                    <div className="flex items-center gap-[18px]">

                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            className="hover:opacity-75 transition-opacity"
                        >
                            <FaInstagram size={18} />
                        </a>

                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            className="hover:opacity-75 transition-opacity"
                        >
                            <FaFacebookF size={16} />
                        </a>

                        <a
                            href="https://www.tiktok.com/"
                            target="_blank"
                            className="hover:opacity-75 transition-opacity"
                        >
                            <FaTiktok size={16} />
                        </a>

                        <a
                            href="https://x.com/"
                            target="_blank"
                            className="hover:opacity-75 transition-opacity"
                        >
                            <FaXTwitter size={16} />
                        </a>

                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            className="hover:opacity-75 transition-opacity"
                        >
                            <FaLinkedinIn size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}