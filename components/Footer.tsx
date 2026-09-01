import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container grid-3">
        <div>
          <h4>3ple Star Electrical Technology</h4>
          <p>Powering your world with reliable solar and electrical solutions.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/training">Training</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/catalog">Catalog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Reach Us</h4>
          <p>
            Phone/WhatsApp:{" "}
            <a href="https://wa.me/2348061975051" target="_blank" rel="noopener">
              +234 80 6197 5051
            </a>
          </p>
          <p>Email: info@3plestarelectrical.com</p>
          <p>Location: No. 127 Rimin doko Kaura Zaria city, Kaduna State, Nigeria</p>
        </div>
      </div>
      <div className="copyright">
        © 3ple Star Electrical Technology {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  );
}
