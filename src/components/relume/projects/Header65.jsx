"use client";

import React from "react";

export function Header65() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28 bg-[#f0f0ef]">
      <div className="container relative z-10 max-w-lg text-center">
        <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold md:mb-4">
          Referenzprojekte
        </p>
        <h1 className="mb-5 text-6xl font-bold text-[#08111F] md:mb-6 md:text-9xl lg:text-10xl">
          Unsere Projekte
        </h1>
        <p className="text-[#08111F]/70 md:text-md">
          Trockenbau, Altbausanierung und Innenausbau im Raum Erding und München.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
          <a
            href="#projekte"
            className="inline-flex items-center bg-hoser-gold px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity duration-200 hover:opacity-85"
          >
            Projekte entdecken
          </a>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 border border-[#08111F]/30 px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-[#08111F] transition-colors duration-200 hover:border-hoser-gold hover:text-hoser-gold"
          >
            Beratung anfragen
          </a>
        </div>
      </div>
    </section>
  );
}
