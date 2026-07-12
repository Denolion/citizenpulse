"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Users,
  Clock,
  TrendingUp,
  CheckCircle2,
  BarChart3,
  ChevronRight,
  Radio,
} from "lucide-react";
import { allPolls, type Poll } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PollCard } from "@/components/poll-card";

const OPTION_COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
];

const OPTION_TEXT_COLORS = [
  "text-primary",
  "text-secondary",
  "text-chart-3",
  "text-chart-4",
  "text-chart-5",
];

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
};

function computeTimeLeft(daysLeft: number): TimeLeft {
  // Anchor the countdown to "end of today + daysLeft days" so it ticks down live.
  const now = Date.now();
  const end = now + daysLeft * 24 * 60 * 60 * 1000;
  const diff = Math.max(0, end - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, isOver: diff === 0 };
}

export default function PollDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const poll = useMemo(() => allPolls.find((p) => p.id === id), [id]);

  const [selected, setSelected] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [shared, setShared] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    computeTimeLeft(poll?.daysLeft ?? 0),
  );

  // Live countdown timer
  useEffect(() => {
    if (!poll) return;
    const interval = setInterval(
      () => setTimeLeft(computeTimeLeft(poll.daysLeft)),
      1000,
    );
    return () => clearInterval(interval);
  }, [poll]);

  // Reset transient share state
  useEffect(() => {
    if (!shared) return;
    const t = setTimeout(() => setShared(false), 2500);
    return () => clearTimeout(t);
  }, [shared]);

  if (!poll) {
    return (
      <>
        <Navbar />
        <main className="flex-1">
          <section className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-32 pb-20 text-center sm:px-6 lg:pt-40">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </span>
            <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Poll not found
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              The poll you&apos;re looking for may have been removed or never
              existed.
            </p>
            <Button asChild className="mt-8 gap-2">
              <Link href="/polls">
                <ArrowLeft className="h-4 w-4" />
                Back to all polls
              </Link>
            </Button>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const handleVote = (index: number) => {
    if (voted) return;
    setSelected(index);
    setVoted(true);
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({ title: poll.question, url: window.location.href })
        .catch(() => setShared(true));
    } else {
      setShared(true);
    }
  };

  const related = allPolls.filter((p) => p.id !== poll.id).slice(0, 3);
  const leadingIndex = poll.options.reduce(
    (best, opt, i, arr) => (opt.percentage > arr[best].percentage ? i : best),
    0,
  );

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 pt-28 pb-12 sm:px-6 lg:px-8 lg:pt-32">
          {/* Back link */}
          <Link
            href="/polls"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all polls
          </Link>

          {/* Poll header */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{poll.category}</Badge>
              <Badge variant="outline" className="gap-1.5">
                <span className="text-base leading-none" aria-hidden="true">
                  {poll.flag}
                </span>
                {poll.country}
              </Badge>
              {poll.trending && (
                <Badge className="gap-1 bg-orange-500 text-white">
                  <TrendingUp className="h-3 w-3" />
                  Trending
                </Badge>
              )}
              {poll.live && (
                <Badge className="gap-1.5 bg-red-500 text-white">
                  <Radio className="h-3 w-3" />
                  Live
                </Badge>
              )}
            </div>
            <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
              {poll.question}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {formatNumber(poll.participants)} participants
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {timeLeft.isOver
                  ? "Poll closed"
                  : `${timeLeft.days}d : ${timeLeft.hours}h : ${timeLeft.minutes}m : ${timeLeft.seconds}s left`}
              </span>
              {poll.author && (
                <span className="text-muted-foreground">
                  by{" "}
                  <span className="font-medium text-foreground">
                    {poll.author}
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Poll image */}
          {poll.image && (
            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border shadow-sm">
              <Image
                src={poll.image}
                alt={poll.question}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {/* Countdown timer card */}
          {!timeLeft.isOver && (
            <Card className="mt-6 overflow-hidden">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Time remaining
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:max-w-md">
                  <TimeUnit value={timeLeft.days} label="Days" />
                  <TimeUnit value={timeLeft.hours} label="Hours" />
                  <TimeUnit value={timeLeft.minutes} label="Minutes" />
                  <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Voting section */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-foreground">
                  {voted ? "Results" : "Cast your vote"}
                </h2>
                {voted && (
                  <Badge className="gap-1.5 bg-secondary text-secondary-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Vote recorded
                  </Badge>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {poll.options.map((option, index) => {
                  const colorClass = OPTION_COLORS[index % OPTION_COLORS.length];
                  const textClass =
                    OPTION_TEXT_COLORS[index % OPTION_TEXT_COLORS.length];
                  const isLeading = voted && index === leadingIndex;
                  const isSelected = selected === index;

                  if (!voted) {
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => handleVote(index)}
                        className="group/option flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-4 py-4 text-left transition-all hover:border-primary/50 hover:bg-muted hover:shadow-sm"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-border text-xs font-bold text-muted-foreground transition-colors group-hover/option:border-primary group-hover/option:bg-primary/10 group-hover/option:text-primary">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-sm font-medium text-foreground sm:text-base">
                            {option.label}
                          </span>
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground opacity-0 transition-opacity group-hover/option:opacity-100">
                          Tap to vote
                        </span>
                      </button>
                    );
                  }

                  // Voted state: animated result bars
                  return (
                    <div
                      key={option.label}
                      className={cn(
                        "relative overflow-hidden rounded-xl border px-4 py-4 transition-all",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute inset-y-0 left-0 rounded-xl opacity-20 transition-all duration-700 ease-out",
                          colorClass,
                        )}
                        style={{ width: `${option.percentage}%` }}
                      />
                      <div className="relative flex items-center justify-between gap-3">
                        <span className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white",
                              colorClass,
                            )}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-sm font-medium text-foreground sm:text-base">
                            {option.label}
                          </span>
                          {isLeading && (
                            <span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                              Leading
                            </span>
                          )}
                          {isSelected && (
                            <span className="ml-1 rounded bg-secondary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-secondary">
                              Your vote
                            </span>
                          )}
                        </span>
                        <span className={cn("text-lg font-bold", textClass)}>
                          {option.percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Post-vote actions */}
              {voted && (
                <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Thanks for voting! See the full breakdown.
                  </p>
                  <Button asChild variant="outline" className="gap-2">
                    <Link href={`/polls/${poll.id}/results`}>
                      <BarChart3 className="h-4 w-4" />
                      View full results
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Share + Bookmark */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={handleShare}
              className="gap-2"
              aria-label="Share poll"
            >
              <Share2 className="h-4 w-4" />
              {shared ? "Link copied" : "Share"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setBookmarked((v) => !v)}
              className={cn("gap-2", bookmarked && "border-primary text-primary")}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark poll"}
            >
              <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            <Button asChild variant="ghost" className="ml-auto gap-2">
              <Link href={`/polls/${poll.id}/vote`}>
                Open voting page
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Related polls */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <Separator className="mb-10" />
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Related polls
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                More conversations you might be interested in.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden gap-2 sm:inline-flex">
              <Link href="/polls">
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedPoll: Poll) => (
              <PollCard key={relatedPoll.id} poll={relatedPoll} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-border bg-muted/40 px-2 py-3">
      <span className="font-mono text-xl font-bold tabular-nums text-foreground sm:text-2xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
