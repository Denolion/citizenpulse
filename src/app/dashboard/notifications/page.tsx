"use client";

import { useMemo, useState } from "react";
import {
  BarChart2,
  Bell,
  BellOff,
  CheckCheck,
  Heart,
  Info,
  Settings as SettingsIcon,
} from "lucide-react";
import { userNotifications } from "@/lib/data";
import type { Notification } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type NotificationType = Notification["type"];

const typeMeta: Record<
  NotificationType,
  { icon: typeof BarChart2; color: string; label: string }
> = {
  vote: { icon: BarChart2, color: "bg-primary/10 text-primary", label: "Vote" },
  result: { icon: Bell, color: "bg-secondary/10 text-secondary", label: "Result" },
  system: { icon: Info, color: "bg-blue-100 text-blue-700", label: "System" },
  social: { icon: Heart, color: "bg-rose-100 text-rose-700", label: "Social" },
};

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(() =>
    userNotifications.map((n) => ({ ...n }))
  );

  const unreadCount = useMemo(
    () => items.filter((n) => !n.read).length,
    [items]
  );

  const markAllAsRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}.`
              : "You're all caught up."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </div>

      {/* List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              All notifications
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              {items.length} total
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <BellOff className="h-7 w-7" />
              </span>
              <p className="text-sm text-muted-foreground">
                No notifications yet.
              </p>
            </div>
          ) : (
            items.map((n) => {
              const meta = typeMeta[n.type];
              const Icon = meta.icon;
              return (
                <button
                  type="button"
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  aria-label={`Mark "${n.title}" as read`}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors",
                    n.read
                      ? "border-border bg-background hover:bg-muted/50"
                      : "border-primary/20 bg-primary/5 hover:bg-primary/10"
                  )}
                >
                  <span
                    className={cn(
                      "relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      meta.color
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {!n.read && (
                      <span
                        className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-primary ring-2 ring-background"
                        aria-label="Unread"
                      >
                        <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
                      </span>
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p
                        className={cn(
                          "text-sm",
                          n.read
                            ? "font-medium text-foreground"
                            : "font-semibold text-foreground"
                        )}
                      >
                        {n.title}
                      </p>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {meta.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {n.message}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {n.time}
                    </p>
                  </div>

                  {!n.read && (
                    <span
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Footer hint */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <SettingsIcon className="h-3.5 w-3.5" />
        <span>
          Manage notification preferences in{" "}
          <a
            href="/dashboard/settings"
            className="font-medium text-primary hover:underline"
          >
            Profile Settings
          </a>
        </span>
      </div>
    </div>
  );
}
