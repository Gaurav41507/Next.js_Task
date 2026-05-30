"use client";

import { useState } from "react";


const WORLD_CARDS = [
  {
    id: "weddings",
    title: "WEDDINGS",
    image: "/images/C1.png",
    description:
      "Give your guests something truly memorable. Each person creates a fragrance that captures their experience of your special day—preserving personal moments in a luxurious keepsake.",
  },
  {
    id: "corporate",
    title: "CORPORATE & GIFTING",
    image: "/images/C2.png",
    description:
      "Give your guests something truly memorable. Each person creates a fragrance that captures their experience of your special day—preserving personal moments in a luxurious keepsake.",
  },
  {
    id: "hospitality",
    title: "HOSPITALITY",
    image: "/images/C3.png",
    description:
      "Give your guests something truly memorable. Each person creates a fragrance that captures their experience of your special day—preserving personal moments in a luxurious keepsake.",
  },
];

const ORBIT_CARDS = [
  { id: 1, image: "/images/01.png", deg: 0, tilt: -3 },
  { id: 2, image: "/images/02.png", deg: 30, tilt: 2 },
  { id: 3, image: "/images/03.png", deg: 60, tilt: -4 },
  { id: 4, image: "/images/04.png", deg: 90, tilt: 5 },

  { id: 5, image: "/images/05.png", deg: 120, tilt: -2 },
  { id: 6, image: "/images/06.png", deg: 150, tilt: 4 },
  { id: 7, image: "/images/07.png", deg: 180, tilt: -5 },
  { id: 8, image: "/images/08.png", deg: 210, tilt: 3 },

  { id: 9, image: "/images/09.png", deg: 240, tilt: -3 },
  { id: 10, image: "/images/010.png", deg: 270, tilt: 2 },

  { id: 11, image: "/images/03.png", deg: 300, tilt: -4 },
  { id: 12, image: "/images/06.png", deg: 330, tilt: 1 },
];

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      '"Our guests still talk about it. Each one left with something beautiful, personal and completely unforgettable. It was the perfect way to share a piece of our day - and ourselves - with everyone we love."',
    author: "John Doe",
    role: "VP of Employee Experience",
  },
  {
    id: 2,
    quote:
      '"An extraordinary experience from start to finish. The fragrances were unlike anything we\'ve ever received as a corporate gift. Thoughtful, personal, and truly one of a kind."',
    author: "Sarah Mitchell",
    role: "Head of Brand Experience",
  },
  {
    id: 3,
    quote:
      '"Every detail was considered. Our team was genuinely moved by how personal and meaningful the scents were. It created a connection we hadn\'t expected."',
    author: "James Lawson",
    role: "Director of Guest Relations",
  },
];



const PANEL_H = 252;
const CARD_VH = 78;
const ORBIT_R = 310;
const ORBIT_SIZE = 1000;

