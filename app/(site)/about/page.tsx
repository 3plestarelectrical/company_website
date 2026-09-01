export default function AboutPage() {
  return (
    <main className="container">
      <h1>About Us</h1>
      <p>
        3ple Star Electrical Technology is a Nigerian-owned company delivering dependable solar
        and electrical services. Our mission is to make clean, reliable power accessible, safe,
        and affordable.
      </p>
      <div className="grid-2">
        <div className="card">
          <h3>Why Choose Us</h3>
          <ul>
            <li>Certified and insured technicians</li>
            <li>Top-tier components and neat workmanship</li>
            <li>Transparent pricing and timelines</li>
            <li>After‑sales support and warranty</li>
          </ul>
        </div>
        <div className="card">
          <h3>Coverage</h3>
          <p>We serve clients nationwide with a strong presence in major cities.</p>
          <p>Available for residential, commercial, and industrial projects.</p>
        </div>
      </div>
    </main>
  );
}
