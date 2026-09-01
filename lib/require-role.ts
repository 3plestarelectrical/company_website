import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireRole(role: "owner" | "developer") {
  const session = await auth();
  const sessionRole = (session?.user as { role?: string } | undefined)?.role;
  if (!session || sessionRole !== role) {
    redirect("/admin");
  }
  return session;
}
