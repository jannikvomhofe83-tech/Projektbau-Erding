"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

const partners = [
  {
    name: "Florian Falterbauer",
    role: "Sachverständiger für baulichen Brandschutz",
    note: "Produktpartner: Sika",
    img: null,
    initials: "FF",
  },
  {
    name: "Gön Kabelverlegung",
    role: "Elektro & Kabelverlegung",
    note: null,
    img: "/images/bild24.png",
    initials: null,
  },
  {
    name: "Malerbetrieb Heiko Günther",
    role: "Maler- & Lackierarbeiten",
    note: "Alle Arbeiten unter Meisterpflicht werden gemeinsam mit Heiko Günther ausgeführt.",
    img: "/images/bild25.png",
    initials: null,
  },
];

export function Partner() {
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-20 px-[5%] border-b border-[#0a1020]/[0.06]">
      <div className="container">

        {/* Eyebrow */}
        <div className="mb-10 flex items-center gap-4">
          <span className="h-px w-8 bg-[#C9A84C]/60" />
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
            Unsere Partner
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-px bg-[#0a1020]/[0.07] sm:grid-cols-3">
          {partners.map((p, i) => (
            <div
              key={p.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative flex flex-col bg-white px-8 py-9 transition-colors duration-300 hover:bg-[#fafaf8]"
            >
              {/* Image or initials avatar */}
              <div className="mb-6 h-20 w-20 overflow-hidden rounded-sm">
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#0a1020]/[0.06]">
                    <span className="font-heading text-sm font-bold text-[#C9A84C]">{p.initials}</span>
                  </div>
                )}
              </div>

              {/* Name + role */}
              <h3 className="mb-1 font-heading text-base font-bold text-[#0a1020] transition-colors duration-300 group-hover:text-[#C9A84C]">
                {p.name}
              </h3>
              <p className="mb-4 font-body text-xs uppercase tracking-[0.15em] text-[#0a1020]/40">
                {p.role}
              </p>

              {/* Note */}
              {p.note && (
                <p className="font-body text-sm leading-relaxed text-[#0a1020]/50">
                  {p.note}
                </p>
              )}

              {/* Gold bottom line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#C9A84C]/40 transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
