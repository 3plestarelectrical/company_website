import ContactForm from "@/components/ContactForm";

export default function ServicesPage() {
  return (
    <main className="container">
      <h1>Our Services</h1>
      <section id="solar" className="service-block">
        <h2>Solar Installations</h2>
        <ul>
          <li>System design and load estimation</li>
          <li>Off‑grid, on‑grid, and hybrid inverters</li>
          <li>Batteries: LiFePO₄, GEL, ETC.</li>
          <li>O&amp;M: cleaning, health checks, upgrades</li>
        </ul>
      </section>
      <section id="wiring" className="service-block">
        <h2>House Wiring &amp; Electrical</h2>
        <ul>
          <li>First/second fix wiring for new builds</li>
          <li>Rewiring, troubleshooting, earthing &amp; SPD</li>
          <li>DB configuration, MCB/RCBO selection</li>
          <li>Safety audits and certification</li>
        </ul>
      </section>
      <section id="sales" className="service-block">
        <h2>Sales of Solar &amp; Electrical Tools</h2>
        <p>Panels, inverters, batteries, MC4, breakers, cables, testers, and more.</p>
      </section>
      <section id="booking" className="service-block">
        <h2>Book a Site Visit</h2>
        <ContactForm type="booking" />
      </section>
    </main>
  );
}
