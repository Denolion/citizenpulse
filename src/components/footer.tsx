"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  About: [
    { label: "About CitizenPulse", href: "/#about" },
    { label: "Our Methodology", href: "/#methodology" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
  ],
  Explore: [
    { label: "Trending Polls", href: "/#trending" },
    { label: "Live Results", href: "/#live-results" },
    { label: "Categories", href: "/#categories" },
    { label: "Countries", href: "/#countries" },
  ],
  Resources: [
    { label: "News & Analysis", href: "/#news" },
    { label: "Research Reports", href: "/reports" },
    { label: "Help Center", href: "/help" },
    { label: "Community", href: "/community" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" },
    { label: "API", href: "/api" },
  ],
} as const;

const socials = [
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
] as const;

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("done");
    setEmail("");
    // Reset the confirmation after a few seconds so it can be reused.
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Stay in the pulse
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-background/70">
                Get the latest polls, live results, and analysis from across the
                continent delivered to your inbox every week.
              </p>
            </div>
            <form onSubmit={onSubscribe} className="w-full lg:justify-self-end">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "done") setStatus("idle");
                    }}
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="h-12 border-white/15 bg-white/5 text-background placeholder:text-background/40 focus-visible:border-primary focus-visible:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 shrink-0 gap-1.5"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p
                className={cn(
                  "mt-2.5 flex items-center gap-1.5 text-xs transition-opacity duration-200",
                  status === "done"
                    ? "text-secondary opacity-100"
                    : "text-background/50 opacity-0"
                )}
                aria-live="polite"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                You&apos;re subscribed — check your inbox to confirm.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="CitizenPulse home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/30">
                <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-bold tracking-tight">
                CitizenPulse
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/70">
              Africa&apos;s premier civic polling platform. Vote, discover
              public opinion, and explore the trends shaping the continent —
              one poll at a time.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-background/70 transition-all hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/30"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-background/50">
                  {heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {links.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-background/70 transition-colors hover:text-background"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-background/60 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} CitizenPulse. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built for the voices of Africa
            <span className="text-secondary">●</span>
            One poll at a time
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
