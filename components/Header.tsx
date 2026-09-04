"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          3<span>ple</span> Star
        </Link>
        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/training" onClick={() => setMenuOpen(false)}>Training</Link>
          <Link href="/work" onClick={() => setMenuOpen(false)}>Our Work</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/catalog" onClick={() => setMenuOpen(false)}>Catalog</Link>
          <Link href="/contact" className="btn" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
        <button
          id="menuToggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="hamburger"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
