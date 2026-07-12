"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Inbox,
} from "lucide-react";
import { userVotes } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MyVotesPage() {
  const hasVotes = userVotes.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            My Votes
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {hasVotes
              ? `You've voted on ${userVotes.length} poll${userVotes.length === 1 ? "" : "s"}.`
              : "Polls you vote on will appear here."}
          </p>
        </div>
        {hasVotes && (
          <Button asChild variant="outline" className="gap-1.5">
            <Link href="/#trending">
              <BarChart3 className="h-4 w-4" />
              Find more polls
            </Link>
          </Button>
        )}
      </div>

      {/* List / Empty state */}
      {hasVotes ? (
        <div className="space-y-4">
          {userVotes.map((vote) => (
            <Card
              key={vote.pollId}
              className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg"
            >
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-[11px]">
                      {vote.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      Voted on {formatDate(vote.date)}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold leading-snug text-foreground">
                    {vote.question}
                  </h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Your choice:</span>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {vote.choice}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                  <Button asChild size="sm" className="gap-1.5">
                    <Link href="/#live-results">
                      View results
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardHeader className="items-center text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Inbox className="h-7 w-7" />
            </span>
            <CardTitle className="text-lg">No votes yet</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3 pb-8 text-center">
            <p className="max-w-sm text-sm text-muted-foreground">
              You haven&apos;t voted on any polls yet. Browse trending polls and
              make your voice heard.
            </p>
            <Button asChild className="gap-1.5">
              <Link href="/#trending">
                <BarChart3 className="h-4 w-4" />
                Browse polls
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
