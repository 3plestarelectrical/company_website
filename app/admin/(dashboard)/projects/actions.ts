"use server";

import { auth } from "@/lib/auth";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export type ProjectInput = {
  id?: string;
  title: string;
  description: string;
  image_urls: string[];
  featured: boolean;
  active: boolean;
};

export async function saveProjectAction(input: ProjectInput) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  if (!input.image_urls || input.image_urls.length === 0) {
    throw new Error("At least one photo is required for a project entry");
  }

  if (input.id) {
    await query(
      `update projects set title=$2, description=$3, image_urls=$4, featured=$5, active=$6, updated_at=now()
       where id=$1`,
      [input.id, input.title, input.description, input.image_urls, input.featured, input.active]
    );
  } else {
    await query(
      `insert into projects (title, description, image_urls, featured, active)
       values ($1, $2, $3, $4, $5)`,
      [input.title, input.description, input.image_urls, input.featured, input.active]
    );
  }

  revalidatePath("/admin/projects");
  revalidatePath("/work");
  revalidatePath("/");
}

export async function deleteProjectAction(id: string) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  await query(`delete from projects where id = $1`, [id]);
  revalidatePath("/admin/projects");
  revalidatePath("/work");
  revalidatePath("/");
}