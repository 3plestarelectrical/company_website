import Link from "next/link";
import { listFeaturedProjects } from "@/lib/projects";
import WorkCarousel from "@/components/WorkCarousel";
import Image from "next/image";

export const revalidate = 60;

export default async function HomePage() {
  const featuredProjects = await listFeaturedProjects();

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>Smart Solar &amp; Electrical Solutions</h1>
            <p>
              We design, install, and maintain <strong>solar systems</strong>, execute safe{" "}
              <strong>house wiring</strong>, supply quality <strong>tools</strong>, and train the
              next generation of technicians.
            </p>
            <div className="cta">
              <Link className="btn" href="/services">Explore Services</Link>
              <Link className="btn-outline" href="/training">Join a Training</Link>
            </div>
            <div className="trust">
              <span>✅ Certified Technicians</span>
              <span>⚡ Fast Response</span>
              <span>🔋 Quality Components</span>
            </div>
          </div>
          <div className="hero-art">
  <Image
    src="/images/ggg.jpg"
    alt="logo"
    fill
    style={{ objectFit: "cover", borderRadius: "1.5rem" }}
    priority
  />
</div>
        </div>
      </section>

      <section className="highlights container grid-3">
        <div className="card">
          <h3>Solar Installations</h3>
          <p>Off-grid, on-grid, and hybrid systems sized for homes, SMEs, and estates.</p>
          <Link href="/services#solar" className="link">Learn more →</Link>
        </div>
        <div className="card">
          <h3>House Wiring</h3>
          <p>New builds, rewiring, fault tracing, earthing, and compliance testing.</p>
          <Link href="/services#wiring" className="link">Learn more →</Link>
        </div>
        <div className="card">
          <h3>Training &amp; Tools</h3>
          <p>Hands-on courses plus sales of panels, batteries, inverters, and accessories.</p>
          <Link href="/training" className="link">Learn more →</Link>
        </div>
      </section>

      <WorkCarousel projects={featuredProjects} />

      <section className="cta-wide">
        <div className="container">
          <h2>Need a quote in 24 hours?</h2>
          <p>Send us your load list or house plan. We will size your system and respond fast.</p>
          <a className="btn" href="https://wa.me/2348061975051" target="_blank" rel="noopener">
            WhatsApp Us
          </a>
        </div>
      </section>
    </>
  );
}
