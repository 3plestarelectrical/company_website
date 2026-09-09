"use client";

import { useActionState, useState } from "react";
import { submitInquiryAction, type InquiryFormState } from "@/app/(site)/contact/actions";

const initialState: InquiryFormState = { success: false };

type Props = {
  type: "booking" | "quote" | "training";
  showPhone?: boolean;
};

export default function ContactForm({ type, showPhone = true }: Props) {
  const [state, formAction, isPending] = useActionState(submitInquiryAction, initialState);
  const [renderedAt] = useState(() => Date.now().toString());

  if (state.success) {
    return (
      <p className="form-success" role="status">
        Thanks — we&rsquo;ve received your request and will reach out shortly. You can also{" "}
        <a href="https://wa.me/2348061975051" target="_blank" rel="noopener">
          message us on WhatsApp
        </a>{" "}
        for a faster response.
      </p>
    );
  }

  return (
    <form action={formAction} className="form">
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="form_rendered_at" value={renderedAt} />

      <div className="honeypot-field" aria-hidden="true">
        <label>
          Company Website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label>
        Full Name
        <input required name="name" type="text" />
      </label>
      <label>
        Email
        <input required name="email" type="email" />
      </label>
      {showPhone && (
        <label>
          Phone
          <input name="phone" type="tel" />
        </label>
      )}
      {type === "training" && (
        <label>
          Program
          <select name="program" defaultValue="Basic Electrical Wiring">
            <option>Basic Electrical Wiring</option>
            <option>Advanced Solar Installation</option>
          </select>
        </label>
      )}
      <label>
        Message
        <textarea name="message" rows={4} placeholder="Tell us what you need" />
      </label>
      {state.error && (
        <p role="alert" className="error-text">
          {state.error}
        </p>
      )}
      <button className="btn" type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Send Message"}
      </button>
      <p className="form-note">Or chat on WhatsApp for faster response.</p>
    </form>
  );
}