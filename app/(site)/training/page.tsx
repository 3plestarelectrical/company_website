import ContactForm from "@/components/ContactForm";

export default function TrainingPage() {
  return (
    <main className="container">
      <h1>Training Programs</h1>
      <div className="grid-2">
        <div className="card">
          <h2>Basic Electrical Wiring</h2>
          <p>1 week training</p>
          <p>2 weeks training</p>
          <p>4 weeks training</p>
          <p>3 months training</p>
          <ul>
            <li>Tools, cables, and standards</li>
            <li>Lighting &amp; socket circuits</li>
            <li>Protection devices and testing</li>
          </ul>
          <a className="btn" href="#apply">Apply Now</a>
        </div>
        <div className="card">
          <h2>Solar Installation Training</h2>
          <p>1 week training</p>
          <p>2 weeks training</p>
          <p>4 weeks training</p>
          <p>3 months training</p>
          <ul>
            <li>System sizing, MPPT, stringing</li>
            <li>Battery chemistries &amp; BMS</li>
            <li>Commissioning &amp; maintenance</li>
          </ul>
          <a className="btn" href="#apply">Apply Now</a>
        </div>
      </div>

      <section id="apply" className="service-block">
        <h2>Application Form</h2>
        <ContactForm type="training" />
      </section>
    </main>
  );
}
