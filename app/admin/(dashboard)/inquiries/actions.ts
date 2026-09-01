"use server";

import { auth } from "@/lib/auth";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateInquiryStatusAction(id: string, status: "new" | "contacted" | "closed") {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  await query(`update inquiries set status = $2 where id = $1`, [id, status]);
  revalidatePath("/admin/inquiries");
}
