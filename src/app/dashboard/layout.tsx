"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  Bookmark,
  CheckCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  UserPlus,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Votes", href: "/dashboard/votes", icon: CheckCircle },
  { label: "Saved Polls", href: "/dashboard/saved", icon: Bookmark },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Profile Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll while the mobile sidebar drawer is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile drawer when a navigation link is tapped.
  const closeMobile = () => setMobileOpen(false);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Top navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8"
          aria-label="Dashboard navigation"
        >
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
            aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={mobileOpen}
            aria-controls="dashboard-sidebar"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="CitizenPulse home"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/20">
              <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="hidden text-lg font-bold tracking-tight sm:inline">
              <span className="text-foreground">Citizen</span>
              <span className="gradient-text">Pulse</span>
            </span>
          </Link>

          {/* Search */}
          <div className="relative ml-2 hidden flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search polls, topics, countries…"
              className="h-10 max-w-md border-border/70 bg-muted/40 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:bg-background"
              aria-label="Search polls, topics, countries"
            />
          </div>

          {/* Right-side actions */}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden gap-1.5 sm:inline-flex">
              <UserPlus className="h-4 w-4" />
              Invite
            </Button>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-muted"
              aria-label="View profile"
            >
              <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white">
                  AO
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </nav>
      </header>

      {/* Body: sidebar + main content */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        {/* Desktop sidebar */}
        <aside
          className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 lg:block"
          aria-label="Dashboard sidebar"
        >
          <nav className="flex h-full flex-col py-6 pr-6">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span>Back to site</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Mobile sidebar drawer */}
        <div
          className={cn(
            "lg:hidden",
            mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          {/* Backdrop */}
          <div
            className={cn(
              "fixed inset-0 top-16 z-30 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300",
              mobileOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div
            id="dashboard-sidebar"
            className={cn(
              "absolute left-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 max-w-[85vw] border-r border-border bg-background shadow-premium-lg transition-transform duration-300",
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <nav className="flex h-full flex-col py-6 pl-4 pr-4" aria-label="Mobile dashboard sidebar">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto border-t border-border pt-2">
                <Link
                  href="/"
                  onClick={closeMobile}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  <span>Back to site</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <main className="min-w-0 flex-1 py-6 lg:py-8">{children}</main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} CitizenPulse. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built for the voices of Africa
            <span className="text-secondary">●</span>
            One poll at a time
          </p>
        </div>
      </footer>
    </div>
  );
}
