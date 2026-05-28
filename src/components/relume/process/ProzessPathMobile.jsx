"use client";

import React, { useEffect, useRef } from "react";
import { MessageSquare, Ruler, ClipboardCheck, Building2, KeyRound } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Erstgespräch",
    Icon: MessageSquare,
    img: "/images/prozess/step1.png",
    bullets: [
      "Kostenlose Beratung vor Ort",
      "Projektziele & Budget besprechen",
      "Erste Einschätzung & Empfehlung",
    ],
  },
  {
    num: "02",
    title: "Angebot & Planung",
    Icon: Ruler,
    img: "/images/prozess/step2.png",
    bullets: [
      "Verbindliches Festpreisangebot",
      "Materialauswahl & Terminplanung",
      "Vertragsabschluss",
    ],
  },
  {
    num: "03",
    title: "Vorbereitung",
    Icon: ClipboardCheck,
    img: "/images/prozess/step3.png",
    bullets: [
      "Materialbestellung & Lieferung",
      "Baustelle einrichten & schützen",
      "Abstimmung mit dem Kunden",
    ],
  },
  {
    num: "04",
    title: "Ausführung",
    Icon: Building2,
    img: "/images/bild16.png",
    bullets: [
      "Fachgerechte Umsetzung durch Mustafa",
      "Laufende Qualitätskontrolle",
      "Sauberkeit auf der Baustelle garantiert",
    ],
  },
  {
    num: "05",
    title: "Übergabe",
    Icon: KeyRound,
    img: "/images/bild9.png",
    bullets: [
      "Gründliche Endreinigung",
      "Abnahme & Mängelprotokoll",
      "Übergabe & persönliches Feedback",
    ],
  },
];

export function ProzessPathMobile() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll("[data-step]");
    const lineFill = section.querySelector("[data-line-fill]");
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!lineFill) return;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh * 0.5;
        const scrolled = Math.min(Math.max(vh * 0.3 - rect.top, 0), total);
        const pct = total > 0 ? (scrolled / total) * 100 : 0;
        lineFill.style.height = pct + "%";
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#FFFFFF",
        padding: "96px 0 120px",
        overflow: "hidden",
      }}
    >
      <style>{`
        .pm-step {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pm-step.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .pm-step.is-visible .pm-dot-inner {
          transform: scale(1);
          opacity: 1;
        }
        .pm-step.is-visible .pm-img-wrap {
          transform: scale(1);
          opacity: 1;
        }
        .pm-dot-inner {
          transform: scale(0);
          opacity: 0;
          transition:
            transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s,
            opacity 0.4s ease 0.25s;
        }
        .pm-img-wrap {
          opacity: 0;
          transform: scale(0.94);
          transition:
            opacity 0.7s ease 0.2s,
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
        }
      `}</style>

      {/* PROZESS watermark */}
      <div
        style={{
          position: "absolute",
          left: "-2vw",
          top: 36,
          fontFamily: "Syne, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(3.5rem, 18vw, 6rem)",
          color: "rgba(8,17,31,0.05)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        PROZESS
      </div>

      {/* Section heading */}
      <div
        style={{
          position: "relative",
          padding: "0 6vw 64px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <span
            style={{
              display: "block",
              width: 28,
              height: 1,
              background: "#C8962E",
            }}
          />
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#C8962E",
            }}
          >
            Der Projektbau-Erding Prozess
          </span>
        </div>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 8vw, 2.75rem)",
            lineHeight: 1.05,
            color: "#08111F",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Von der Idee
          <br />
          zur Übergabe.
        </h2>
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "relative",
          padding: "0 6vw 0",
          zIndex: 1,
        }}
      >
        {/* Vertical track — base */}
        <div
          style={{
            position: "absolute",
            left: "calc(6vw + 17px)",
            top: 0,
            bottom: 0,
            width: 1,
            background: "rgba(200,150,46,0.20)",
          }}
        />
        {/* Vertical track — animated fill */}
        <div
          data-line-fill
          style={{
            position: "absolute",
            left: "calc(6vw + 17px)",
            top: 0,
            width: 1,
            height: "0%",
            background:
              "linear-gradient(180deg, rgba(200,150,46,0.9) 0%, rgba(200,150,46,0.5) 100%)",
            transition: "height 0.15s linear",
          }}
        />

        {STEPS.map((step, i) => {
          const { Icon } = step;
          return (
            <div
              key={i}
              data-step
              className="pm-step"
              style={{
                position: "relative",
                paddingLeft: 56,
                marginBottom: i === STEPS.length - 1 ? 0 : 56,
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: 6,
                  top: 4,
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "rgba(200,150,46,0.15)",
                  }}
                />
                <span
                  className="pm-dot-inner"
                  style={{
                    position: "relative",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    border: "2px solid rgba(200,150,46,0.75)",
                    boxShadow:
                      "inset 0 0 0 3px #FFFFFF, 0 0 0 1px rgba(200,150,46,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#C8962E",
                    }}
                  />
                </span>
              </div>

              {/* Card */}
              <div style={{ position: "relative" }}>
                {/* Meta row */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: "1.5px solid rgba(8,17,31,0.18)",
                      background: "rgba(200,150,46,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} color="rgba(8,17,31,0.80)" />
                  </div>
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#C8962E",
                    }}
                  >
                    Schritt {step.num}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    position: "relative",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    lineHeight: 1.15,
                    color: "#08111F",
                    letterSpacing: "-0.01em",
                    margin: "0 0 16px",
                    zIndex: 1,
                  }}
                >
                  {step.title}
                </h3>

                {/* Image */}
                <div
                  className="pm-img-wrap"
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/10",
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid rgba(8,17,31,0.10)",
                    boxShadow: "0 18px 38px -20px rgba(8,17,31,0.20)",
                    marginBottom: 18,
                    zIndex: 1,
                  }}
                >
                  {step.img && (
                    <img
                      src={step.img}
                      alt={step.title}
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, rgba(8,17,31,0.25) 0%, rgba(8,17,31,0) 50%, rgba(8,17,31,0.40) 100%)",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 12,
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Bullets */}
                <ul
                  style={{
                    position: "relative",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    zIndex: 1,
                  }}
                >
                  {step.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.92rem",
                        color: "rgba(8,17,31,0.58)",
                        lineHeight: 1.55,
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: "#C8962E",
                          flexShrink: 0,
                          marginTop: 9,
                        }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
