import { Flame, ArrowRight } from "lucide-react";
import { trendingPolls } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PollCard } from "@/components/poll-card";

export function TrendingPolls() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <Badge className="w-fit gap-1.5 bg-orange-100 text-orange-700">
            <Flame className="h-3.5 w-3.5" />
            Trending Now
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Polls sparking conversations
          </h2>
        </div>
        <Button variant="outline" className="gap-2 rounded-full">
          View all polls
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trendingPolls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </section>
  );
}

export default TrendingPolls;
