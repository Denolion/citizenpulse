"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import {
  ArrowLeft,
  BarChart3,
  Share2,
  Trophy,
  Users,
  ChevronRight,
} from "lucide-react";
import { allPolls } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Chart colors pulled from the theme tokens defined in globals.css (@theme).
const CHART_COLORS = [
  "hsl(var(--color-chart-1))",
  "hsl(var(--color-chart-2))",
  "hsl(var(--color-chart-3))",
  "hsl(var(--color-chart-4))",
  "hsl(var(--color-chart-5))",
];

type TooltipPayloadEntry = {
  name?: string | number;
  value?: string | number;
  payload?: { label?: string; name?: string; value?: number };
  color?: string;
};

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-premium">
      {payload.map((entry, i) => {
        const label = entry.payload?.label ?? entry.payload?.name ?? entry.name ?? "";
        const value = entry.payload?.value ?? entry.value ?? 0;
        return (
          <div
            key={i}
            className="flex items-center gap-2 text-xs text-foreground"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">{String(label)}</span>
            <span className="ml-auto font-bold">{String(value)}%</span>
          </div>
        );
      })}
    </div>
  );
}

export default function PollResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const poll = useMemo(() => allPolls.find((p) => p.id === id), [id]);
  const [shared, setShared] = useState(false);

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
              We couldn&apos;t find results for that poll.
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

  const data = poll.options.map((o) => ({ label: o.label, value: o.percentage }));
  const totalVotes = poll.participants;
  const leadingIndex = poll.options.reduce(
    (best, opt, i, arr) => (opt.percentage > arr[best].percentage ? i : best),
    0,
  );
  const leading = poll.options[leadingIndex];

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({ title: `Results: ${poll.question}`, url: window.location.href })
        .catch(() => setShared(true));
    } else {
      setShared(true);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 pt-28 pb-12 sm:px-6 lg:px-8 lg:pt-32">
          {/* Back link */}
          <Link
            href={`/polls/${poll.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to poll
          </Link>

          {/* Header */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1.5 bg-primary/10 text-primary">
                <BarChart3 className="h-3.5 w-3.5" />
                Results
              </Badge>
              <Badge variant="secondary">{poll.category}</Badge>
              <Badge variant="outline" className="gap-1.5">
                <span className="text-base leading-none" aria-hidden="true">
                  {poll.flag}
                </span>
                {poll.country}
              </Badge>
            </div>
            <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
              {poll.question}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {formatNumber(totalVotes)} total votes
              </span>
            </div>
          </div>

          {/* Leading option highlight */}
          <Card className="mt-6 overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Trophy className="h-6 w-6" />
              </span>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Leading option
                </span>
                <span className="text-lg font-bold text-foreground">
                  {leading.label}
                </span>
              </div>
              <span className="font-display text-2xl font-bold text-primary sm:text-3xl">
                {leading.percentage}%
              </span>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Donut pie chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground">
                  Distribution
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Share of total votes per option.
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                        innerRadius={56}
                        outerRadius={96}
                        paddingAngle={3}
                        stroke="hsl(var(--color-card))"
                        strokeWidth={2}
                      >
                        {data.map((_, i) => (
                          <Cell
                            key={i}
                            fill={CHART_COLORS[i % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {poll.options.map((option, i) => (
                    <div key={option.label} className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                        }}
                      />
                      <span className="text-xs font-medium text-muted-foreground">
                        {option.label}
                      </span>
                      <span className="text-xs font-bold text-foreground">
                        {option.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Horizontal bar chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground">
                  Percentages
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Vote share ranked by option.
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      layout="vertical"
                      margin={{ top: 4, right: 44, bottom: 4, left: 8 }}
                    >
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis
                        type="category"
                        dataKey="label"
                        width={120}
                        tick={{
                          fontSize: 12,
                          fill: "hsl(var(--color-muted-foreground))",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={<ChartTooltip />}
                        cursor={{ fill: "hsl(var(--color-muted))", opacity: 0.4 }}
                      />
                      <Bar
                        dataKey="value"
                        radius={[0, 6, 6, 0]}
                        barSize={24}
                        background={{
                          fill: "hsl(var(--color-muted))",
                          radius: 6,
                        }}
                      >
                        {data.map((_, i) => (
                          <Cell
                            key={i}
                            fill={CHART_COLORS[i % CHART_COLORS.length]}
                          />
                        ))}
                        <LabelList
                          dataKey="value"
                          position="right"
                          formatter={(v) => `${v}%`}
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            fill: "hsl(var(--color-foreground))",
                          }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed breakdown */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-foreground">
                Detailed breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {poll.options.map((option, i) => {
                  const isLeading = i === leadingIndex;
                  const approxVotes = Math.round(
                    (option.percentage / 100) * totalVotes,
                  );
                  return (
                    <div
                      key={option.label}
                      className={cn(
                        "relative overflow-hidden rounded-lg border px-4 py-3",
                        isLeading
                          ? "border-primary/40 bg-primary/5"
                          : "border-border",
                      )}
                    >
                      <div className="relative flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2.5">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{
                              backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                            }}
                          />
                          <span className="text-sm font-medium text-foreground">
                            {option.label}
                          </span>
                          {isLeading && (
                            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                              Leading
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground tabular-nums">
                            ~{formatNumber(approxVotes)} votes
                          </span>
                          <span className="text-sm font-bold text-foreground">
                            {option.percentage}%
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={handleShare}
              className="gap-2"
              aria-label="Share results"
            >
              <Share2 className="h-4 w-4" />
              {shared ? "Link copied" : "Share results"}
            </Button>
            <Button asChild className="gap-2">
              <Link href={`/polls/${poll.id}`}>
                <ArrowLeft className="h-4 w-4" />
                View poll
              </Link>
            </Button>
            <Button asChild variant="ghost" className="ml-auto gap-2">
              <Link href={`/polls/${poll.id}/vote`}>
                Vote on this poll
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <Separator className="mx-auto max-w-7xl" />
      </main>
      <Footer />
    </>
  );
}
