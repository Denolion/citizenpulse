"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bookmark,
  CheckCircle2,
  Flame,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  allPolls,
  savedPolls,
  userNotifications,
  userVotes,
} from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PollCard } from "@/components/poll-card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const stats = [
  {
    label: "Polls Voted",
    value: userVotes.length,
    icon: CheckCircle2,
    color: "bg-primary/10 text-primary",
    href: "/dashboard/votes",
  },
  {
    label: "Saved Polls",
    value: savedPolls.length,
    icon: Bookmark,
    color: "bg-secondary/10 text-secondary",
    href: "/dashboard/saved",
  },
  {
    label: "Notifications",
    value: userNotifications.filter((n) => !n.read).length,
    icon: Bell,
    color: "bg-orange-100 text-orange-700",
    href: "/dashboard/notifications",
  },
  {
    label: "Engagement Score",
    value: "87%",
    icon: TrendingUp,
    color: "bg-green-100 text-green-700",
    href: "#",
  },
];

export default function DashboardOverviewPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  useEffect(() => {
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserName(
        user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
      );
    }
  };

  getUser();
}, []);
  useEffect(() => {
    console.log("DASHBOARD CHECK RUNNING");
  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login");
    }
  };

  checkUser();
}, [router]);
  const unreadCount = userNotifications.filter((n) => !n.read).length;
  const recommended = allPolls.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border border-border">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-lg font-semibold text-white">
              AO
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back, {userName}!
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s what&apos;s happening with your polls today.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="gap-1.5">
            <Link href="/#trending">
              <BarChart3 className="h-4 w-4" />
              Browse Polls
            </Link>
          </Button>
          <Button asChild className="gap-1.5">
            <Link href="/#create">
              <Plus className="h-4 w-4" />
              Create Poll
            </Link>
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg"
            >
              <CardContent className="flex items-center gap-4 p-5">
                <span
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    stat.color
                  )}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-0.5 text-2xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent activity + quick actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-lg">Recent activity</CardTitle>
              <CardDescription>Polls you&apos;ve voted on recently</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="gap-1.5">
              <Link href="/dashboard/votes">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {userVotes.map((vote) => (
              <div
                key={vote.pollId}
                className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/60"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium text-foreground">
                    {vote.question}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-[11px]">
                      {vote.category}
                    </Badge>
                    <span className="flex items-center gap-1">
                      Your choice:
                      <span className="font-semibold text-primary">
                        {vote.choice}
                      </span>
                    </span>
                    <span aria-hidden="true">•</span>
                    <span>{formatDate(vote.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              Quick actions
            </CardTitle>
            <CardDescription>Jump back in where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start gap-2">
              <Link href="/#trending">
                <Flame className="h-4 w-4" />
                Browse trending polls
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/#create">
                <Plus className="h-4 w-4" />
                Create a new poll
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/dashboard/saved">
                <Bookmark className="h-4 w-4" />
                View saved polls
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/dashboard/notifications">
                <Bell className="h-4 w-4" />
                {unreadCount > 0
                  ? `Notifications (${unreadCount} new)`
                  : "Notifications"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recommended polls */}
      <div>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-2 w-fit gap-1.5 bg-primary/10 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Recommended for you
            </Badge>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Polls you might like
            </h2>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/#trending">
              See more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      </div>
    </div>
  );
}
