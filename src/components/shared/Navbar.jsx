"use client";

import { useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import React, { useState } from "react";

const HOUSE_PATH = "M6 20L24 6L42 20V42H30V30H18V42H6V20Z";

const navLinks = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Projekte", href: "/projekte" },
  {
    label: "Über uns",
    href: "/ueber-uns",
    children: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Jobs", href: "/ueber-uns#jobs" },
    ],
  },
  { label: "Prozess", href: "/prozess" },
];

function DropdownLink({ link, active }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleChildClick(e, child) {
    setOpen(false);
    if (!child.href.includes("#")) return;
    e.preventDefault();
    const [path, hash] = child.href.split("#");
    const scrollToEl = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    if (pathname === path) {
      scrollToEl();
    } else {
      navigate(path);
      setTimeout(scrollToEl, 120);
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={link.href}
        className={clsx(
          "relative flex items-center gap-1 text-sm font-medium tracking-wide transition-all duration-200",
          active
            ? "text-hoser-gold opacity-100"
            : "text-[#08111F] opacity-70 hover:opacity-100 hover:text-hoser-gold"
        )}
      >
        {link.label}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="mt-[1px] opacity-60">
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-[1.5px] left-0 right-0 h-px bg-hoser-gold"
          />
        )}
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full pt-2 z-50"
          >
            <div className="min-w-[160px] border border-[#0a1020]/12 bg-[#f5f4f1] shadow-xl py-1">
              {link.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  onClick={(e) => handleChildClick(e, child)}
                  className="block px-5 py-3 text-sm font-medium text-[#0a1020] transition-colors duration-150 hover:text-hoser-gold hover:bg-hoser-gold/8"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const { pathname } = useLocation();
  const toggle = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#E8ECF0] bg-white/95 backdrop-blur-md">
      <div className="grid h-auto min-h-[4.5rem] grid-cols-[1fr_max-content_1fr] items-center px-[5%]">

        {/* Left: hamburger (mobile) or nav links (desktop) */}
        <div className="flex items-center">
          <button
            className="flex size-10 flex-col justify-center gap-[5px] lg:hidden"
            onClick={toggle}
            aria-label="Navigation öffnen"
          >
            <motion.span
              className="h-[1.5px] w-6 bg-[#08111F] origin-center block"
              animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
            <motion.span
              className="h-[1.5px] w-6 bg-[#08111F] block"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="h-[1.5px] w-6 bg-[#08111F] origin-center block"
              animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
          </button>

          <div className="hidden lg:flex items-center gap-x-8">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              if (link.children) {
                return (
                  <DropdownLink key={link.href} link={link} active={active} />
                );
              }
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={clsx(
                    "relative text-sm font-medium tracking-wide transition-all duration-200",
                    active
                      ? "text-hoser-gold opacity-100"
                      : "text-[#08111F] opacity-70 hover:opacity-100 hover:text-hoser-gold"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-[1.5px] left-0 right-0 h-px bg-hoser-gold"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Center: logo */}
        <Link to="/" className="flex items-center justify-center gap-2 py-4">
          <svg viewBox="0 0 48 48" fill="none" className="shrink-0" style={{ width: 20, height: 20 }}>
            <path
              d={HOUSE_PATH}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              className="text-[#08111F]"
            />
          </svg>
          <span className="font-heading text-xl font-bold tracking-[0.08em] text-[#08111F] uppercase">
            Projektbau
          </span>
          <span className="font-heading text-[0.62rem] font-semibold tracking-[0.18em] text-[#6B82A0] uppercase self-end pb-[3px]">
            Erding
          </span>
        </Link>

        {/* Right: Kontakt link + phone CTA */}
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/kontakt"
            className={clsx(
              "hidden lg:inline-flex items-center px-5 py-2 font-body text-sm font-medium tracking-wide transition-colors duration-200 border",
              pathname === "/kontakt"
                ? "border-hoser-gold text-hoser-gold"
                : "border-[#E8ECF0] text-[#08111F] hover:border-hoser-gold hover:text-hoser-gold"
            )}
          >
            Kontakt
          </Link>
          <a
            href="tel:+4917683039047"
            className="hidden sm:inline-flex items-center gap-2 border border-[#E8ECF0] px-5 py-2 font-body text-sm font-medium tracking-wide text-[#08111F] transition-colors duration-200 hover:border-hoser-gold hover:text-hoser-gold"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
            </svg>
            0176 83039047
          </a>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={toggle}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", duration: 0.45, bounce: 0 }}
              className={clsx(
                "fixed left-0 top-0 z-50 flex h-dvh w-[85%] max-w-sm flex-col",
                "bg-white border-r border-[#E8ECF0] shadow-xlarge px-8 pb-10"
              )}
            >
              <div className="flex items-center justify-between py-5 mb-8 border-b border-[#E8ECF0]">
                <span className="font-heading text-xl font-bold tracking-[0.12em] uppercase text-[#08111F]">
                  Projektbau-Erding
                </span>
                <button onClick={toggle} className="size-8 flex items-center justify-center text-[#08111F] text-2xl leading-none">
                  ×
                </button>
              </div>
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <React.Fragment key={link.href}>
                    <Link
                      to={link.href}
                      onClick={toggle}
                      className={clsx(
                        "py-4 text-base font-medium border-b border-[#E8ECF0] transition-all duration-200",
                        pathname === link.href
                          ? "text-hoser-gold pl-2"
                          : "text-[#08111F] hover:text-hoser-gold hover:pl-2"
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children?.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={toggle}
                        className={clsx(
                          "py-3 pl-6 text-sm font-medium border-b border-[#E8ECF0]/50 transition-all duration-200",
                          pathname === child.href
                            ? "text-hoser-gold"
                            : "text-[#6B82A0] hover:text-hoser-gold"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </React.Fragment>
                ))}
              </nav>
              <div className="mt-auto pt-8">
                <Link
                  to="/kontakt"
                  onClick={toggle}
                  className="flex w-full items-center justify-center bg-hoser-gold px-6 py-3 text-sm font-semibold tracking-wide text-white hover:opacity-90 transition-opacity duration-200"
                >
                  Beratung anfragen
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
