"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, ArrowRight, Bookmark, Share2, Users } from "lucide-react";
import { featuredPoll, stats } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AfricaIllustration } from "@/components/sections/africa-illustration";

const OPTION_COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-chart-3",
  "bg-chart-4",
];

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function calcTimeLeft(daysLeft: number): TimeLeft {
  // Use the poll's daysLeft as a countdown anchor (now + daysLeft days).
  const target = Date.now() + daysLeft * 24 * 60 * 60 * 1000;
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Hero() {
  const [voted, setVoted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calcTimeLeft(featuredPoll.daysLeft)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(calcTimeLeft(featuredPoll.daysLeft));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handleVote = (index: number) => {
    if (voted) return;
    setSelected(index);
    setVoted(true);
  };

  const timeSegments = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy + featured poll */}
          <div className="flex flex-col items-start">
            {/* Headline */}
            <h1
              className="animate-fade-in-up text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "0ms" }}
            >
              Africa&apos;s Voice, <span className="gradient-text">One Poll</span>{" "}
              at a Time
            </h1>

            {/* Subtitle */}
            <p
              className="animate-fade-in-up mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "100ms" }}
            >
              Vote, discover public opinion, and explore trends shaping Africa.
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-in-up mt-7 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "200ms" }}
            >
              <Button size="lg" className="gap-2">
                <Play className="h-4 w-4 fill-current" />
                Vote Now
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Create Poll
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Featured poll card */}
            <Card
              className="animate-fade-in-up mt-10 w-full overflow-hidden"
              style={{ animationDelay: "300ms" }}
            >
              {/* Image header */}
              <div className="relative h-44 w-full overflow-hidden">
                {featuredPoll.image && (
                  <Image
                    src={featuredPoll.image}
                    alt={featuredPoll.question}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                {/* Live badge */}
                <div className="absolute left-4 top-4">
                  <Badge className="gap-1.5 bg-red-500 text-white">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    Live
                  </Badge>
                </div>

                {/* Bookmark + Share */}
                <div className="absolute right-4 top-4 flex items-center gap-1.5">
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className={cn(
                      "h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm",
                      bookmarked && "text-primary"
                    )}
                    onClick={() => setBookmarked((v) => !v)}
                    aria-label={bookmarked ? "Remove bookmark" : "Bookmark poll"}
                  >
                    <Bookmark
                      className={cn("h-4 w-4", bookmarked && "fill-current")}
                    />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm"
                    aria-label="Share poll"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Question */}
                <h3 className="mb-4 text-lg font-semibold leading-snug text-foreground text-balance">
                  {featuredPoll.question}
                </h3>

                {/* Options */}
                <div className="flex flex-col gap-2">
                  {featuredPoll.options.map((option, index) => {
                    const colorClass =
                      OPTION_COLORS[index % OPTION_COLORS.length];

                    if (!voted) {
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => handleVote(index)}
                          className="group/option flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-left text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-muted"
                        >
                          <span className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-border text-[10px] font-bold text-muted-foreground transition-colors group-hover/option:border-primary group-hover/option:text-primary group-hover/option:bg-primary/10">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span>{option.label}</span>
                          </span>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {option.percentage}%
                          </span>
                        </button>
                      );
                    }

                    return (
                      <div
                        key={option.label}
                        className={cn(
                          "relative overflow-hidden rounded-lg border px-3 py-2.5 transition-all",
                          selected === index
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute inset-y-0 left-0 rounded-lg opacity-20 transition-all duration-700 ease-out",
                            colorClass
                          )}
                          style={{ width: `${option.percentage}%` }}
                        />
                        <div className="relative flex items-center justify-between gap-3 text-sm font-medium">
                          <span className="flex items-center gap-2">
                            <span
                              className={cn(
                                "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white",
                                colorClass
                              )}
                            >
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-foreground">
                              {option.label}
                            </span>
                          </span>
                          <span className="font-bold text-foreground">
                            {option.percentage}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Countdown + participants */}
                <div className="mt-5 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    {timeSegments.map((seg) => (
                      <div
                        key={seg.label}
                        className="flex flex-col items-center rounded-lg bg-muted/60 px-2.5 py-1.5"
                      >
                        <span className="text-base font-bold tabular-nums text-foreground">
                          {String(seg.value).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          {seg.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    {formatNumber(featuredPoll.participants)} participants
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Africa illustration + stats */}
          <div className="relative flex flex-col items-center lg:items-end">
            <AfricaIllustration className="animate-fade-in-up" />
            {/* Stats strip */}
            <div
              className="animate-fade-in-up mt-8 grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4"
              style={{ animationDelay: "400ms" }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card/60 p-3 text-center backdrop-blur-sm"
                >
                  <div className="mb-1 flex justify-center">
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white",
                        stat.color
                      )}
                    >
                      <stat.icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
