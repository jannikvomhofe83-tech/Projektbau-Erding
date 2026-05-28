"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

export function Contact14() {
  return (
    <section className="bg-[#f0f0ef] px-[5%] pt-10 pb-16 md:pt-14 md:pb-24">
      <div className="container">

        {/* Top row: text left, map right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mb-14 md:mb-20">

          {/* Left: heading + description */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
              Kontakt
            </p>
            <h2
              className="mb-5 font-heading font-bold leading-tight tracking-tight text-[#0a1020]"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Sprechen Sie mit uns.
            </h2>
            <p className="font-body text-base leading-relaxed text-[#0a1020]/60 md:text-lg">
              Wir sind Ihr direkter Ansprechpartner für alle Fragen rund um Ihr Bauvorhaben –
              von der ersten Idee bis zur Fertigstellung.
            </p>
          </div>

          {/* Right: Google Maps */}
          <div className="overflow-hidden rounded-sm" style={{ minHeight: 280 }}>
            <iframe
              title="Projektbau-Erding Standort"
              src="https://maps.google.com/maps?q=Erding%2C+Bayern&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 280 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Bottom row: contact info */}
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-16">
          <div>
            <div className="mb-3 text-hoser-gold md:mb-4">
              <BiPhone className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#0a1020]">
              Telefon
            </h3>
            <p className="mb-2 font-body text-sm text-[#0a1020]/50">
              Mo – Fr, 8:00 – 17:00 Uhr
            </p>
            <a
              className="font-body text-base font-semibold text-[#0a1020] transition-colors duration-200 hover:text-hoser-gold"
              href="tel:+4917683039047"
            >
              0176 83039047
            </a>
          </div>

          <div>
            <div className="mb-3 text-hoser-gold md:mb-4">
              <BiEnvelope className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#0a1020]">
              E-Mail
            </h3>
            <p className="mb-2 font-body text-sm text-[#0a1020]/50">
              Projektanfragen und allgemeine Fragen
            </p>
            <a
              className="font-body text-base font-semibold text-[#0a1020] transition-colors duration-200 hover:text-hoser-gold"
              href="mailto:info@projektbau-erding.de"
            >
              info@projektbau-erding.de
            </a>
          </div>

          <div>
            <div className="mb-3 text-hoser-gold md:mb-4">
              <BiMap className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#0a1020]">
              Standort
            </h3>
            <p className="font-body text-base text-[#0a1020]/60">
              Erding, Bayern
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
