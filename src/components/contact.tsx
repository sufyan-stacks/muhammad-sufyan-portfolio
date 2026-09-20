"use client";

import { useState, type FormEvent } from "react";
import { Backdrop } from "@/components/backdrop";
import { SocialLink } from "@/components/socials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eyebrow, Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { person } from "@/lib/site";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";

type Fields = {
  name: string;
  email: string;
  company: string;
  need: string;
  message: string;
  website: string; // honeypot: real visitors never see or fill this
};

const empty: Fields = {
  name: "",
  email: "",
  company: "",
  need: "",
  message: "",
  website: "",
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE = 20;

function validate(f: Fields, copy: Dictionary) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) errors.name = copy.contact.validationName;
  if (!emailRe.test(f.email)) errors.email = copy.contact.validationEmail;
  if (f.message.trim().length < MIN_MESSAGE) errors.message = copy.contact.validationMessage;
  return errors;
}

async function postContact(payload: Record<string, string>) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? "Something went wrong. Please try again.");
  }
}

export function Contact({ copy = getDictionary("en") }: { copy?: Dictionary }) {
  const needOptions = copy.contact.engagements;
  const [fields, setFields] = useState<Fields>(() => ({ ...empty, need: needOptions[0] ?? empty.need }));
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [introEmail, setIntroEmail] = useState("");
  const [introStatus, setIntroStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate(fields, copy);
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      await postContact({ kind: "brief", ...fields });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  async function onIntro(e: FormEvent) {
    e.preventDefault();
    if (!emailRe.test(introEmail)) {
      setIntroStatus("error");
      return;
    }
    setIntroStatus("sending");
    try {
      await postContact({ kind: "intro", email: introEmail });
      setIntroStatus("sent");
      setIntroEmail("");
    } catch {
      setIntroStatus("error");
    }
  }

  return (
    <section id="contact" className="section-y relative isolate overflow-hidden">
      <Backdrop variant="soft" />
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <Eyebrow>{copy.sections.contactEyebrow}</Eyebrow>
          <h2 className="font-display text-section">{copy.sections.contactTitle}</h2>
          <p className="measure-sm mt-4 text-base leading-relaxed text-muted">
            {copy.sections.contactIntro}
          </p>
          <ul className="mt-8 space-y-5 text-base">
            <li>
              <p className="text-sm text-subtle">{copy.contact.email}</p>
              <a className="inline-block py-1 hover:text-accent" href={`mailto:${person.email}`}>
                {person.email}
              </a>
            </li>
          </ul>

          <form onSubmit={onIntro} className="mt-10 rounded-2xl border border-border bg-surface p-5 md:p-6" noValidate>
            <p className="text-base font-medium">{copy.contact.shortCall}</p>
            <p className="mt-1 text-sm text-muted">{copy.contact.shortCallIntro}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Label htmlFor="intro-email" className="sr-only">
                {copy.contact.email}
              </Label>
              <Input
                id="intro-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={introEmail}
                onChange={(e) => {
                  setIntroEmail(e.target.value);
                  if (introStatus !== "idle") setIntroStatus("idle");
                }}
                className="sm:flex-1"
              />
              <Button type="submit" className="shrink-0" disabled={introStatus === "sending"}>
                {introStatus === "sending" ? copy.contact.sending : copy.contact.bookCall}
              </Button>
            </div>
            {introStatus === "sent" ? (
              <p className="mt-3 text-sm text-accent" role="status">
                {copy.contact.thanks}
              </p>
            ) : null}
            {introStatus === "error" ? (
              <p className="mt-3 text-sm text-red-400" role="alert">
                {copy.contact.invalidEmail}
              </p>
            ) : null}
          </form>
        </Reveal>

        <Reveal delay={80}>
          {status === "sent" ? (
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8" role="status">
              <p className="font-display text-2xl">{copy.contact.messageSent}</p>
              <p className="measure-sm mt-3 text-base leading-relaxed text-muted">
                {copy.contact.reply}{" "}
                <a className="text-fg underline decoration-border underline-offset-4" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
                .
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setStatus("idle");
                  setFields({ ...empty, need: needOptions[0] ?? empty.need });
                }}
              >
                {copy.contact.sendAnother}
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-surface p-5 md:p-7" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">{copy.contact.name}</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={fields.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name ? (
                    <p id="name-error" className="text-sm text-red-400">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{copy.contact.email}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email ? (
                    <p id="email-error" className="text-sm text-red-400">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-5 grid gap-2">
                <Label htmlFor="company">{copy.contact.company}</Label>
                <Input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  value={fields.company}
                  onChange={(e) => set("company", e.target.value)}
                />
              </div>
              <fieldset className="mt-5">
                <legend className="text-sm font-medium">{copy.contact.need}</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {needOptions.map((name) => (
                    <label
                      key={name}
                      className={cn(
                        "flex min-h-16 cursor-pointer items-center justify-center rounded-xl px-3 py-2 text-center text-sm font-medium leading-snug sm:min-h-16",
                        "transition-[background-color,box-shadow,color] duration-150 ease-out",
                        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                        fields.need === name
                          ? "bg-fg text-bg"
                          : "text-muted shadow-[var(--shadow-border)] hover:text-fg",
                      )}
                    >
                      <input
                        type="radio"
                        name="need"
                        value={name}
                        checked={fields.need === name}
                        onChange={() => set("need", name)}
                        className="sr-only"
                      />
                      {name}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="mt-5 grid gap-2">
                <Label htmlFor="message">{copy.contact.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={fields.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder={copy.contact.messagePlaceholder}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message ? (
                  <p id="message-error" className="text-sm text-red-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              {/* Honeypot. Hidden from people and screen readers; bots tend to fill it in. */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={fields.website}
                  onChange={(e) => set("website", e.target.value)}
                />
              </div>

              <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "sending"}>
                {status === "sending" ? copy.contact.sending : copy.contact.sendMessage}
              </Button>
              {status === "error" ? (
                <p className="mt-3 text-center text-sm text-red-400" role="alert">
                  {errorMessage}
                </p>
              ) : (
                <p className="mt-3 text-center text-sm text-subtle">{copy.contact.inbox}</p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
