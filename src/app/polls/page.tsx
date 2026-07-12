import type { Metadata } from "next";
import { Search, SlidersHorizontal, BarChart3 } from "lucide-react";
import { allPolls } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PollCard } from "@/components/poll-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "All Polls — CitizenPulse",
  description:
    "Browse every active and closed poll on CitizenPulse. Filter by trending, active, or closed polls and have your say.",
};

const FILTERS = [
  { value: "all", label: "All" },
  { value: "trending", label: "Trending" },
  { value: "active", label: "Active" },
  { value: "closed", label: "Closed" },
] as const;

export default function PollsPage() {
  const trending = allPolls.filter((p) => p.trending);
  const active = allPolls.filter((p) => p.daysLeft > 0);
  const closed = allPolls.filter((p) => p.daysLeft <= 0);

  const counts = {
    all: allPolls.length,
    trending: trending.length,
    active: active.length,
    closed: closed.length,
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 pt-28 pb-8 sm:px-6 lg:px-8 lg:pt-32">
          {/* Page header */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Badge className="w-fit gap-1.5 bg-primary/10 text-primary">
                <BarChart3 className="h-3.5 w-3.5" />
                Browse Polls
              </Badge>
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                All Polls
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Explore every poll running on CitizenPulse. Filter by what&apos;s
                trending, what&apos;s still open, and what&apos;s already closed —
                then cast your vote.
              </p>
            </div>

            {/* Search + filter bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search polls, topics, countries…"
                  aria-label="Search polls"
                  className="h-11 pl-9"
                />
              </div>
              <Button variant="outline" size="lg" className="h-11 gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </section>

        {/* Filter tabs + grid */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList className="h-11 w-full justify-start overflow-x-auto sm:w-auto">
                {FILTERS.map((filter) => (
                  <TabsTrigger
                    key={filter.value}
                    value={filter.value}
                    className="gap-1.5 px-4 py-2 text-sm"
                  >
                    {filter.label}
                    <span className="rounded-full bg-muted-foreground/15 px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {counts[filter.value]}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <PollGrid polls={allPolls} />
            </TabsContent>
            <TabsContent value="trending" className="mt-0">
              <PollGrid polls={trending} />
            </TabsContent>
            <TabsContent value="active" className="mt-0">
              <PollGrid polls={active} />
            </TabsContent>
            <TabsContent value="closed" className="mt-0">
              <PollGrid polls={closed} emptyMessage="No closed polls yet — check back soon." />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PollGrid({
  polls,
  emptyMessage = "No polls match this filter.",
}: {
  polls: typeof allPolls;
  emptyMessage?: string;
}) {
  if (polls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-20 text-center">
        <BarChart3 className="h-10 w-10 text-muted-foreground/50" />
        <p className="mt-4 text-sm font-medium text-foreground">
          {emptyMessage}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Try switching to another filter tab.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
}
