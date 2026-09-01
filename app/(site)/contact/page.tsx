import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="container">
      <h1>Contact Us</h1>
      <div className="grid-2">
        <div>
          <p>
            Call/WhatsApp:{" "}
            <a href="https://wa.me/2348061975051" target="_blank" rel="noopener">
              +234 80 6197 5051
            </a>
          </p>
          <p>Email: info@3plestarelectrical.com</p>
          <p>Address: Nigeria</p>
          <iframe
            title="map"
            className="map"
            src="https://maps.google.com/maps?q=Nigeria&t=&z=5&ie=UTF8&iwloc=&output=embed"
          />
        </div>
        <ContactForm type="quote" />
      </div>
    </main>
  );
}
