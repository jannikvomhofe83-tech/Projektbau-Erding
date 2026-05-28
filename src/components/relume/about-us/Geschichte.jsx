"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Hammer, Star, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "Die Idee",
    title: "Ein Traum entsteht",
    desc: "Mustafa gründet Projektbau-Erding mit einer klaren Vision: Trockenbau und Altbausanierung auf höchstem Niveau – zuverlässig, ehrlich und sauber.",
    detail: "Von Anfang an steht Mustafa persönlich für jeden Auftrag. Ob kleine Reparatur oder große Sanierung – er ist flexibel und nimmt jeden Kunden ernst.",
    Icon: Lightbulb,
  },
  {
    year: "Die Arbeit",
    title: "Fachbetrieb & Spezialisierung",
    desc: "Projektbau-Erding spezialisiert sich auf Trockenbau, Altbausanierung, Innenausbau und Malerarbeiten. Das Leistungsspektrum wächst mit den Kundenanforderungen.",
    detail: "Dank persönlichem Einsatz und fachgerechter Ausführung entstehen die ersten begeisterten Stammkunden – die Basis für eine starke Empfehlungskultur.",
    Icon: Hammer,
  },
  {
    year: "Die Anerkennung",
    title: "Über 5.000 Bewertungen",
    desc: "Auf My-Hammer erreicht Projektbau-Erding über 5.012 Bewertungen von zufriedenen Kunden. Gleichzeitig wächst die Google-Bewertung auf 5 von 5 Sternen.",
    detail: "Die Kundenstimmen sprechen für sich: professionelle Ausführung, freundliches Auftreten und herausragende Sauberkeit sind die häufigsten Lobpunkte.",
    Icon: Star,
  },
  {
    year: "Heute",
    title: "Ihr Traumpartner",
    desc: "Projektbau-Erding ist rund um die Uhr erreichbar und steht für jedes Projekt bereit – von der Wohnungssanierung bis zur Fassadenrenovierung.",
    detail: "Mustafa und sein Team freuen sich auf Ihre Anfrage. Kostenloses Angebot, persönliche Beratung und meisterhafte Ausführung sind garantiert.",
    Icon: Handshake,
  },
];

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

export function Geschichte() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const dotRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading intro: eyebrow + word-reveal heading + subtitle ────────
      gsap.set(eyebrowRef.current, { y: 22, opacity: 0 });
      const headingWords = headingRef.current
        ? splitWords(headingRef.current, "Unsere Geschichte")
        : [];
      gsap.set(headingWords, { yPercent: 110 });
      gsap.set(subRef.current, { y: 22, opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        defaults: { force3D: true },
      })
        .to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .to(headingWords, { yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.07 }, "-=0.35")
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5");

      // Gold thread grows from top to bottom as timeline scrolls into view
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 1.2,
          },
        }
      );

      // Each dot pops in when the line reaches it
      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: dot,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Each milestone card slides in from the right
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f0f0ef] overflow-hidden">

      {/* Top third — image background with heading */}
      <div
        className="relative px-[5%] py-16 md:py-24 lg:py-28"
        style={{
          backgroundImage: "url('/images/geschichte-mauerwerk.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        {/* Overlay so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(240,240,239,0.82) 0%, rgba(240,240,239,0.92) 60%, rgba(240,240,239,1) 100%)",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
              Seit Jahren
            </p>
            <h2
              ref={headingRef}
              className="mb-5 font-heading font-bold leading-tight tracking-tight text-[#0a1020]"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Unsere Geschichte
            </h2>
            <p ref={subRef} className="font-body text-base leading-relaxed text-[#0a1020]/55">
              Ehrlichkeit. Sauberkeit. Zuverlässigkeit.<br />Das sind die Werte, die uns antreiben.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom two thirds — timeline on plain background */}
      <div className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="container">

          {/* Timeline */}
        <div ref={timelineRef} className="relative">

          {/* Red thread — full height, grows with scroll */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: "18px",
              width: "12px",
              background: "linear-gradient(to right, rgba(70,55,15,0.25) 0%, #e0dfdc 30%, #e8e7e4 50%, #e0dfdc 70%, rgba(70,55,15,0.15) 100%)",
              borderRadius: "6px",
            }}
          >
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{
                borderRadius: "6px",
                background: "linear-gradient(to right, rgba(90,72,20,0.8) 0%, #C9A84C 25%, #E0BE6E 50%, #C9A84C 75%, rgba(90,72,20,0.8) 100%)",
                boxShadow: "2px 0 8px rgba(201,168,76,0.45), -1px 0 4px rgba(0,0,0,0.15)",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* Milestones */}
          <div>
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="relative grid grid-cols-[48px_1fr] pb-14 last:pb-0"
              >
                {/* Dot on the thread — 3D sphere */}
                <div className="flex justify-center pt-2 z-10">
                  <div
                    ref={(el) => (dotRefs.current[i] = el)}
                    className="flex-shrink-0"
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle at 35% 32%, #E8C77A, #C9A84C 48%, #7A6320 100%)",
                      boxShadow: "0 0 0 3px #f0f0ef, 0 0 0 5px rgba(201,168,76,0.5), 2px 3px 8px rgba(0,0,0,0.3)",
                      opacity: 0,
                      transform: "scale(0)",
                    }}
                  />
                </div>

                {/* Milestone content */}
                <div
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="pl-8 md:pl-12 grid gap-8 md:grid-cols-[1fr_280px] md:gap-10 md:items-start"
                  style={{ opacity: 0 }}
                >
                  <div>
                    {/* Year + number */}
                    <div className="flex items-baseline gap-4 mb-3">
                      <span
                        className="font-heading font-bold leading-none text-[#0a1020]/[0.07] select-none"
                        style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)" }}
                      >
                        {m.year}
                      </span>
                      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mb-3 font-heading text-2xl font-bold text-[#0a1020] md:text-3xl">
                      {m.title}
                    </h3>
                    <p className="mb-2 font-body text-base leading-relaxed text-[#0a1020]/65 max-w-2xl">
                      {m.desc}
                    </p>
                    <p className="font-body text-sm leading-relaxed text-[#0a1020]/40 max-w-xl">
                      {m.detail}
                    </p>
                  </div>

                  {/* Milestone icon */}
                  <div className="flex items-center justify-center aspect-[4/3] rounded-sm border border-[#C9A84C]/25 bg-[#f8f7f4]">
                    <m.Icon size={56} strokeWidth={1.2} color="#C9A84C" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          </div>{/* end timeline relative */}
        </div>{/* end container */}
      </div>{/* end bottom section */}
    </section>
  );
}
