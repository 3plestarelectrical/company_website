"use server";

import { query } from "@/lib/db";
import { notifyNewInquiry } from "@/lib/email";

export type InquiryFormState = {
  success: boolean;
  error?: string;
};

const MIN_SUBMIT_TIME_MS = 1500;

export async function submitInquiryAction(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const honeypot = String(formData.get("company_website") || "").trim();
  if (honeypot) {
    return { success: true };
  }

  const renderedAt = Number(formData.get("form_rendered_at") || 0);
  if (renderedAt && Date.now() - renderedAt < MIN_SUBMIT_TIME_MS) {
    return { success: true };
  }

  const name = String(formData.get("name") || "").trim();
  const contact = String(formData.get("email") || formData.get("phone") || "").trim();
  const type = String(formData.get("type") || "quote");
  const program = String(formData.get("program") || "").trim();
  const rawMessage = String(formData.get("message") || "").trim();
  const message = program ? `Program: ${program}\n\n${rawMessage}` : rawMessage;

  if (!name || !contact) {
    return { success: false, error: "Name and contact details are required." };
  }

  await query(
    `insert into inquiries (name, contact, type, message) values ($1, $2, $3, $4)`,
    [name, contact, type, message]
  );

  await notifyNewInquiry({ name, contact, type, message });

  return { success: true };
}