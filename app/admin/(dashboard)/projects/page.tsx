import { listProjects } from "@/lib/projects";
import ProjectManager from "@/components/admin/ProjectManager";

export default async function AdminProjectsPage() {
  const projects = await listProjects();

  return (
    <div className="admin-catalog">
      <h1>Our Work</h1>
      <p className="muted">
        Each entry is one photo with a caption. Mark items &ldquo;Featured&rdquo; to include them
        in the homepage carousel — everything active shows in the full /work gallery regardless.
      </p>
      <ProjectManager initialProjects={projects} />
    </div>
  );
}
