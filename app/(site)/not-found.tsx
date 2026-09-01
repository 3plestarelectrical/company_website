import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container" style={{ textAlign: "center", padding: "4rem 0" }}>
      <h1>Page not found</h1>
      <p className="muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <Link href="/" className="btn" style={{ marginTop: "1rem", display: "inline-block" }}>
        Back to Home
      </Link>
    </main>
  );
}
