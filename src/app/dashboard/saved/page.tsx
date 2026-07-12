"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Clock,
  Inbox,
} from "lucide-react";
import { savedPolls as initialSavedPolls } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SavedPollsPage() {
  // Local state so the bookmark toggle is interactive without a backend.
  const [saved, setSaved] = useState(() =>
    initialSavedPolls.map((p) => ({ ...p, saved: true }))
  );

  const toggleSave = (pollId: string) => {
    setSaved((prev) =>
      prev.map((p) =>
        p.pollId === pollId ? { ...p, saved: !p.saved } : p
      )
    );
  };

  const visible = saved.filter((p) => p.saved);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Saved Polls
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {visible.length > 0
              ? `You have ${visible.length} saved poll${visible.length === 1 ? "" : "s"}.`
              : "Polls you save will appear here for quick access."}
          </p>
        </div>
        <Button asChild variant="outline" className="gap-1.5">
          <Link href="/#trending">
            <Bookmark className="h-4 w-4" />
            Find polls to save
          </Link>
        </Button>
      </div>

      {/* Grid / Empty state */}
      {visible.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((poll) => {
            const isClosed = poll.daysLeft <= 0;
            return (
              <Card
                key={poll.pollId}
                className={cn(
                  "flex flex-col transition-all duration-300",
                  poll.saved
                    ? "hover:-translate-y-1 hover:shadow-premium-lg"
                    : "opacity-50"
                )}
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-[11px]">
                      {poll.category}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => toggleSave(poll.pollId)}
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted",
                        poll.saved ? "text-primary" : "text-muted-foreground"
                      )}
                      aria-label={
                        poll.saved ? "Remove from saved" : "Save poll"
                      }
                      aria-pressed={poll.saved}
                    >
                      {poll.saved ? (
                        <BookmarkCheck className="h-5 w-5 fill-current" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <CardTitle className="text-base font-semibold leading-snug text-foreground">
                    {poll.question}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {isClosed ? (
                      <span className="font-medium text-destructive">
                        Poll closed
                      </span>
                    ) : (
                      <span>
                        <span className="font-semibold text-foreground">
                          {poll.daysLeft}
                        </span>{" "}
                        {poll.daysLeft === 1 ? "day" : "days"} left
                      </span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="gap-2">
                  <Button asChild size="sm" className="flex-1 gap-1.5">
                    <Link href="/#live-results">
                      View Poll
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSave(poll.pollId)}
                    className="gap-1.5"
                  >
                    {poll.saved ? (
                      <>
                        <BookmarkCheck className="h-4 w-4" />
                        Unsave
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4" />
                        Save
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardHeader className="items-center text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Inbox className="h-7 w-7" />
            </span>
            <CardTitle className="text-lg">No saved polls</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3 pb-8 text-center">
            <p className="max-w-sm text-sm text-muted-foreground">
              You haven&apos;t saved any polls yet. Bookmark polls to revisit
              them later.
            </p>
            <Button asChild className="gap-1.5">
              <Link href="/#trending">
                <Bookmark className="h-4 w-4" />
                Browse polls
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
