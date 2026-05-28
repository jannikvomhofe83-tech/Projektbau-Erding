"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

const splitWords = (el, text) => {
  el.innerHTML = "";
  return text.split(" ").map((word, i, arr) => {
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    wrap.style.paddingBottom = "0.08em";
    if (i < arr.length - 1) wrap.style.marginRight = "0.28em";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    return inner;
  });
};

export function HeroLeistungen() {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const headingRef  = useRef(null);
  const subRef      = useRef(null);
  const metaRef     = useRef(null);
  const imageRef    = useRef(null);
  const overlayRef  = useRef(null);
  const sideMarkRef = useRef(null);
  const ctaRef      = useRef(null);
  const scrollRef   = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let cooldown = false;

    const onWheel = (e) => {
      if (cooldown || e.deltaY <= 0) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight * 0.4) return;
      e.preventDefault();
      cooldown = true;
      const allSections = Array.from(document.querySelectorAll("section"));
      const idx = allSections.indexOf(section);
      const next = idx >= 0 ? allSections[idx + 1] : null;
      const targetY = next
        ? next.getBoundingClientRect().top + window.scrollY
        : window.innerHeight;
      window.scrollTo(0, targetY);
      setTimeout(() => { cooldown = false; }, 600);
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, { scale: 1.18, filter: "brightness(0.7)" });
      gsap.set(eyebrowRef.current, { x: -30, opacity: 0 });
      gsap.set(".leistungen-line-inner", { yPercent: 110 });
      gsap.set(subRef.current, { y: 24, opacity: 0 });
      gsap.set(ctaRef.current, { y: 18, opacity: 0 });
      gsap.set(scrollRef.current, { opacity: 0 });

      gsap.timeline({ defaults: { force3D: true } })
        .to(imageRef.current, { scale: 1.06, filter: "brightness(0.85)", duration: 1.6, ease: "power2.out" })
        .to(eyebrowRef.current, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=1.2")
        .to(".leistungen-line-inner", { yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.15 }, "-=0.5")
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }, "-=0.3")
        .to(scrollRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");

      gsap.to(imageRef.current, { scale: 1.1, duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0a1020] text-white"
      style={{ height: "100vh", minHeight: "720px" }}
    >
      {/* Background image */}
      <img
        ref={imageRef}
        src="/images/bild9.png"
        alt="Projektbau-Erding – Leistungen"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ willChange: "transform, filter" }}
      />

      {/* Overlay — dark on right, fades left (mirrored Prozess hero) */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to left, rgba(4,10,22,0.96) 0%, rgba(4,10,22,0.82) 40%, rgba(4,10,22,0.3) 75%, rgba(4,10,22,0.05) 100%)",
        }}
      />

      {/* Main content — right side */}
      <div className="relative z-10 h-full flex items-center justify-end px-[4%] pt-24 pb-36 md:pt-28 lg:pt-32 lg:pb-48">
        <div className="md:max-w-[50%] lg:max-w-[45%]">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-10 flex-shrink-0 bg-hoser-gold" />
            <div style={{ overflow: "hidden" }}>
              <p
                ref={eyebrowRef}
                className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/50"
              >
                Unsere Leistungen · Fachbetrieb für Innenausbau
              </p>
            </div>
          </div>

          <h1
            ref={headingRef}
            className="mb-10 font-heading font-bold tracking-tight text-white"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 6rem)", lineHeight: 1.04 }}
          >
            {["Ihr Traum,", "unser Handwerk."].map((line, i) => (
              <span key={i} className="block" style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
                <span className="leistungen-line-inner block">{line}</span>
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="max-w-[400px] font-body text-base leading-relaxed text-white/55 md:text-lg"
          >
            Trockenbau, Altbausanierung, Malerarbeiten und mehr –
            fachgerecht, ehrlich und sauber ausgeführt.
          </p>

          <a
            ref={ctaRef}
            href="#leistungen"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("leistungen")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group mt-10 flex items-center gap-5 w-fit"
          >
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 transition-colors duration-500 group-hover:border-hoser-gold">
              <span
                className="absolute inset-0 rounded-full border border-hoser-gold opacity-0 scale-125 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
                aria-hidden="true"
              />
              <svg
                className="h-4 w-4 text-white/80 transition-all duration-500 group-hover:text-hoser-gold group-hover:translate-y-0.5"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 2 v12 M3 9 l5 5 l5 -5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-left">
              <span className="block font-body text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-hoser-gold">
                Leistungen entdecken
              </span>
              <span className="mt-1 block font-body text-[0.65rem] uppercase tracking-[0.22em] text-white/40">
                Trockenbau · Sanierung · Ausbau
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Bottom-right: scroll indicator */}
      <div className="absolute bottom-12 right-[6%] z-10 hidden lg:block">
        <div className="flex items-center gap-5">
          <span
            ref={scrollRef}
            className="block font-body text-[0.6rem] uppercase tracking-[0.4em] text-white/30"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Scrollen
          </span>
          <span className="relative mt-4 block h-16 w-px bg-white/15 overflow-hidden">
            <span data-scroll-dot className="absolute left-0 top-0 block w-px h-4 bg-hoser-gold" />
          </span>
        </div>
      </div>
    </section>
  );
}
