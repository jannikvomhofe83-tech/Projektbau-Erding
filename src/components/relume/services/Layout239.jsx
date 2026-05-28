"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

const services = [
  {
    image: "/images/bild10.png",
    num: "01",
    title: "Trockenbau",
    body: "Professioneller Trockenbau für Wohn- und Gewerberäume – Trennwände, Decken, Verkleidungen und mehr.",
    tags: ["Trennwände", "Unterdecken", "Schachtkonstruktionen"],
  },
  {
    image: "/images/bild11.png",
    num: "02",
    title: "Altbausanierung",
    body: "Fachgerechte Sanierung von Altbauten – von der energetischen Modernisierung bis zur Komplettsanierung.",
    tags: ["Energetische Sanierung", "Modernisierung", "Bestandsgebäude"],
  },
  {
    image: "/images/interior-oak-concrete.jpg",
    num: "03",
    title: "Innenausbau",
    body: "Kompletter Innenausbau nach Ihren Wünschen – vom Rohbau bis zur schlüsselfertigen Übergabe.",
    tags: ["Bodenbeläge", "Türen & Fenster", "Schlüsselfertig"],
  },
  {
    image: "/images/bild12.png",
    num: "04",
    title: "Malerarbeiten",
    body: "Hochwertige Malerarbeiten innen und außen – sauber, präzise und termingerecht ausgeführt.",
    tags: ["Innenanstrich", "Außenanstrich", "Tapezieren"],
  },
  {
    image: "/images/villa-twilight.jpg",
    num: "05",
    title: "Fassadenrenovierung",
    body: "Fassadensanierung und -renovierung für ein frisches Erscheinungsbild und besseren Wärmeschutz.",
    tags: ["WDVS", "Putzarbeiten", "Wetterschutz"],
  },
  {
    image: "/images/bild14.png",
    num: "06",
    title: "Dachgeschossausbau",
    body: "Ausbau und Renovierung von Dachgeschossen – vom Trockenbau bis zur vollständigen Raumgestaltung.",
    tags: ["Dachausbau", "Wohnraumgewinnung", "Dämmung"],
  },
];