export default function ChooseYourWorld() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () =>
    setActiveIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () =>
    setActiveIdx((p) => (p + 1) % TESTIMONIALS.length);

  return (
    <>
      <style>{`
       
        @keyframes cyw-spin   { to { transform: rotate(360deg);  } }
        @keyframes cyw-cspin  { to { transform: rotate(-360deg); } }

       
        @keyframes cyw-shimmer {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(240%);  }
        }

        
        .cyw-card {
  flex: 1;
  height: ${CARD_VH}vh;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  transition:
    flex 0.9s cubic-bezier(0.22, 1, 0.36, 1);

  will-change: flex;
}

.cyw-card.hov {
  flex: 1.45;
}

.cyw-card.shr {
  flex: 0.9;

  transition:
    flex 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.05s;
}

  

.cyw-img-wrap {
  width: 100%;
  height: ${CARD_VH}vh;
  overflow: hidden;
  position: relative;

  transition:
    height 0.8s cubic-bezier(0.22, 1, 0.36, 1);

  will-change: height;
}

/* STARTS ONLY AFTER EXPANSION */
.cyw-card.expanded .cyw-img-wrap {
  height: calc(${CARD_VH}vh - ${PANEL_H}px);
}

.cyw-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  transition:
    transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);

  will-change: transform;
}

.cyw-card.hov .cyw-img {
  transform: scale(1.03);
}



.cyw-lbl {
  position: absolute;
  bottom: 24px;
  left: 28px;

  color: rgba(255,255,255,0.90);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  font-weight: 500;

  z-index: 2;
  pointer-events: none;

  opacity: 1;
  transform: translateY(0);

  transition:
    opacity 0.25s ease,
    transform 0.35s ease;

  will-change: transform, opacity;
}

.cyw-card.hov .cyw-lbl {
  opacity: 0;
  transform: translateY(12px);
}


.cyw-panel {
  height: 0;
  overflow: hidden;
  background: #f3ece0;

  display: flex;
  align-items: center;

  transition:
    height 0.75s cubic-bezier(0.22, 1, 0.36, 1);

  will-change: height;
}


.cyw-card.expanded .cyw-panel {
  height: ${PANEL_H}px;
}

.cyw-panel-body {
  padding: 0 34px;

  opacity: 0;
  transform: translateY(30px);

  transition:
    opacity 0.5s ease,
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);

  will-change: transform, opacity;
}

/* CONTENT APPEARS LAST */
.cyw-card.expanded .cyw-panel-body {
  opacity: 1;
  transform: translateY(0);

  transition-delay: 0.18s;
}

.cyw-card.hov .cyw-panel-body {
  opacity: 1;
  transform: translateY(0);

  transition-delay: 0.42s;
}
      
        .cyw-nav-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          background: transparent;
          color: rgba(255, 255, 255, 0.75);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.22s, background 0.22s;
        }
        .cyw-nav-btn:hover {
          border-color: rgba(255, 255, 255, 0.65);
          background: rgba(255, 255, 255, 0.06);
        }

        
        .cyw-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1.5px solid #222;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cyw-arrow-btn:hover { background: rgba(0, 0, 0, 0.07); }
      `}</style>

      {/* ════════════════════════════════════════════════════
          SECTION 1 — CHOOSE YOUR WORLD (card hover expand)
      ════════════════════════════════════════════════════ */}
      <section style={{ background: "#F7F5EF" }}>

        {/* heading */}
        <div style={{ padding: "72px 52px 44px" }}>
          <h2
            style={{
              fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)",
              fontWeight: 400,
              letterSpacing: "0.2em",
              color: "#000000",
              marginBottom: "10px",
            }}
          >
            CHOOSE YOUR WORLD
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#000000", letterSpacing: "0.04em" }}>
            Which story will you write in scent?
          </p>
        </div>

        {/* card row */}
        <div style={{ display: "flex", width: "100%" }}>
          {WORLD_CARDS.map((card) => {
            const isHov = hovered === card.id;
            const isExpanded = expanded === card.id;
            const isShr = hovered !== null && !isHov;

            return (
              <div
                key={card.id}
                className={`
  cyw-card
  ${isHov ? " hov" : ""}
  ${isShr ? " shr" : ""}
  ${isExpanded ? " expanded" : ""}
`}
                onMouseEnter={() => {
                  setHovered(card.id);

                  setTimeout(() => {
                    setExpanded(card.id);
                  }, 420);
                }}

                onMouseLeave={() => {
                  setHovered(null);
                  setExpanded(null);
                }}
              >

                <div className="cyw-img-wrap">
                  <img src={card.image} alt={card.title} className="cyw-img" />


                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.56) 0%, transparent 48%)",
                    }}
                  />


                  <div className="cyw-lbl">{card.title}</div>
                </div>


                <div className="cyw-panel">
                  <div className="cyw-panel-body">
                    <p
                      style={{
                        fontSize: "0.70rem",
                        letterSpacing: "0.20em",
                        color: "#1a1a1a",
                        fontWeight: 700,
                        marginBottom: "10px",
                      }}
                    >
                      {card.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.83rem",
                        lineHeight: 1.78,
                        color: "#555",
                        marginBottom: "22px",
                        maxWidth: "340px",
                      }}
                    >
                      {card.description}
                    </p>
                    <button className="cyw-arrow-btn" aria-label="Learn more">
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M2 8h12M10 4l4 4-4 4"
                          stroke="#1a1a1a"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2 */}
      <section
        style={{
          background: "#FFFFFF",
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <div
          style={{
            position: "absolute",
            width: `${ORBIT_SIZE}px`,
            height: `${ORBIT_SIZE}px`,
            animation: "cyw-spin 80s linear infinite",
            pointerEvents: "none",
          }}
        >
          {ORBIT_CARDS.map((card) => {
            // Convert orbit angle to (x, y) inside the ring bounding box
            const rad = (card.deg * Math.PI) / 180;
            const CARD_W = 92;
            const CARD_H = 132;

            const cx =
              ORBIT_SIZE / 2 +
              ORBIT_R * Math.cos(rad);

            const cy =
              ORBIT_SIZE / 2 +
              ORBIT_R * Math.sin(rad);
            return (
              <div
                key={card.id}
                style={{
                  position: "absolute",
                  left: `${cx}px`,
                  top: `${cy}px`,
                  width: "92px",
                  height: "132px",

                  transform: `
      translate(-50%, -100%)
      rotate(${card.deg + 90}deg)
    `,

                  transformOrigin: "bottom center",

                  willChange: "transform",
                  pointerEvents: "auto",
                }}
              >
                {/* actual card face */}
                <div
                  style={{
                    width: "92px",
                    height: "132px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    transform: `rotate(${card.tilt}deg)`,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
                    position: "relative",
                    background: "#fff",
                  }}
                >
                  <img
                    src={card.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to bottom right, rgba(255,255,255,0.16), transparent 40%, rgba(0,0,0,0.06))",
                      pointerEvents: "none",
                    }}
                  />
                </div>
                {/* card "window" detail */}
                <div
                  style={{
                    position: "absolute",
                    top: "13px",
                    left: "11px",
                    right: "11px",
                    height: "56px",
                    borderRadius: "5px",
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
                {/* bottom label lines */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "11px",
                    right: "11px",
                    height: "2px",
                    borderRadius: "2px",
                    background: "rgba(255,255,255,0.09)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "22px",
                    left: "11px",
                    right: "28px",
                    height: "2px",
                    borderRadius: "2px",
                    background: "rgba(255,255,255,0.05)",
                  }}
                />
                {/* shimmer sweep */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "40%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)",
                    transform: "translateX(-120%)",
                    animation: `cyw-shimmer ${3.5 + card.id * 0.45}s ease-in-out ${card.id * 0.3}s infinite`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Center text content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: "440px",
            padding: "0 20px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "0.14em",
              color: "#000000",
              lineHeight: 1.05,
              marginBottom: "26px",
            }}
          >
            UNIQUELY
            <br />
            BOTTLED
          </h2>
          <p
            style={{
              fontSize: "0.84rem",
              lineHeight: 1.88,
              color: "rgba(0, 0, 0, 0.48)",
            }}
          >
            Every guest and recipient experiences moments differently. We transform
            these unique perspectives into individual fragrances—creating a diverse
            collection of bespoke scents, each crafted with exceptional care.
          </p>
          <p
            style={{
              fontSize: "0.64rem",
              letterSpacing: "0.18em",
              color: "rgba(0, 0, 0, 0.88)",
              margin: "20px 0 14px",
            }}
          >
            HOW CAN WE ELEVATE YOUR BIG DAY?
          </p>

          {/* email CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "2px",
              maxWidth: "310px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <span
              style={{
                padding: "11px 13px",
                color: "rgba(0, 0, 0, 0.45)",
                fontSize: "0.78rem",
                borderRight: "1px solid rgba(255,255,255,0.16)",
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
              }}
            >
              E
            </span>
            <input className="border border-black"
              type="email"
              placeholder="your@email.com"
              aria-label="Email address"
              style={{
                flex: 1,
                background: "transparent",

                outline: "none",
                color: "rgba(0, 0, 0, 0.7)",
                padding: "11px 12px",
                fontSize: "0.82rem",
              }}
            />
            <button
              aria-label="Submit"
              style={{
                padding: "11px 15px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "rgba(0, 0, 0, 0.55)",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section
        style={{
          background: "#000",
          padding: "96px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* sliding track */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "520px",
          }}
        >
          {TESTIMONIALS.map((t, i) => {
            const isAct = i === activeIdx;
            return (
              <div
                key={t.id}
                style={{
                  width: "620px",

                  padding: "70px 56px",

                  position: "absolute",

                  left:
                    i === activeIdx
                      ? "50%"
                      : i ===
                        (activeIdx - 1 + TESTIMONIALS.length) %
                        TESTIMONIALS.length
                        ? "-8%"
                        : "72%",

                  top: "0",

                  transform:
                    i === activeIdx
                      ? "translateX(-50%) scale(1)"
                      : "scale(0.92)",

                  opacity: isAct ? 1 : 0.16,

                  transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",

                  userSelect: "none",
                }}
              >

                {/* left divider */}
                {isAct && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "60px",
                      bottom: "60px",
                      width: "0.5px",
                      background: "rgba(255,255,255,0.22)",
                    }}
                  />
                )}

                {/* right divider */}
                {isAct && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "60px",
                      bottom: "60px",
                      width: "1px",
                      background: "rgba(255,255,255,0.12)",
                    }}
                  />
                )}
                {/* decorative double quote image */}
                <img
                  src="/images/Comma.png"
                  alt="Quote"
                  style={{
                    height: "54px",
                    width: "auto",
                    marginBottom: "38px",
                    display: "block",
                    opacity: isAct ? 0.90 : 0.30,
                    transition: "opacity 0.60s ease",
                  }}
                />

                <p
                  style={{
                    fontSize: "clamp(0.80rem, 1.25vw, 1.0rem)",
                    lineHeight: 1.78,
                    color: isAct ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.45)",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                    marginBottom: "34px",
                    transition: "color 0.60s ease",
                  }}
                >
                  {t.quote}
                </p>

                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "rgba(255,255,255,0.72)",
                    marginBottom: "3px",
                  }}
                >
                  {t.author}
                </p>
                <p style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.32)" }}>
                  {t.role}
                </p>
              </div>
            );
          })}
        </div>

        {/* prev / next arrows */}
        <div
          style={{
            position: "absolute",
            bottom: "44px",
            right: "60px",
            display: "flex",
            gap: "12px",
          }}
        >
          <button className="cyw-nav-btn" onClick={prev} aria-label="Previous testimonial">
            ←
          </button>
          <button className="cyw-nav-btn" onClick={next} aria-label="Next testimonial">
            →
          </button>
        </div>
      </section>
    </>
  );
}
