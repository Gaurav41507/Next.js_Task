"use client";

export default function Navbar() {
    return (
        <header
            className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between"
            style={{
                background: "transparent",
                padding: "1.1rem 3.5rem",
            }}
        >
            <img
                src="/images/Navlogo.png"
                alt="leparfum.ai logo"
                className="h-auto w-auto object-contain"
                style={{ maxHeight: "28px" }}
            />

            <nav className="flex items-center gap-10">
                <button
                    className="text-[0.8rem] uppercase tracking-[0.2rem] text-white transition-opacity duration-300 hover:opacity-70"
                    style={{
                        padding: "0.3rem 0.7rem",
                    }}
                >
                    Curate My Scent
                </button>

                <button className="text-[0.8rem] uppercase tracking-[0.2rem] text-white transition-opacity duration-300 hover:opacity-70">
                    Lets Chat
                </button>
            </nav>
        </header>
    );
}