export function Layout239() {
  const sectionRef   = useRef(null);
  const eyebrowRef   = useRef(null);
  const headingRef   = useRef(null);
  const gridRef      = useRef(null);
  const cardsRef     = useRef([]);
  const ctaWrapRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const grid  = gridRef.current;
      if (!cards.length || !grid) return;

      // ── 3D stage ─────────────────────────────────────────────────────────
      gsap.set(grid, { perspective: 50000 });
      grid.style.perspectiveOrigin = "50% 50%";
      cards.forEach((c) => { c.style.transformStyle = "preserve-3d"; });

      // ── Compute per-card offsets to VIEWPORT CENTER (resize-aware) ───────
      // Independent of where the grid sits in the document — we always pin
      // the stack to the literal middle of the viewport. The dy is computed
      // so that when the section is pinned at top:0, the card lands on
      // window.innerHeight / 2.
      let offsets = [];
      const computeOffsets = () => {
        cards.forEach((c) => gsap.set(c, { clearProps: "transform" }));

        const sectionRect = sectionRef.current.getBoundingClientRect();
        const vpCenterX   = window.innerWidth  / 2;
        const vpCenterY   = window.innerHeight / 2;

        offsets = cards.map((card) => {
          const r = card.getBoundingClientRect();
          // Card center, X is unaffected by scroll
          const cardCenterX = r.left + r.width / 2;
          // Card center Y measured relative to section top — when section
          // pins at viewport top (0), this becomes the card's viewport Y.
          const cardCenterYInSection = (r.top + r.height / 2) - sectionRect.top;

          return {
            dx: vpCenterX - cardCenterX,
            dy: vpCenterY - cardCenterYInSection,
          };
        });
        return offsets;
      };

      // ── Initial stack: 5 perfectly horizontal floating "edges" ───────────
      // rotationX 89.9 → card faces collapse flat to camera, images vanish,
      //   only the dark card edge remains as a thin horizontal stripe.
      // rotationZ 0 → no tilt, perfectly horizontal lines.
      // y offset = centering offset + small fixed pixel offset around index 2
      //   (middle card stays at center, others spread ±30/±60px).
      const stackCards = () => {
        computeOffsets();
        cards.forEach((card, i) => {
          const o = offsets[i];
          gsap.set(card, {
            x: o.dx,
            y: o.dy + (i - 2) * 100,
            z: (4 - i) * 2,
            yPercent: 0,
            rotationX: 87,
            rotationZ: 0,
            opacity: 1,
            transformOrigin: "center center",
            force3D: true,
            willChange: "transform",
          });
          card.style.pointerEvents = "none";
        });
      };

      stackCards();

      // ── Inner card content (only animates after the deal lands) ──────────
      const allCardContents   = cards.map((c) => c.querySelector("[data-card-content]")).filter(Boolean);
      const allCardSecondaries = cards.map((c) => c.querySelector("[data-card-secondary]")).filter(Boolean);
      const allCardImages   = cards.map((c) => c.querySelector("[data-card-image]")).filter(Boolean);
      const allCardOverlays = cards.map((c) => c.querySelector("[data-card-overlay]")).filter(Boolean);
      const allCardNums     = cards.map((c) => c.querySelector("[data-card-num]")).filter(Boolean);
      const allCardTitles   = cards.map((c) => c.querySelector("[data-card-title]")).filter(Boolean);
      const allCardArrows   = cards.map((c) => c.querySelector("[data-card-arrow]")).filter(Boolean);
      const allCardBodies   = cards.map((c) => c.querySelector("[data-card-body]")).filter(Boolean);
      const allCardTagWraps = cards.map((c) => c.querySelector("[data-card-tags]")).filter(Boolean);

      // Heading stays visible from the start so the user has context while
      // the floating stack lingers in the buffer zone.
      gsap.set(eyebrowRef.current, { y: 0, opacity: 1, force3D: true });
      gsap.set(headingRef.current, { y: 0, opacity: 1, force3D: true });
      gsap.set(allCardContents, { opacity: 0 });
      gsap.set(allCardSecondaries, { autoAlpha: 0, y: 15 });
      gsap.set(allCardImages,   { scale: 1, force3D: true });
      gsap.set(allCardOverlays, { opacity: 1 });
      gsap.set([...allCardNums, ...allCardTitles, ...allCardArrows, ...allCardBodies, ...allCardTagWraps], {
        opacity: 1, y: 0, force3D: true,
      });
      gsap.set(ctaWrapRef.current?.children || [], { y: 18, opacity: 0, force3D: true });

      // ── Master timeline (auto-play, triggered once when in view) ─────────
      const tl = gsap.timeline({
        defaults: { force3D: true },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          once: true,
        },
      });

      // ── PHASE 1 — BRIEF PAUSE (5 lines visible) ──────────────────────────
      tl.to({}, { duration: 0.6 })

        // ── PHASE 2 — CAMERA SWING (collapse to single centered stack) ────
        // No perspective tween (perf hog). Static perspective 2500 on grid.
        .to(cards, {
          rotationX: 0,
          rotationZ: 0,
          y: (i) => offsets[i].dy,
          duration: 1.8,
          ease: "power3.inOut",
        })
        .to(allCardContents, {
          opacity: 1,
          duration: 1.8,
          ease: "power3.inOut",
        }, "<")

        // ── PHASE 3 — DEAL OUT (clean wave from center) ──────────────────
        // Cards fly straight from the centered stack to their grid positions.
        // Wave-stagger from center outward + crisp expo.out ease for a
        // satisfying, premium glide without any 3D tricks that could
        // visually scramble the stack at the transition.
        .to(cards, {
          x: 0,
          y: 0,
          z: 0,
          yPercent: 0,
          rotationX: 0,
          rotationZ: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: { each: 0.14, from: "center", ease: "power2.in" },
        })

        .to(ctaWrapRef.current?.children || [], {
          y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.08,
        }, "-=0.3")

        // ── PHASE 4 — REVEAL secondary content (body + tags) ──────────────
        .to(allCardSecondaries, {
          autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1,
        }, "-=0.2")

        // Clear willChange + restore pointer-events when animation completes
        .add(() => {
          cards.forEach((c) => {
            c.style.willChange = "auto";
            c.style.pointerEvents = "";
          });
        });

      // Refresh once layout has settled
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leistungen"
      className="bg-[#f0f0ef] px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <p
            ref={eyebrowRef}
            className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold"
            style={{ willChange: "transform, opacity" }}
          >
            Unsere Leistungen auf einen Blick
          </p>
          <h2
            ref={headingRef}
            className="font-heading font-bold leading-tight tracking-tight text-[#0a1020]"
            style={{ fontSize: "clamp(1.6rem, 5.5vw, 4rem)", willChange: "transform, opacity" }}
          >
            Sechs Leistungen. Ein Ansprechpartner.
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          style={{ transformStyle: "preserve-3d" }}
        >
          {services.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative overflow-hidden rounded-2xl bg-[#111827] cursor-pointer"
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            >
              <div data-card-content>
              {/* Primary: image, gradient, number, title */}
              <div data-card-primary className="relative h-52 overflow-hidden sm:h-36 md:h-44">
                <img
                  data-card-image
                  src={s.image}
                  alt={s.title}
                  loading="eager"
                  decoding="sync"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div
                  data-card-overlay
                  className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/30 to-transparent"
                />

                {/* Number top-left */}
                <span
                  data-card-num
                  className="absolute left-5 top-5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-hoser-gold"
                >
                  {s.num}
                </span>

                {/* Title overlay bottom-left */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                  <h3
                    data-card-title
                    className="font-heading text-base font-bold leading-tight text-white md:text-lg"
                  >
                    {s.title}
                  </h3>
                  <span
                    data-card-arrow
                    className="text-hoser-gold text-sm transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </div>

              {/* Secondary: body text + tags (revealed after deal lands) */}
              <div data-card-secondary className="px-4 pb-4 pt-3">
                <p
                  data-card-body
                  className="mb-3 font-body text-xs leading-relaxed text-white/50"
                >
                  {s.body}
                </p>
                <div
                  data-card-tags
                  className="border-t border-white/8 pt-3 flex flex-wrap gap-1.5"
                >
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 font-body text-[11px] tracking-wide text-white/50 transition-colors duration-300 hover:border-hoser-gold hover:text-hoser-gold cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div ref={ctaWrapRef} className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 md:mt-14">
          <a
            href="/kontakt"
            className="inline-flex w-full items-center justify-center bg-hoser-gold px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity duration-200 hover:opacity-85 sm:w-auto sm:justify-start"
          >
            Projekt anfragen
          </a>
          <a
            href="/projekte"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.1em] text-[#08111F]/55 transition-colors duration-200 hover:text-hoser-gold"
          >
            Referenzprojekte ansehen
            <span className="text-hoser-gold">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
