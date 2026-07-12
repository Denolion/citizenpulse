"use client";

import { useMemo, useState } from "react";
import {
  Ban,
  Eye,
  Search,
  UserCheck,
} from "lucide-react";
import { adminUsers } from "@/lib/data";
import { cn, formatDate, formatNumber } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const statusBadgeClass: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  suspended: "bg-red-100 text-red-700 border-red-200",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ManageUsersPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return adminUsers.filter((user) => {
      const q = search.toLowerCase();
      return (
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.country.toLowerCase().includes(q)
      );
    });
  }, [search]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Manage Users
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View, search, and moderate user accounts on the platform.
        </p>
      </div>

      {/* Search bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users by name, email, or country…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 border-border/70 bg-muted/40 pl-9 pr-4"
              aria-label="Search users"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">
            Users{" "}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              ({filteredUsers.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-3 pr-4 font-semibold">User</th>
                  <th className="pb-3 pr-4 font-semibold">Email</th>
                  <th className="pb-3 pr-4 font-semibold">Country</th>
                  <th className="pb-3 pr-4 font-semibold">Joined</th>
                  <th className="pb-3 pr-4 font-semibold">Polls Created</th>
                  <th className="pb-3 pr-4 font-semibold">Votes Cast</th>
                  <th className="pb-3 pr-4 font-semibold">Status</th>
                  <th className="pb-3 pr-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-border">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-xs font-semibold text-white">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span aria-hidden="true">{user.flag}</span>
                        {user.country}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {formatDate(user.joinedDate)}
                    </td>
                    <td className="py-3 pr-4 font-medium text-foreground">
                      {user.pollsCreated}
                    </td>
                    <td className="py-3 pr-4 font-medium text-foreground">
                      {formatNumber(user.votesCast)}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant="outline"
                        className={cn("capitalize", statusBadgeClass[user.status])}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`View ${user.name}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-8 w-8",
                            user.status === "suspended"
                              ? "text-green-600 hover:bg-green-50 hover:text-green-700"
                              : "text-destructive hover:bg-destructive/10 hover:text-destructive"
                          )}
                          aria-label={
                            user.status === "suspended"
                              ? `Reactivate ${user.name}`
                              : `Suspend ${user.name}`
                          }
                        >
                          {user.status === "suspended" ? (
                            <UserCheck className="h-4 w-4" />
                          ) : (
                            <Ban className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No users found matching your search.
              </p>
            )}
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 lg:hidden">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="rounded-lg border border-border bg-muted/30 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-xs font-semibold text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("shrink-0 capitalize", statusBadgeClass[user.status])}
                  >
                    {user.status}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span aria-hidden="true">{user.flag}</span>
                    {user.country}
                  </span>
                  <span>•</span>
                  <span>Joined {formatDate(user.joinedDate)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Polls:{" "}
                      <span className="font-semibold text-foreground">
                        {user.pollsCreated}
                      </span>
                    </span>
                    <span className="text-muted-foreground">
                      Votes:{" "}
                      <span className="font-semibold text-foreground">
                        {formatNumber(user.votesCast)}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1.5"
                      aria-label={`View ${user.name}`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-8 gap-1.5",
                        user.status === "suspended"
                          ? "text-green-600 hover:bg-green-50 hover:text-green-700"
                          : "text-destructive hover:bg-destructive/10 hover:text-destructive"
                      )}
                      aria-label={
                        user.status === "suspended"
                          ? `Reactivate ${user.name}`
                          : `Suspend ${user.name}`
                      }
                    >
                      {user.status === "suspended" ? (
                        <>
                          <UserCheck className="h-3.5 w-3.5" />
                          Activate
                        </>
                      ) : (
                        <>
                          <Ban className="h-3.5 w-3.5" />
                          Suspend
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No users found matching your search.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
