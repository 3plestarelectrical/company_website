"use server";

import { query } from "@/lib/db";
import { notifyNewInquiry } from "@/lib/email";

export type InquiryFormState = {
  success: boolean;
  error?: string;
};

export async function submitInquiryAction(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const name = String(formData.get("name") || "").trim();
  const contact = String(formData.get("email") || formData.get("phone") || "").trim();
  const type = String(formData.get("type") || "quote");
  const message = String(formData.get("message") || "").trim();

  if (!name || !contact) {
    return { success: false, error: "Name and contact details are required." };
  }

  // Save first — this is the step that must never silently fail, unlike the
  // old contact.php which relied on PHP mail() alone and doesn't run on Vercel.
  await query(
    `insert into inquiries (name, contact, type, message) values ($1, $2, $3, $4)`,
    [name, contact, type, message]
  );

  // Email is best-effort notification on top of the saved record, not the
  // source of truth — see notifyNewInquiry's internal error handling.
  await notifyNewInquiry({ name, contact, type, message });

  return { success: true };
}
