import { Resend } from "resend";

export async function notifyNewInquiry(inquiry: {
  name: string;
  contact: string;
  type: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;

  if (!apiKey || !to) {
    console.warn("RESEND_API_KEY or NOTIFY_EMAIL not set — skipping email notification");
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "3ple Star Website <onboarding@resend.dev>",
      to,
      subject: `New ${inquiry.type} inquiry from ${inquiry.name}`,
      text: `Name: ${inquiry.name}\nContact: ${inquiry.contact}\nType: ${inquiry.type}\n\n${inquiry.message}`,
    });
  } catch (err) {
    console.error("Failed to send inquiry notification email:", err);
  }
}