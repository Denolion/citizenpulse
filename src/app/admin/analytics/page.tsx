"use client";

import {
  Activity,
  Calendar,
  TrendingUp,
  Trophy,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  categoryDistributionData,
  monthlyGrowthData,
  trendData,
} from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartColors = [
  "hsl(var(--color-chart-1))",
  "hsl(var(--color-chart-2))",
  "hsl(var(--color-chart-3))",
  "hsl(var(--color-chart-4))",
  "hsl(var(--color-chart-5))",
];

const engagementData = trendData.map((d) => ({
  ...d,
  engagement: Math.round(d.value * 0.073),
}));

const keyMetrics = [
  {
    label: "Total Votes",
    value: "42.3M",
    icon: Activity,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Avg Turnout",
    value: "73.4%",
    icon: TrendingUp,
    color: "bg-secondary/10 text-secondary",
  },
  {
    label: "Top Category",
    value: "Politics",
    icon: Trophy,
    color: "bg-amber-100 text-amber-700",
  },
  {
    label: "Peak Day",
    value: "Sunday",
    icon: Calendar,
    color: "bg-rose-100 text-rose-700",
  },
];

const dateRanges = ["7D", "30D", "90D", "1Y", "All"];

const tooltipStyle = {
  borderRadius: "0.75rem",
  border: "1px solid hsl(var(--color-border))",
  background: "hsl(var(--color-background))",
  fontSize: "0.875rem",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track engagement, voting trends, and platform performance.
          </p>
        </div>

        {/* Date range selector (visual only) */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
          {dateRanges.map((range, i) => (
            <button
              key={range}
              type="button"
              aria-pressed={i === 1}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                i === 1
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key metrics row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {keyMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card
              key={metric.label}
              className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg"
            >
              <CardContent className="flex items-center gap-4 p-5">
                <span
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    metric.color
                  )}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-0.5 text-2xl font-bold tracking-tight text-foreground">
                    {metric.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* LineChart: votes over time */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Votes Over Time</CardTitle>
          <CardDescription>Daily vote count for the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--color-muted-foreground))" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--color-muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [formatNumber(Number(v)), "Votes"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--color-chart-1))"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "hsl(var(--color-chart-1))" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* PieChart + BarChart row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* PieChart: category distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Category Distribution</CardTitle>
            <CardDescription>Share of polls by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistributionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={50}
                    paddingAngle={2}
                  >
                    {categoryDistributionData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={chartColors[i % chartColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v, n) => [formatNumber(Number(v)), String(n)]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {categoryDistributionData.map((entry, i) => (
                <div
                  key={entry.name}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: chartColors[i % chartColors.length] }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* BarChart: monthly growth comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Growth Comparison</CardTitle>
            <CardDescription>Polls vs votes by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyGrowthData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--color-border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "hsl(var(--color-muted-foreground))" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "hsl(var(--color-muted-foreground))" }}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--color-muted))", opacity: 0.4 }}
                    contentStyle={tooltipStyle}
                  />
                  <Bar
                    dataKey="polls"
                    fill="hsl(var(--color-chart-1))"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="votes"
                    fill="hsl(var(--color-chart-2))"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AreaChart: user engagement trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User Engagement Trend</CardTitle>
          <CardDescription>
            Average engagement rate over the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={engagementData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--color-chart-5))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--color-chart-5))"
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
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--color-muted-foreground))" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--color-muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [`${v}%`, "Engagement"]}
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="hsl(var(--color-chart-5))"
                  strokeWidth={2.5}
                  fill="url(#engagementGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
