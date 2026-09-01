import { auth } from "@/lib/auth";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename");
  if (!filename || !req.body) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const blob = await put(`uploads/${Date.now()}-${filename}`, req.body, {
    access: "public",
  });

  return NextResponse.json({ url: blob.url });
}
