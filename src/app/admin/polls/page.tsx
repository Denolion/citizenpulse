"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { adminPolls } from "@/lib/data";
import { cn, formatDate, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type StatusFilter = "all" | "active" | "closed" | "draft";

const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Closed", value: "closed" },
  { label: "Draft", value: "draft" },
];

const statusBadgeClass: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
  draft: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function ManagePollsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredPolls = useMemo(() => {
    return adminPolls.filter((poll) => {
      const matchesSearch =
        poll.question.toLowerCase().includes(search.toLowerCase()) ||
        poll.author.toLowerCase().includes(search.toLowerCase()) ||
        poll.category.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || poll.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Manage Polls
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, edit, and moderate polls across the platform.
          </p>
        </div>
        <Button asChild className="gap-1.5">
          <Link href="/admin/polls/create">
            <Plus className="h-4 w-4" />
            Create Poll
          </Link>
        </Button>
      </div>

      {/* Search and filter bar */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by question, author, or category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 border-border/70 bg-muted/40 pl-9 pr-4"
              aria-label="Search polls"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:inline-flex">
              <Filter className="h-4 w-4" />
              Filter:
            </span>
            <div className="flex items-center gap-1.5">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setStatusFilter(filter.value)}
                  aria-pressed={statusFilter === filter.value}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    statusFilter === filter.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Polls table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">
            Polls{" "}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              ({filteredPolls.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-3 pr-4 font-semibold">Poll Question</th>
                  <th className="pb-3 pr-4 font-semibold">Category</th>
                  <th className="pb-3 pr-4 font-semibold">Author</th>
                  <th className="pb-3 pr-4 font-semibold">Country</th>
                  <th className="pb-3 pr-4 font-semibold">Participants</th>
                  <th className="pb-3 pr-4 font-semibold">Status</th>
                  <th className="pb-3 pr-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPolls.map((poll) => (
                  <tr
                    key={poll.id}
                    className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40"
                  >
                    <td className="max-w-xs py-3 pr-4">
                      <p className="truncate font-medium text-foreground">
                        {poll.question}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(poll.createdAt)}
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
                    <td className="py-3 pr-4 text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span aria-hidden="true">{poll.flag}</span>
                        {poll.country}
                      </span>
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
                    <td className="py-3 pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`Edit ${poll.question}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          aria-label={`Delete ${poll.question}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPolls.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No polls found matching your filters.
              </p>
            )}
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 lg:hidden">
            {filteredPolls.map((poll) => (
              <div
                key={poll.id}
                className="rounded-lg border border-border bg-muted/30 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-foreground">{poll.question}</p>
                  <Badge
                    variant="outline"
                    className={cn("shrink-0 capitalize", statusBadgeClass[poll.status])}
                  >
                    {poll.status}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-[11px]">
                    {poll.category}
                  </Badge>
                  <span>•</span>
                  <span>{poll.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span aria-hidden="true">{poll.flag}</span>
                    {poll.country}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {formatNumber(poll.participants)} participants
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1.5"
                      aria-label={`Edit ${poll.question}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Delete ${poll.question}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredPolls.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No polls found matching your filters.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
