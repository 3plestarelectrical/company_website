import { query, queryOne } from "@/lib/db";

export type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string | null;
  category: string | null;
  image_urls: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
};

export async function listProducts(): Promise<ProductRow[]> {
  return query<ProductRow>(`select * from products order by created_at desc`);
}

export async function listActiveProducts(): Promise<ProductRow[]> {
  return query<ProductRow>(
    `select * from products where active = true order by created_at desc`
  );
}

export async function getProduct(id: string): Promise<ProductRow | null> {
  return queryOne<ProductRow>(`select * from products where id = $1`, [id]);
}

export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  return queryOne<ProductRow>(
    `select * from products where slug = $1 and active = true`,
    [slug]
  );
}
