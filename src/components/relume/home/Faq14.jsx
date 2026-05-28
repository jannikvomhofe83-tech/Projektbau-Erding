"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slideshowImages = [
  "/images/hero-bild1.png",
  "/images/hero-bild2.png",
  "/images/bild5.png",
  "/images/bild6.png",
  "/images/bild7.png",
  "/images/bild8.png",
  "/images/bild9.png",
];

const faqs = [
  {
    q: "Welche Leistungen bietet Projektbau-Erding an?",
    a: "Wir sind Fachbetrieb für Trockenbau und Altbausanierung. Dazu gehören Innenausbau, Malerarbeiten, Fassadenrenovierung und Dachgeschossausbau – ob kleine oder große Aufträge, wir sind flexibel.",
    image: "/images/craftsmen-stone-facade.jpg",
  },
  {
    q: "Bieten Sie auch kostenlose Angebote an?",
    a: "Ja, selbstverständlich. Lassen Sie sich von uns ein kostenloses Angebot erstellen – wir beraten Sie gerne und melden uns schnellstmöglich.",
    image: "/images/villa-twilight.jpg",
  },
  {
    q: "Welche Regionen betreuen Sie?",
    a: "Unser Schwerpunkt liegt im Raum Erding und München. Wir sind flexibel und kommen auch für größere Projekte weiter in der Region.",
    image: "/images/munich-residential.jpg",
  },
  {
    q: "Wie sind Ihre Öffnungszeiten?",
    a: "Wir sind rund um die Uhr erreichbar – 24/7. Rufen Sie uns einfach an oder schreiben Sie uns, wir antworten schnellstmöglich.",
    image: "/images/team-blueprints.jpg",
  },
  {
    q: "Können Sie auch Wohnungssanierungen übernehmen?",
    a: "Ja. Wir haben Erfahrung in der Komplettsanierung von Wohnungen – wie zum Beispiel die Sanierung im Olympiadorf München. Ehrlichkeit und Sauberkeit stehen bei uns an erster Stelle.",
    image: "/images/interior-oak-concrete.jpg",
  },
  {
    q: "Wie nehme ich Kontakt auf?",
    a: "Rufen Sie uns an unter 0176 83039047 oder schreiben Sie uns an info@projektbau-erding.de. Wir freuen uns auf Ihre Anfrage.",
    image: "/images/villa-twilight.jpg",
  },
];

const EASE = [0.76, 0, 0.24, 1];

function FaqItem({ faq, index, isOpen, onToggle, onEnter, onLeave }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`group relative border-b transition-colors duration-300 ${
        isOpen ? "border-hoser-gold/40" : "border-[#08111F]/10"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Gold left accent */}
      <motion.div
        className="absolute left-0 top-0 w-px bg-hoser-gold"
        style={{ height: "100%", transformOrigin: "top" }}
        animate={{ scaleY: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />

      <button
        className="flex w-full items-start gap-6 py-7 text-left"
        onClick={onToggle}
      >
        {/* Ghost number */}
        <span
          className={`shrink-0 font-heading font-bold leading-none transition-colors duration-300 ${
            isOpen ? "text-hoser-gold/40" : "text-[#08111F]/8 group-hover:text-[#08111F]/15"
          }`}
          style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)", lineHeight: 1 }}
        >
          {num}
        </span>

        {/* Question */}
        <span
          className={`flex-1 font-heading text-base font-bold leading-snug tracking-tight transition-colors duration-300 md:text-lg lg:text-xl ${
            isOpen ? "text-[#08111F]" : "text-[#08111F]/65 group-hover:text-[#08111F]"
          }`}
        >
          {faq.q}
        </span>

        {/* Toggle */}
        <span
          className={`mt-1 shrink-0 font-light leading-none transition-all duration-300 ${
            isOpen ? "rotate-45 text-hoser-gold" : "text-[#08111F]/35 group-hover:text-hoser-gold"
          }`}
          style={{ fontSize: "1.5rem" }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-7 pl-[calc(clamp(1.8rem,2.8vw,2.8rem)+1.5rem)] font-body text-sm leading-relaxed text-[#08111F]/55 md:text-base">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq14() {
  const [openIdx, setOpenIdx] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));
  const activeIdx = hoverIdx ?? openIdx ?? 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % slideshowImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="grid lg:grid-cols-[1fr_1.15fr]">

        {/* ── Left: Sticky image panel ── */}
        <div className="relative hidden overflow-hidden lg:sticky lg:top-0 lg:block lg:h-screen">

          {/* Slideshow: alle Bilder aus dem Bilder-Ordner */}
          {slideshowImages.map((src, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ opacity: slideIdx === i ? 1 : 0 }}
              transition={{ duration: 1.0, ease: EASE }}
            >
              <motion.img
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                animate={{ scale: slideIdx === i ? 1.05 : 1 }}
                transition={{ duration: 4, ease: "easeOut" }}
              />
            </motion.div>
          ))}

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-white/30" />

          {/* Subtle grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(8,17,31,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(8,17,31,0.05) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            {/* Top */}
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-hoser-gold/80">
              Projektbau-Erding
            </p>

            {/* Bottom */}
            <div>
              <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
                FAQ
              </p>
              <h2
                className="font-heading font-bold leading-[1.05] tracking-tight text-[#08111F]"
                style={{ fontSize: "clamp(2.6rem, 4vw, 4.8rem)" }}
              >
                Häufige<br />Fragen
              </h2>
              <div className="mt-6 h-px w-10 bg-hoser-gold/50" />
              <p className="mt-5 font-body text-sm leading-relaxed text-[#08111F]/45">
                Antworten auf das, was beim<br />Bauen in Bayern am meisten zählt.
              </p>

              {/* Active counter */}
              <div className="mt-10 flex items-center gap-3">
                <motion.span
                  key={activeIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-2xl font-bold tabular-nums text-[#08111F]"
                >
                  {String(activeIdx + 1).padStart(2, "0")}
                </motion.span>
                <span className="font-body text-sm text-[#08111F]/30">/ {String(faqs.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Accordion ── */}
        <div
          className="px-[5%] py-16 md:py-24 lg:px-14 lg:py-28"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,17,31,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(8,17,31,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        >
          {/* Mobile heading */}
          <div className="mb-12 lg:hidden">
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
              FAQ
            </p>
            <h2
              className="mb-5 font-heading font-bold leading-[1.05] tracking-tight text-[#08111F]"
              style={{ fontSize: "clamp(2.4rem, 8vw, 4rem)" }}
            >
              Häufige<br />Fragen
            </h2>
            <div className="h-px w-10 bg-hoser-gold/50" />
          </div>

          {/* Items */}
          <div>
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                index={i}
                isOpen={openIdx === i}
                onToggle={() => toggle(i)}
                onEnter={() => setHoverIdx(i)}
                onLeave={() => setHoverIdx(null)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14">
            <p className="mb-5 font-body text-sm text-[#08111F]/40">
              Noch weitere Fragen?
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-3 border border-[#08111F]/20 px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-[#08111F]/70 transition-all duration-200 hover:border-hoser-gold hover:text-hoser-gold"
            >
              Fragen Sie uns
              <span>→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
