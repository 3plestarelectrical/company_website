import { listActiveProjects } from "@/lib/projects";

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await listActiveProjects();

  return (
    <main className="container">
      <h1>Our Work</h1>
      <p className="muted">A look at recent installations and jobs completed by our team.</p>

      {projects.length === 0 ? (
        <p className="muted">Photos coming soon.</p>
      ) : (
        <div className="gallery-grid">
          {projects.map((p) => (
            <figure key={p.id} className="gallery-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image_url} alt={p.title} />
              <figcaption>
                <strong>{p.title}</strong>
                {p.description && <p>{p.description}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </main>
  );
}
