"use client";

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
  Area,
  AreaChart,
  CartesianGrid,
  Line,
} from "recharts";
import { Activity } from "lucide-react";
import { liveResults, trendData } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        const label =
          entry.payload?.label ?? entry.payload?.name ?? entry.name ?? "";
        const value =
          entry.payload?.value ?? entry.value ?? 0;
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

function TrendTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string | number;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-premium">
      <div className="mb-1 text-xs font-semibold text-foreground">
        {String(label ?? "")}
      </div>
      {payload.map((entry, i) => (
        <div
          key={i}
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>Votes</span>
          <span className="ml-auto font-bold text-foreground">
            {formatNumber(Number(entry.value ?? 0))}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChartLegend({
  options,
}: {
  options: { label: string; percentage: number }[];
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
      {options.map((option, i) => (
        <div key={option.label} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
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
  );
}

function ResultChartCard({
  result,
  index,
}: {
  result: (typeof liveResults)[number];
  index: number;
}) {
  const data = result.options.map((o) => ({
    label: o.label,
    value: o.percentage,
  }));

  // Chart type: 0 -> donut PieChart, 1 -> horizontal BarChart, 2 -> PieChart
  const isBar = index === 1;

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {result.country}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {formatNumber(result.totalResponses)} responses
          </span>
        </div>
        <CardTitle className="text-base font-semibold leading-snug text-foreground">
          {result.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div className="flex h-56 items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            {isBar ? (
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 4, right: 36, bottom: 4, left: 8 }}
              >
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={120}
                  tick={{ fontSize: 11, fill: "hsl(var(--color-muted-foreground))" }}
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
                  barSize={22}
                  background={{ fill: "hsl(var(--color-muted))", radius: 6 }}
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
                    formatter={(v: unknown) => `${v}%`}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      fill: "hsl(var(--color-foreground))",
                    }}
                  />
                </Bar>
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  innerRadius={index === 0 ? 48 : 0}
                  outerRadius={80}
                  paddingAngle={index === 0 ? 3 : 0}
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
            )}
          </ResponsiveContainer>
        </div>

        {/* Leading option indicator */}
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Activity className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs text-muted-foreground">
            Leading:{" "}
            <span className="font-semibold text-foreground">
              {result.leadingOption}
            </span>{" "}
            ({result.leadingPercentage}%)
          </span>
        </div>

        {/* Legend */}
        <ChartLegend options={result.options} />
      </CardContent>
    </Card>
  );
}

export function LiveResults() {
  return (
    <section id="live-results" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-wide text-red-500">
            Live Results
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Real-time citizen sentiment
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Aggregated responses from active polls across the continent, updated
          continuously as citizens vote.
        </p>
      </div>

      {/* Three chart cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {liveResults.map((result, i) => (
          <ResultChartCard key={result.id} result={result} index={i} />
        ))}
      </div>

      {/* Full-width trend chart */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                Weekly voting activity
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Total votes cast across all polls this week
              </p>
            </div>
            <Badge variant="secondary" className="gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              This week
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trendData}
                margin={{ top: 10, right: 16, bottom: 4, left: 0 }}
              >
                <defs>
                  <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--color-primary))"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--color-primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 12, fill: "hsl(var(--color-muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(var(--color-muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => formatNumber(v)}
                />
                <Tooltip content={<TrendTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--color-primary))"
                  strokeWidth={2.5}
                  fill="url(#trend-fill)"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--color-secondary))"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default LiveResults;
