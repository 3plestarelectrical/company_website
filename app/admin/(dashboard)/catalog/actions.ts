"use server";

import { auth } from "@/lib/auth";
import { query } from "@/lib/db";
import { slugify } from "@/lib/blocks";
import { revalidatePath } from "next/cache";

export type ProductInput = {
  id?: string;
  name: string;
  description: string;
  price: string;
  category: string;
  active: boolean;
};

export async function saveProductAction(input: ProductInput) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const price = input.price ? Number(input.price) : null;

  if (input.id) {
    await query(
      `update products set name=$2, description=$3, price=$4, category=$5, active=$6, updated_at=now()
       where id=$1`,
      [input.id, input.name, input.description, price, input.category, input.active]
    );
  } else {
    const slug = slugify(input.name) || `product-${Date.now()}`;
    await query(
      `insert into products (name, slug, description, price, category, active)
       values ($1, $2, $3, $4, $5, $6)`,
      [input.name, slug, input.description, price, input.category, input.active]
    );
  }

  revalidatePath("/admin/catalog");
  revalidatePath("/catalog");
}

export async function deleteProductAction(id: string) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  await query(`delete from products where id = $1`, [id]);
  revalidatePath("/admin/catalog");
  revalidatePath("/catalog");
}
