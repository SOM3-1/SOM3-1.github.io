"use client";

import { FormEvent } from "react";

type ContactFormProps = {
  email: string;
};

export function ContactForm({ email }: ContactFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const senderEmail = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = `Portfolio contact from ${name || "Website visitor"}`;
    const body = `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`;
    const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoHref;
  };

  return (
    <form className="card space-y-3" aria-label="Contact form" onSubmit={handleSubmit}>
      <label className="block text-sm text-slate-800 dark:text-slate-200">
        Name
        <input
          className="mt-1 w-full rounded-lg border border-slate-400/45 bg-white p-2 text-slate-900 dark:border-white/15 dark:bg-slate-900/60 dark:text-slate-100"
          type="text"
          name="name"
          required
        />
      </label>
      <label className="block text-sm text-slate-800 dark:text-slate-200">
        Email
        <input
          className="mt-1 w-full rounded-lg border border-slate-400/45 bg-white p-2 text-slate-900 dark:border-white/15 dark:bg-slate-900/60 dark:text-slate-100"
          type="email"
          name="email"
          required
        />
      </label>
      <label className="block text-sm text-slate-800 dark:text-slate-200">
        Message
        <textarea
          className="mt-1 min-h-28 w-full rounded-lg border border-slate-400/45 bg-white p-2 text-slate-900 dark:border-white/15 dark:bg-slate-900/60 dark:text-slate-100"
          name="message"
          required
        />
      </label>
      <button type="submit" className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900">
        Send Message
      </button>
    </form>
  );
}
