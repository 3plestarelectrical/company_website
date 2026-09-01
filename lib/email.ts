import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function notifyNewInquiry(inquiry: {
  name: string;
  contact: string;
  type: string;
  message: string;
}) {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) {
    console.warn("NOTIFY_EMAIL not set — skipping email notification");
    return;
  }

  try {
    await resend.emails.send({
      from: "3ple Star Website <onboarding@resend.dev>", // swap for a verified domain sender later
      to,
      subject: `New ${inquiry.type} inquiry from ${inquiry.name}`,
      text: `Name: ${inquiry.name}\nContact: ${inquiry.contact}\nType: ${inquiry.type}\n\n${inquiry.message}`,
    });
  } catch (err) {
    // Deliberately non-fatal: the inquiry is already saved in Postgres by the
    // time this runs, so an email failure must never look like a lost lead.
    console.error("Failed to send inquiry notification email:", err);
  }
}
