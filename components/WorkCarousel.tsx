"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import type { ProjectRow } from "@/lib/projects";

const AUTO_SCROLL_INTERVAL_MS = 3500;

export default function WorkCarousel({ projects }: { projects: ProjectRow[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  const scroll = useCallback((direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8;
    track.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || projects.length <= 1) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: track.clientWidth * 0.4, behavior: "smooth" });
      }
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [projects.length]);

  if (projects.length === 0) return null;

  return (
    <section className="work-carousel container">
      <div className="work-carousel-header">
        <h2>Recent Work</h2>
        <Link href="/work" className="link">
          See all →
        </Link>
      </div>

      <div
        className="work-carousel-wrap"
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
        onFocus={() => (isPausedRef.current = true)}
        onBlur={() => (isPausedRef.current = false)}
      >
        <button type="button" className="carousel-nav carousel-nav-left" aria-label="Scroll left" onClick={() => scroll("left")}>
          ←
        </button>

        <div className="work-carousel-track" ref={trackRef}>
          {projects.map((p) => (
            <Link href="/work" key={p.id} className="work-carousel-item">
              {p.image_urls?.[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image_urls[0]} alt={p.title} />
              )}
              <span className="work-carousel-caption">{p.title}</span>
            </Link>
          ))}
        </div>

        <button type="button" className="carousel-nav carousel-nav-right" aria-label="Scroll right" onClick={() => scroll("right")}>
          →
        </button>
      </div>
    </section>
  );
}