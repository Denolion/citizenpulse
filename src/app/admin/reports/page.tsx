"use client";

import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Globe,
  FileBarChart,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const reportCards = [
  {
    title: "Voting Summary",
    description: "Overview of all votes cast across polls and categories.",
    icon: FileBarChart,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "User Engagement",
    description: "Engagement metrics including turnout and participation rates.",
    icon: Users,
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "Category Performance",
    description: "Poll performance breakdown by category and topic.",
    icon: BarChart3,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Country Analytics",
    description: "Regional insights and country-level voting patterns.",
    icon: Globe,
    color: "bg-rose-100 text-rose-700",
  },
];

const recentReports = [
  {
    id: "r1",
    name: "Q2 Voting Summary",
    type: "Voting Summary",
    date: "2026-07-10",
    status: "ready",
  },
  {
    id: "r2",
    name: "June User Engagement",
    type: "User Engagement",
    date: "2026-07-05",
    status: "ready",
  },
  {
    id: "r3",
    name: "Politics Category Report",
    type: "Category Performance",
    date: "2026-07-01",
    status: "processing",
  },
  {
    id: "r4",
    name: "Nigeria Country Analytics",
    type: "Country Analytics",
    date: "2026-06-28",
    status: "ready",
  },
  {
    id: "r5",
    name: "May Voting Summary",
    type: "Voting Summary",
    date: "2026-06-15",
    status: "ready",
  },
];

const reportStatusClass: Record<string, string> = {
  ready: "bg-green-100 text-green-700 border-green-200",
  processing: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Reports
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Generate and download reports to analyze platform performance.
        </p>
      </div>

      {/* Report generation cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportCards.map((report) => {
          const Icon = report.icon;
          return (
            <Card
              key={report.title}
              className="flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg"
            >
              <CardHeader className="space-y-3">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    report.color
                  )}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <CardTitle className="text-base">{report.title}</CardTitle>
                  <CardDescription className="mt-1 leading-relaxed">
                    {report.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button className="w-full gap-1.5">
                  <FileText className="h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent reports table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Reports</CardTitle>
          <CardDescription>Recently generated reports available for download</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-3 pr-4 font-semibold">Report Name</th>
                  <th className="pb-3 pr-4 font-semibold">Type</th>
                  <th className="pb-3 pr-4 font-semibold">Date</th>
                  <th className="pb-3 pr-4 font-semibold">Status</th>
                  <th className="pb-3 pr-4 text-right font-semibold">Download</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          <FileText className="h-4 w-4" />
                        </span>
                        <span className="font-medium text-foreground">
                          {report.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {report.type}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(report.date)}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "capitalize",
                          reportStatusClass[report.status]
                        )}
                      >
                        {report.status === "ready" ? (
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                        ) : (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {report.status}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5"
                        disabled={report.status !== "ready"}
                        aria-label={`Download ${report.name}`}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="rounded-lg border border-border bg-muted/30 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <FileText className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.type}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "shrink-0 capitalize",
                      reportStatusClass[report.status]
                    )}
                  >
                    {report.status === "ready" ? (
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                    ) : (
                      <Clock className="mr-1 h-3 w-3" />
                    )}
                    {report.status}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(report.date)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    disabled={report.status !== "ready"}
                    aria-label={`Download ${report.name}`}
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Export Options</CardTitle>
          <CardDescription>
            Download a comprehensive export of platform data in your preferred format.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" className="gap-2 sm:flex-1">
              <FileSpreadsheet className="h-5 w-5 text-green-600" />
              <span className="flex flex-col items-start">
                <span className="text-sm font-semibold">Export as CSV</span>
                <span className="text-xs font-normal text-muted-foreground">
                  Spreadsheet-compatible format
                </span>
              </span>
            </Button>
            <Button variant="outline" className="gap-2 sm:flex-1">
              <FileText className="h-5 w-5 text-red-600" />
              <span className="flex flex-col items-start">
                <span className="text-sm font-semibold">Export as PDF</span>
                <span className="text-xs font-normal text-muted-foreground">
                  Print-ready document format
                </span>
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
