import Link from "next/link";
import { Activity } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Left: branded panel */}
      <aside
        className="relative hidden overflow-hidden bg-gradient-to-br from-primary to-secondary lg:block"
        aria-hidden="true"
      >
        {/* Decorative dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Floating decorative shapes */}
        <div className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl animate-float-slow" />
        <div className="absolute right-10 top-1/3 h-40 w-40 rounded-full bg-white/10 blur-xl animate-float-up" />
        <div className="absolute bottom-24 left-1/4 h-32 w-32 rotate-12 rounded-3xl border border-white/20 backdrop-blur-sm animate-float-slow" />
        <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-secondary/30 blur-3xl animate-float-up" />

        {/* Pulsing accent ring */}
        <div className="absolute right-16 top-16 h-3 w-3 rounded-full bg-white">
          <span className="absolute inset-0 rounded-full bg-white animate-pulse-ring" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-white"
            aria-label="CitizenPulse home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/30">
              <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-xl font-bold tracking-tight">CitizenPulse</span>
          </Link>

          <div className="max-w-md">
            <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-5xl">
              Africa&apos;s Voice,
              <br />
              One Poll at a Time
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/80">
              Join a continent-wide community sharing opinions, shaping
              conversations, and driving change through every vote.
            </p>

            <div className="mt-10 flex items-center gap-6 text-white/70">
              <div>
                <p className="font-display text-2xl font-bold text-white">2.4M+</p>
                <p className="text-xs uppercase tracking-wider">Voters</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="font-display text-2xl font-bold text-white">54</p>
                <p className="text-xs uppercase tracking-wider">Countries</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="font-display text-2xl font-bold text-white">18K+</p>
                <p className="text-xs uppercase tracking-wider">Polls</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} CitizenPulse. All rights reserved.
          </p>
        </div>
      </aside>

      {/* Right: form content */}
      <main className="flex items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md animate-fade-in-up">{children}</div>
      </main>
    </div>
  );
}
