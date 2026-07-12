"use client";

import { Check, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  "Launch a poll in under two minutes",
  "Target respondents by country & demographic",
  "Real-time results with exportable reports",
  "Verified citizen responses, no bots",
];

export function CreatePollCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary px-6 py-12 sm:px-12 lg:px-16">
        {/* Decorative blobs */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        {/* Dot pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(hsl(0 0% 100% / 0.4) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: copy */}
          <div className="max-w-xl">
            <Badge className="mb-4 gap-1.5 bg-white/15 text-white">
              <Building2 className="h-3.5 w-3.5" />
              For organizations &amp; researchers
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Create your own poll in minutes
            </h2>
            <p className="mt-3 text-base text-white/80">
              Reach millions of verified citizens across 54 countries. Get
              real-time, actionable insights for your research, advocacy, or
              brand strategy.
            </p>

            {/* Feature checklist */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm font-medium text-white"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: CTAs */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
            <Button
              size="lg"
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              Create a Poll
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="gap-2 text-white hover:bg-white/10 hover:text-white"
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreatePollCta;
