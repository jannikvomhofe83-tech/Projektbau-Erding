"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

export function Header78() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const cursorRef = useRef(null);

  // Smooth cursor follow via gsap.ticker — no React state, no re-renders
  useEffect(() => {
    const section = sectionRef.current;
    const cursorEl = cursorRef.current;
    const imageEl = imageRef.current;
    if (!section || !cursorEl || !imageEl) return;

    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let active = false;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!active) {
        active = true;
        smoothX = targetX;
        smoothY = targetY;
        cursorEl.style.opacity = "1";
      }
    };

    const onLeave = () => {
      active = false;
      cursorEl.style.opacity = "0";
      imageEl.style.clipPath = "circle(0px at 50% 50%)";
    };

    const tick = () => {
      if (!active) return;
      // Lerp smoothing — feels weighty but still responsive
      smoothX += (targetX - smoothX) * 0.22;
      smoothY += (targetY - smoothY) * 0.22;
      cursorEl.style.transform = `translate3d(${smoothX}px, ${smoothY}px, 0) translate(-50%, -50%)`;
      imageEl.style.clipPath = `circle(180px at ${smoothX}px ${smoothY}px)`;
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    gsap.ticker.add(tick);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      gsap.ticker.remove(tick);
    };
  }, []);

  useEffect(() => {
    const introShown =
      typeof window !== "undefined" &&
      sessionStorage.getItem("hoser-intro-shown") === "1";

    const ctx = gsap.context(() => {
      // Parallax always runs regardless of visit type
      gsap.to(".hero-bg-img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      if (introShown) {
        // Return visit → show everything instantly, no animation
        gsap.set(".hero-bg-img", { scale: 1 });
        gsap.set(".hero-eyebrow-line", { scaleX: 1 });
        gsap.set(".hero-eyebrow-inner", { y: "0%" });
        gsap.set(".hero-headline-inner", { y: "0%" });
        gsap.set(".hero-body", { y: 0, opacity: 1 });
        gsap.set(".hero-cta", { y: 0, opacity: 1 });
        gsap.set(".hero-scroll", { opacity: 1, x: 0 });
        return;
      }

      // First visit → full cinematic animation after intro screen (~5 s)
      const tl = gsap.timeline({ delay: 5.0, defaults: { ease: "power3.out" } });

      tl.from(".hero-bg-img", { scale: 1.08, duration: 3.5, ease: "power1.out" }, 0);
      tl.from(".hero-eyebrow-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.85,
      }, 0.35);
      tl.from(".hero-eyebrow-inner", { y: "120%", duration: 0.65 }, 0.7);
      tl.from(".hero-headline-inner", {
        y: "110%",
        stagger: 0.13,
        duration: 1.15,
      }, 0.95);
      tl.from(".hero-body", { y: 28, opacity: 0, duration: 0.85 }, 1.5);
      tl.from(".hero-cta", { y: 22, opacity: 0, stagger: 0.11, duration: 0.7 }, 1.85);
      tl.from(".hero-scroll", { opacity: 0, x: -18, duration: 0.65 }, 2.3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ cursor: "none" }}
    >
      {/* ── Bild 2: vollflächiger Hintergrund ── */}
      <img
        src="/images/hero-bild2.png"
        alt="Projektbau-Erding"
        className="hero-bg-img absolute inset-0 h-full w-full object-cover object-center"
        style={{ willChange: "transform" }}
      />

      {/* Dunkler Verlauf */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(4,13,28,0.97) 0%, rgba(4,13,28,0.85) 35%, rgba(4,13,28,0.35) 60%, rgba(4,13,28,0.1) 100%)",
        }}
      />

      {/* ── Bild 1: Hover-Reveal (clip-path driven directly via DOM) ── */}
      <img
        ref={imageRef}
        src="/images/hero-bild1.png"
        alt="Projektbau-Erding Detail"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{
          clipPath: "circle(0px at 50% 50%)",
          willChange: "clip-path",
        }}
      />

      {/* ── Custom Cursor: outer ring + inner dot ── */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-20 flex items-center justify-center"
        style={{
          width: 48,
          height: 48,
          opacity: 0,
          transition: "opacity 0.25s ease",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {/* Outer ring */}
        <span className="absolute inset-0 rounded-full border border-hoser-gold/85" />
        {/* Inner dot */}
        <span className="block h-1.5 w-1.5 rounded-full bg-hoser-gold" />
      </div>


      {/* ── Text-Inhalt ── */}
      <div className="relative z-10 flex min-h-screen flex-col justify-start px-[6%] pt-28 pb-32 md:pt-32 lg:pt-36 md:max-w-[55%] lg:max-w-[50%]">

        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-4">
          <span className="hero-eyebrow-line h-px w-10 flex-shrink-0 bg-hoser-gold" />
          <div style={{ overflow: "hidden" }}>
            <p className="hero-eyebrow-inner font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              Erding · München · Ebersberg
            </p>
          </div>
        </div>

        {/* Headline – each line in its own overflow:hidden mask */}
        <h1
          className="mb-8 font-serif font-bold tracking-tight text-white"
          style={{ fontSize: "clamp(2.8rem, 5.5vw, 6.5rem)", lineHeight: 1.04 }}
        >
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
            <span className="hero-headline-inner block">
              Renovieren,{" "}
              <em className="italic">wie es sein soll.</em>
            </span>
          </span>
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
            <span className="hero-headline-inner block">
              Ihr Traum, unser Handwerk.
            </span>
          </span>
        </h1>

        {/* Body */}
        <p className="hero-body mb-10 max-w-[420px] font-body text-base leading-relaxed text-white/55 md:text-lg">
          Trockenbau, Altbausanierung und Innenausbau aus Erding.
          Projektbau-Erding steht für fachgerechte Arbeit, Ehrlichkeit
          und Sauberkeit – bei jedem Auftrag, groß oder klein.
        </p>

        {/* CTAs */}
        <div className="inline-flex flex-col gap-3">
          <a
            href="/kontakt"
            className="hero-cta flex items-center justify-between gap-2 border border-white px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-white hover:text-background-alternative"
          >
            Projekt anfragen <span>→</span>
          </a>
          <a
            href="/projekte"
            className="hero-cta flex items-center justify-between gap-2 border border-white px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-white hover:text-background-alternative"
          >
            Referenzen ansehen <span>→</span>
          </a>
        </div>
      </div>

      {/* Scroll-Indikator */}
      <div className="hero-scroll absolute bottom-8 left-[6%] z-10 hidden lg:flex items-center gap-3">
        <span className="h-px w-8 bg-white/20" />
        <span className="font-body text-xs uppercase tracking-[0.2em] text-white/30">Scroll</span>
      </div>
    </section>
  );
}
