"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Activity, ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulated reset flow — replace with real Supabase call later.
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div>
      {/* Mobile logo */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2.5 lg:hidden"
        aria-label="CitizenPulse home"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/20">
          <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
        </span>
        <span className="text-lg font-bold tracking-tight">
          <span className="text-foreground">Citizen</span>
          <span className="gradient-text">Pulse</span>
        </span>
      </Link>

      {sent ? (
        <div className="animate-fade-in-up">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
            <CheckCircle2 className="h-7 w-7 text-secondary" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Check your email
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-semibold text-foreground">{email}</span>.
            Follow the link in the email to reset your password.
          </p>

          <div className="mt-8 space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
            >
              Try a different email
            </Button>
            <Button type="button" asChild className="w-full">
              <Link href="/login">
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold tracking-tight">
              Reset your password
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email and we&apos;ll send you a link to reset your
              password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending link…
                </>
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
