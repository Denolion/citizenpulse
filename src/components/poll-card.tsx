"use client";

import { useState } from "react";
import Image from "next/image";
import { Bookmark, Share2, TrendingUp, Users, Clock } from "lucide-react";
import type { Poll } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const OPTION_COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
];

export function PollCard({ poll }: { poll: Poll }) {
  const [voted, setVoted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  const handleVote = (index: number) => {
    if (voted) return;
    setSelected(index);
    setVoted(true);
  };

  return (
    <Card
      className={cn(
        "group relative flex flex-col overflow-hidden transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-premium-lg"
      )}
    >
      {/* Header: flag + country + trending */}
      <div className="flex items-center justify-between gap-2 p-5 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none" aria-hidden="true">
            {poll.flag}
          </span>
          <span className="text-sm font-medium text-foreground">
            {poll.country}
          </span>
        </div>
        {poll.trending && (
          <Badge className="gap-1 bg-orange-500 text-white">
            <TrendingUp className="h-3 w-3" />
            Trending
          </Badge>
        )}
      </div>

      {/* Image */}
      {poll.image && (
        <div className="relative mx-5 aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={poll.image}
            alt={poll.question}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Bookmark + Share overlay */}
          <div className="absolute right-2 top-2 flex items-center gap-1">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className={cn(
                "h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm",
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
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              aria-label="Share poll"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 pt-4">
        {/* Category badge */}
        <Badge variant="secondary" className="mb-3 w-fit">
          {poll.category}
        </Badge>

        {/* Question */}
        <h3 className="mb-4 text-base font-semibold leading-snug text-foreground text-balance">
          {poll.question}
        </h3>

        {/* Options */}
        <div className="flex flex-1 flex-col gap-2">
          {poll.options.map((option, index) => {
            const isLeading = voted && index === 0;
            const colorClass = OPTION_COLORS[index % OPTION_COLORS.length];

            if (!voted) {
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleVote(index)}
                  className="group/option flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-left text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border-2 border-border text-[10px] font-bold text-muted-foreground transition-colors group-hover/option:border-primary group-hover/option:text-primary",
                        "group-hover/option:bg-primary/10"
                      )}
                    >
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

            // Voted state: animated result bars
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
                {/* Animated fill bar */}
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
                    <span className="text-foreground">{option.label}</span>
                    {isLeading && (
                      <span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                        Leading
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-foreground">
                    {option.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {formatNumber(poll.participants)} participants
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {poll.daysLeft} {poll.daysLeft === 1 ? "day" : "days"} left
          </span>
        </div>
      </div>
    </Card>
  );
}

export default PollCard;
