import { query, queryOne } from "@/lib/db";

export type ProjectRow = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export async function listProjects(): Promise<ProjectRow[]> {
  return query<ProjectRow>(`select * from projects order by created_at desc`);
}

export async function listActiveProjects(): Promise<ProjectRow[]> {
  return query<ProjectRow>(
    `select * from projects where active = true order by created_at desc`
  );
}

export async function listFeaturedProjects(limit = 8): Promise<ProjectRow[]> {
  return query<ProjectRow>(
    `select * from projects where active = true and featured = true order by created_at desc limit $1`,
    [limit]
  );
}

export async function getProject(id: string): Promise<ProjectRow | null> {
  return queryOne<ProjectRow>(`select * from projects where id = $1`, [id]);
}
