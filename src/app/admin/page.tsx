"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  FileText,
  Plus,
  Users,
  Activity,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  adminPolls,
  adminStats,
  categoryDistributionData,
  monthlyGrowthData,
} from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const statusBadgeClass: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
  draft: "bg-amber-100 text-amber-700 border-amber-200",
};

const statIcons = [Users, BarChart3, Activity, TrendingUp];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor platform performance and recent activity at a glance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="gap-1.5">
            <Link href="/admin/reports">
              <FileText className="h-4 w-4" />
              View Reports
            </Link>
          </Button>
          <Button asChild className="gap-1.5">
            <Link href="/admin/polls">
              <Plus className="h-4 w-4" />
              Create Poll
            </Link>
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat, i) => {
          const Icon = statIcons[i];
          const isUp = stat.trend === "up";
          return (
            <Card
              key={stat.label}
              className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                      isUp
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    )}
                  >
                    {isUp ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly growth - AreaChart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Growth</CardTitle>
            <CardDescription>Polls created over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyGrowthData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="pollsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--color-chart-1))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--color-chart-1))"
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
                    contentStyle={{
                      borderRadius: "0.75rem",
                      border: "1px solid hsl(var(--color-border))",
                      background: "hsl(var(--color-background))",
                      fontSize: "0.875rem",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="polls"
                    stroke="hsl(var(--color-chart-1))"
                    strokeWidth={2}
                    fill="url(#pollsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category distribution - BarChart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Category Distribution</CardTitle>
            <CardDescription>Polls by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryDistributionData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--color-border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "hsl(var(--color-muted-foreground))" }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "hsl(var(--color-muted-foreground))" }}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--color-muted))", opacity: 0.4 }}
                    contentStyle={{
                      borderRadius: "0.75rem",
                      border: "1px solid hsl(var(--color-border))",
                      background: "hsl(var(--color-background))",
                      fontSize: "0.875rem",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="hsl(var(--color-chart-2))"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent polls table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-lg">Recent Polls</CardTitle>
            <CardDescription>Latest polls created on the platform</CardDescription>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-1.5">
            <Link href="/admin/polls">View all</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-3 pr-4 font-semibold">Poll</th>
                  <th className="pb-3 pr-4 font-semibold">Category</th>
                  <th className="pb-3 pr-4 font-semibold">Author</th>
                  <th className="pb-3 pr-4 font-semibold">Participants</th>
                  <th className="pb-3 pr-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {adminPolls.map((poll) => (
                  <tr
                    key={poll.id}
                    className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40"
                  >
                    <td className="max-w-xs py-3 pr-4">
                      <p className="truncate font-medium text-foreground">
                        {poll.question}
                      </p>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant="secondary" className="text-[11px]">
                        {poll.category}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {poll.author}
                    </td>
                    <td className="py-3 pr-4 font-medium text-foreground">
                      {formatNumber(poll.participants)}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant="outline"
                        className={cn("capitalize", statusBadgeClass[poll.status])}
                      >
                        {poll.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {adminPolls.map((poll) => (
              <div
                key={poll.id}
                className="rounded-lg border border-border bg-muted/30 p-4"
              >
                <p className="font-medium text-foreground">{poll.question}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-[11px]">
                    {poll.category}
                  </Badge>
                  <span>•</span>
                  <span>{poll.author}</span>
                  <span>•</span>
                  <span>{formatNumber(poll.participants)} participants</span>
                </div>
                <div className="mt-2">
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusBadgeClass[poll.status])}
                  >
                    {poll.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="gap-1.5 sm:flex-1">
          <Link href="/admin/polls">
            <Plus className="h-4 w-4" />
            Create Poll
          </Link>
        </Button>
        <Button asChild variant="outline" className="gap-1.5 sm:flex-1">
          <Link href="/admin/reports">
            <FileText className="h-4 w-4" />
            View Reports
          </Link>
        </Button>
      </div>
    </div>
  );
}
