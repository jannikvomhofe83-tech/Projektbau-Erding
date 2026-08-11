"use client";

import { Link } from "react-router-dom";

const HOUSE_PATH = "M6 20L24 6L42 20V42H30V30H18V42H6V20Z";

const navCols = [
  {
    heading: "Leistungen",
    links: [
      { label: "Trockenbau", to: "/leistungen" },
      { label: "Altbausanierung", to: "/leistungen" },
      { label: "Innenausbau", to: "/leistungen" },
      { label: "Malerarbeiten", to: "/leistungen" },
      { label: "Fassadenrenovierung", to: "/leistungen" },
      { label: "Dachgeschossausbau", to: "/leistungen" },
    ],
  },
  {
    heading: "Unternehmen",
    links: [
      { label: "Über uns", to: "/ueber-uns" },
      { label: "Unser Prozess", to: "/prozess" },
      { label: "Projekte", to: "/projekte" },
      { label: "Referenzen", to: "/referenzen" },
    ],
  },
  {
    heading: "Kontakt",
    links: [
      { label: "Beratung anfragen", to: "/kontakt" },
      { label: "FAQ", to: "/kontakt" },
      { label: "Auszeichnungen", to: "/auszeichnungen" },
      { label: "Impressum", to: "/impressum" },
      { label: "Datenschutz", to: "/datenschutz" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Gold top accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-hoser-gold/60 to-transparent" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,17,31,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(8,17,31,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 select-none font-heading font-bold leading-none text-[#08111F]"
        style={{ fontSize: "clamp(2.5rem, 6vw, 9rem)", opacity: 0.028, letterSpacing: "-0.02em", lineHeight: 0.85 }}
        aria-hidden="true"
      >
        PROJEKTBAU ERDING
      </div>

      <div className="container relative px-[5%] pt-16 pb-10 md:pt-24 md:pb-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-16 mb-16 border-b border-[#08111F]/8 pb-16">

          {/* Brand column */}
          <div>
            <Link to="/" className="mb-6 flex items-center gap-2.5">
              <svg viewBox="0 0 48 48" fill="none" style={{ width: 22, height: 22, flexShrink: 0 }}>
                <path
                  d={HOUSE_PATH}
                  stroke="#08111F"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span className="font-heading text-lg font-bold tracking-[0.1em] uppercase text-[#08111F]">
                Projektbau
              </span>
              <span className="font-heading text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-[#08111F]/50 self-end pb-[2px]">
                Erding
              </span>
            </Link>

            <p className="mb-8 font-body text-sm leading-relaxed text-[#08111F]/45 max-w-[22ch]">
              Fachbetrieb für Trockenbau und Altbausanierung in Erding. Zuverlässig, ehrlich, sauber.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="tel:+4917683039047"
                className="flex items-center gap-3 font-body text-sm text-[#08111F]/55 transition-colors duration-200 hover:text-hoser-gold"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                </svg>
                0176 83039047
              </a>
              <a
                href="mailto:info@projektbau-erding.de"
                className="flex items-center gap-3 font-body text-sm text-[#08111F]/55 transition-colors duration-200 hover:text-hoser-gold"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                info@projektbau-erding.de
              </a>
              <p className="flex items-start gap-3 font-body text-sm text-[#08111F]/40">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60 mt-0.5">
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Erding · Landkreis Erding
              </p>
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-5 font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#08111F]/40">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-body text-sm text-[#08111F]/60 transition-colors duration-200 hover:text-hoser-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rechtlicher Hinweis Meisterpflicht */}
        <div className="mb-10 border-l-2 border-hoser-gold/40 pl-5 py-1">
          <p className="mb-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-hoser-gold/70">
            Rechtlicher Hinweis · Handwerksordnung (HwO)
          </p>
          <p className="font-body text-xs leading-relaxed text-[#08111F]/40 max-w-3xl">
            Projektbau-Erding führt alle Arbeiten, die als zulassungspflichtiges Handwerk gemäß Anlage A der Handwerksordnung (HwO) eingestuft sind – insbesondere Maler- und Lackierarbeiten – ausschließlich in Kooperation mit zugelassenen Meisterbetrieben aus. Für diese Gewerke arbeiten wir fest mit{" "}
            <span className="text-[#08111F]/60 font-semibold">Malerbetrieb Heiko Günther (Meisterbetrieb)</span>{" "}
            zusammen, der die gesetzlich vorgeschriebene Meisterqualifikation besitzt und die Verantwortung für die fachgerechte Ausführung trägt.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-[#08111F]/40">
            © {new Date().getFullYear()} Projektbau-Erding. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="font-body text-xs text-[#08111F]/40 transition-colors duration-200 hover:text-[#08111F]/80">
              Impressum
            </Link>
            <Link to="/datenschutz" className="font-body text-xs text-[#08111F]/40 transition-colors duration-200 hover:text-[#08111F]/80">
              Datenschutz
            </Link>
          </div>
        </div>

        <p className="mt-4 font-body text-xs text-[#08111F]/40">
          Teile der Inhalte dieser Website wurden mit Unterstützung von KI erstellt.
        </p>
      </div>
    </footer>
  );
}
