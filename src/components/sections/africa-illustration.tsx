"use client";

import { cn } from "@/lib/utils";

/**
 * AfricaIllustration
 *
 * A decorative, animated SVG composition:
 *  - Stylized Africa silhouette with gradient fill
 *  - Concentric pulse rings (spin-slow)
 *  - Pulsing data nodes scattered across the continent
 *  - Floating mini bar charts
 *  - Floating percentage badge
 *  - Live indicator badge
 *
 * Purely presentational — uses no interactive state, but is marked
 * "use client" so the Tailwind animation utilities hydrate consistently.
 */
export function AfricaIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-[520px] select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-3xl" />

      {/* Concentric pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[78%] w-[78%] rounded-full border border-primary/20 animate-spin-slow" />
        <div className="absolute h-[60%] w-[60%] rounded-full border border-secondary/20 animate-spin-slow [animation-direction:reverse]" />
        <div className="absolute h-[42%] w-[42%] rounded-full border-2 border-dashed border-primary/15 animate-spin-slow" />
      </div>

      {/* Rotating dashed orbit with a satellite node */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[90%] w-[90%] animate-spin-slow">
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-secondary shadow-lg shadow-secondary/40 ring-4 ring-background" />
        </div>
      </div>

      {/* Main SVG */}
      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full"
        role="img"
        aria-label="Stylized illustration of the African continent with live polling data"
      >
        <defs>
          <linearGradient id="africa-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(211 100% 50%)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="hsl(158 64% 42%)" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="africa-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(211 100% 50%)" />
            <stop offset="100%" stopColor="hsl(158 64% 42%)" />
          </linearGradient>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(211 100% 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(211 100% 50%)" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Stylized Africa silhouette */}
        <path
          d="M196 64
             C 232 60, 268 70, 286 92
             C 302 112, 300 132, 292 150
             C 286 164, 280 176, 286 188
             C 292 200, 300 210, 296 224
             C 292 238, 278 246, 272 258
             C 266 270, 274 282, 270 296
             C 266 310, 254 320, 244 326
             C 234 332, 224 338, 214 340
             C 204 342, 194 338, 188 330
             C 182 322, 178 312, 172 304
             C 166 296, 156 292, 148 286
             C 140 280, 134 270, 132 258
             C 130 246, 134 234, 130 222
             C 126 210, 116 200, 112 188
             C 108 176, 112 164, 118 152
             C 124 140, 132 130, 130 118
             C 128 106, 120 96, 126 84
             C 132 72, 150 64, 168 62
             C 178 61, 188 62, 196 64 Z"
          fill="url(#africa-fill)"
          stroke="url(#africa-stroke)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Inner contour lines for depth */}
        <path
          d="M150 120 C 170 110, 200 112, 220 124"
          fill="none"
          stroke="url(#africa-stroke)"
          strokeWidth="1"
          strokeOpacity="0.35"
          strokeDasharray="3 4"
        />
        <path
          d="M140 180 C 170 172, 210 176, 240 188"
          fill="none"
          stroke="url(#africa-stroke)"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="3 4"
        />
        <path
          d="M160 240 C 190 236, 220 244, 244 256"
          fill="none"
          stroke="url(#africa-stroke)"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="3 4"
        />

        {/* Data nodes — positioned over the continent */}
        {[
          { cx: 196, cy: 110, r: 5, delay: "0s", color: "hsl(211 100% 50%)" },
          { cx: 244, cy: 150, r: 4, delay: "0.6s", color: "hsl(158 64% 42%)" },
          { cx: 168, cy: 188, r: 6, delay: "1.2s", color: "hsl(211 100% 50%)" },
          { cx: 236, cy: 214, r: 4, delay: "0.3s", color: "hsl(158 64% 42%)" },
          { cx: 196, cy: 262, r: 5, delay: "0.9s", color: "hsl(211 100% 50%)" },
          { cx: 150, cy: 236, r: 3, delay: "1.5s", color: "hsl(158 64% 42%)" },
        ].map((n, i) => (
          <g key={i} style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}>
            {/* Glow */}
            <circle cx={n.cx} cy={n.cy} r={n.r * 3} fill="url(#node-glow)" />
            {/* Pulsing ring */}
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="none"
              stroke={n.color}
              strokeWidth="2"
              className="animate-pulse-ring"
              style={{ animationDelay: n.delay, transformOrigin: `${n.cx}px ${n.cy}px` }}
            />
            {/* Solid core */}
            <circle cx={n.cx} cy={n.cy} r={n.r * 0.55} fill={n.color} />
          </g>
        ))}

        {/* Connecting lines between nodes */}
        <g
          stroke="url(#africa-stroke)"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeDasharray="2 3"
        >
          <line x1="196" y1="110" x2="244" y2="150" />
          <line x1="244" y1="150" x2="236" y2="214" />
          <line x1="168" y1="188" x2="196" y2="262" />
          <line x1="236" y1="214" x2="196" y2="262" />
        </g>
      </svg>

      {/* Floating mini bar chart — top left */}
      <div className="absolute left-0 top-10 animate-float-slow rounded-xl border border-border bg-card/90 p-3 shadow-premium-lg backdrop-blur-sm">
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Votes / day
          </span>
        </div>
        <div className="flex items-end gap-1">
          {[40, 65, 50, 80, 60, 95].map((h, i) => (
            <span
              key={i}
              className={cn(
                "w-1.5 rounded-sm",
                i % 2 === 0 ? "bg-primary" : "bg-secondary"
              )}
              style={{ height: `${h * 0.32}px` }}
            />
          ))}
        </div>
      </div>

      {/* Floating mini bar chart — bottom right */}
      <div
        className="absolute bottom-12 right-0 animate-float-slow rounded-xl border border-border bg-card/90 p-3 shadow-premium-lg backdrop-blur-sm"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Engagement
          </span>
        </div>
        <div className="flex items-end gap-1">
          {[55, 70, 45, 90, 75].map((h, i) => (
            <span
              key={i}
              className={cn(
                "w-1.5 rounded-sm",
                i % 2 === 0 ? "bg-secondary" : "bg-primary"
              )}
              style={{ height: `${h * 0.3}px` }}
            />
          ))}
        </div>
      </div>

      {/* Floating percentage badge — top right */}
      <div
        className="absolute right-2 top-16 animate-float-up rounded-2xl border border-border bg-card/95 px-3 py-2 shadow-premium-lg backdrop-blur-sm"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="leading-tight">
            <div className="text-lg font-bold text-foreground">73%</div>
            <div className="text-[10px] font-medium text-muted-foreground">
              Yes
            </div>
          </div>
        </div>
      </div>

      {/* Live indicator badge — bottom left */}
      <div className="absolute bottom-8 left-2 flex items-center gap-2 rounded-full border border-border bg-card/95 px-3 py-1.5 shadow-premium backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
        </span>
        <span className="text-xs font-semibold text-foreground">Live</span>
        <span className="text-xs text-muted-foreground">· 2.4M votes</span>
      </div>
    </div>
  );
}

export default AfricaIllustration;
