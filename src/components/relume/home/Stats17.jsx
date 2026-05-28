"use client";

import { useRef, useEffect } from "react";
import { gsap } from "../../../utils/gsap";

const stats = [
  { value: "5012", label: "Bewertungen auf My-Hammer", num: 5012, suffix: "" },
  { value: "5/5", label: "Google-Bewertung",           num: 5,   suffix: "/5" },
  { value: "12",  label: "Google Rezensionen",         num: 12,  suffix: "" },
  { value: "24/7", label: "Erreichbar für Sie",        num: 24,  suffix: "/7" },
];

export function Stats17() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Initial states (hidden) ───────────────────────────────────────
      gsap.set(".s17-content", { opacity: 0, y: 50 });
      gsap.set(".s17-bg-img", { scale: 1.18 });
      gsap.set(".s17-overlay", { opacity: 0.15 });

      // ── Master pinned timeline ────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Phase 1 (0 → 0.55): Image clip-path expands from small box to full bleed
      tl.fromTo(".s17-bg-clip",
        { clipPath: "inset(18% 22% 18% 22%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 0.55 },
        0
      );

      // Phase 1 parallel: Ken Burns — image scales down as it expands
      tl.to(".s17-bg-img",
        { scale: 1, ease: "power2.out", duration: 0.55 },
        0
      );

      // Phase 2 (0.5 → 0.65): Dark overlay deepens for text contrast
      tl.to(".s17-overlay",
        { opacity: 0.7, ease: "power2.inOut", duration: 0.15 },
        0.5
      );

      // Phase 3 (0.62 → 0.85): Text content slides up + fades in
      tl.to(".s17-content",
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.23 },
        0.62
      );

      // Phase 3 parallel: Stat counters tick up
      const numEls = gsap.utils.toArray(".s17-num", sectionRef.current);
      numEls.forEach((el, i) => {
        const stat = stats[i];
        const obj = { val: 0 };
        tl.to(obj, {
          val: stat.num,
          ease: "power2.out",
          duration: 0.28,
          onUpdate() {
            el.textContent = Math.round(obj.val) + stat.suffix;
          },
        }, 0.7 + i * 0.04);
      });

      // Phase 3 parallel: Gold left-borders draw down
      tl.fromTo(".s17-item-border",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          stagger: 0.04,
          ease: "power3.out",
          duration: 0.18,
        },
        0.7
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FFFFFF]"
      style={{ height: "100vh" }}
    >
      {/* Background image — clip-path animated wrapper */}
      <div className="s17-bg-clip absolute inset-0 z-0">
        <img
          src="/images/bild7.png"
          alt="Renovierter Innenraum"
          className="s17-bg-img absolute inset-0 size-full object-cover"
          style={{ willChange: "transform" }}
        />
        <div className="s17-overlay absolute inset-0 bg-[#FFFFFF]" />
      </div>

      {/* Content — hidden until image fills the section */}
      <div className="container relative z-10 flex h-full items-center px-[5%] py-16 md:py-24 lg:py-28">
        <div className="s17-content grid w-full grid-cols-1 items-center gap-y-12 lg:grid-cols-2 lg:gap-x-20">

          {/* Left */}
          <div>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-hoser-gold md:mb-4">
              Unsere Zahlen
            </p>
            <h2 className="mb-5 font-heading text-5xl font-bold leading-tight tracking-tight text-text-alternative md:mb-6 md:text-7xl lg:text-8xl">
              Ergebnisse,<br />die für sich sprechen
            </h2>
            <p className="font-body text-base text-text-alternative/75 md:text-lg">
              Über 20 Jahre Erfahrung. Über 5.000 zufriedene Kunden. Ein Ruf.
            </p>
            <div className="mt-8">
              <a
                href="/projekte"
                className="inline-flex items-center gap-3 border border-text-alternative/30 px-7 py-3 font-body text-sm font-semibold tracking-wide text-text-alternative transition-all duration-200 hover:border-hoser-gold hover:text-hoser-gold"
              >
                Projekte entdecken
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-2 md:gap-x-12 md:gap-y-12">
            {stats.map((stat) => (
              <div key={stat.label} className="relative pl-6">
                <div className="s17-item-border absolute left-0 top-0 h-full w-0.5 bg-hoser-gold" />
                <p className="s17-num mb-2 font-heading text-5xl font-bold leading-tight text-text-alternative md:text-6xl lg:text-7xl">
                  {stat.value}
                </p>
                <p className="font-body text-sm font-medium text-text-alternative/70 md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
