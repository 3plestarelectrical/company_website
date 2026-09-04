"use client";

import { useRef } from "react";
import Link from "next/link";
import type { ProjectRow } from "@/lib/projects";

export default function WorkCarousel({ projects }: { projects: ProjectRow[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8;
    track.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  if (projects.length === 0) return null;

  return (
    <section className="work-carousel container">
      <div className="work-carousel-header">
        <h2>Recent Work</h2>
        <Link href="/work" className="link">
          See all →
        </Link>
      </div>

      <div className="work-carousel-wrap">
        <button
          type="button"
          className="carousel-nav carousel-nav-left"
          aria-label="Scroll left"
          onClick={() => scroll("left")}
        >
          ←
        </button>

        <div className="work-carousel-track" ref={trackRef}>
          {projects.map((p) => (
            <Link href="/work" key={p.id} className="work-carousel-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image_url} alt={p.title} />
              <span className="work-carousel-caption">{p.title}</span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="carousel-nav carousel-nav-right"
          aria-label="Scroll right"
          onClick={() => scroll("right")}
        >
          →
        </button>
      </div>
    </section>
  );
}
