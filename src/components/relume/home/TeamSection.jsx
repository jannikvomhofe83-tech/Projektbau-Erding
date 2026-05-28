"use client";

const mustafa = {
  num: "01",
  name: "Mustafa",
  title: "Inhaber & Fachmann",
  role: "Geschäftsführer",
  email: "info@projektbau-erding.de",
  bio: "Mustafa ist Inhaber und Kopf von Projektbau-Erding. Als Fachbetrieb für Trockenbau und Altbausanierung legt er besonderen Wert auf fachgerechte Arbeit, Ehrlichkeit und Sauberkeit. Er steht persönlich für jeden Auftrag – ob klein oder groß.",
  facts: [
    { label: "Spezialisierung", value: "Trockenbau & Altbausanierung" },
    { label: "Erreichbarkeit", value: "Rund um die Uhr" },
    { label: "Standort", value: "Erding, Bayern" },
  ],
};

export function TeamSection() {
  return (
    <section className="bg-white py-24 md:py-32 px-[5%]">
      <div className="container max-w-2xl">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-hoser-gold">
          {mustafa.num} · Geschäftsführung
        </p>
        <h2
          className="mb-2 font-heading font-bold leading-tight tracking-tight text-[#08111F]"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
        >
          {mustafa.name}
        </h2>
        <p className="mb-8 font-body text-sm uppercase tracking-[0.15em] text-[#08111F]/40">
          {mustafa.title} · {mustafa.role}
        </p>
        <div className="mb-8 h-px w-12 bg-hoser-gold/50" />
        <p className="mb-10 font-body text-sm leading-relaxed text-[#08111F]/55 md:text-base">
          {mustafa.bio}
        </p>
        <div className="mb-10 space-y-4">
          {mustafa.facts.map((f) => (
            <div key={f.label} className="flex items-baseline gap-4">
              <span className="w-28 shrink-0 font-body text-xs font-semibold uppercase tracking-[0.15em] text-hoser-gold/70">
                {f.label}
              </span>
              <span className="font-body text-sm text-[#08111F]/70">{f.value}</span>
            </div>
          ))}
        </div>
        <a
          href={`mailto:${mustafa.email}`}
          className="inline-flex items-center gap-2 font-body text-xs text-[#08111F]/30 transition-colors duration-200 hover:text-hoser-gold"
        >
          {mustafa.email}
        </a>
      </div>
    </section>
  );
}
