"use client";

import React from "react";

const testimonials = [
  {
    quote: "Dank Mustafa und seinem Team war die Sanierung unserer Wohnung im Olympiadorf in München eine super Erfahrung und für mich als Architektin eine tolle Zusammenarbeit.",
    name: "F. B.",
    role: "Architektin, München · Google ★★★★★",
    initials: "FB",
  },
  {
    quote: "Nach über zehn Jahren ohne Renovierung war die Zeit reif. Das Ergebnis hat alle Erwartungen übertroffen. Sehr empfehlenswert!",
    name: "Marion Robisch",
    role: "Kundin · Google ★★★★★",
    initials: "MR",
  },
  {
    quote: "Wir haben unser Dachgeschoss ausbauen lassen und wurden beim Trockenbau, Innenausbau und den Malerarbeiten hervorragend und freundlich begleitet.",
    name: "Jones Bein",
    role: "Kunde · Google ★★★★★",
    initials: "JB",
  },
];

export function Testimonial3() {
  return (
    <section className="bg-background-alternative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-xl text-center md:mb-18 lg:mb-20">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-hoser-gold">
            Referenzen
          </p>
          <h2 className="mb-4 font-heading text-5xl font-bold leading-tight tracking-tight text-text-alternative md:text-7xl lg:text-8xl">
            Echte Kunden
          </h2>
          <p className="font-body text-base text-text-alternative/70 md:text-lg">
            Sie haben uns vertraut. Hier ist, was sie sagen.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col border border-border-alternative p-8 transition-colors duration-300 hover:border-hoser-gold"
            >
              <div className="mb-6 text-hoser-gold text-4xl leading-none font-heading">"</div>
              <blockquote className="mb-8 flex-1 font-body text-base font-medium leading-relaxed text-text-alternative/90 md:text-lg">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center bg-hoser-gold font-heading text-sm font-bold tracking-wide text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="font-heading text-sm font-bold tracking-wide text-text-alternative">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-text-alternative/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
