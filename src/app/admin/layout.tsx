"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Menu,
  Search,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Manage Polls", href: "/admin/polls", icon: BarChart3 },
  { label: "Manage Users", href: "/admin/users", icon: Users },
  { label: "Categories", href: "/admin/categories", icon: LayoutGrid },
  { label: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { label: "Reports", href: "/admin/reports", icon: FileText },
];

export default function AdminLayout({
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

  const closeMobile = () => setMobileOpen(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Top navbar (shared site nav) */}
      <Navbar />

      {/* Admin header bar */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          {/* Mobile sidebar toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
            aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={mobileOpen}
            aria-controls="admin-sidebar"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
              <LayoutDashboard className="h-4 w-4" />
            </span>
            Admin Panel
          </span>

          {/* Search */}
          <div className="relative ml-2 hidden flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search admin…"
              className="h-9 max-w-md border-border/70 bg-muted/40 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:bg-background"
              aria-label="Search admin"
            />
          </div>

          {/* Admin avatar */}
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-tight text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@citizenpulse.io</p>
            </div>
            <Avatar className="h-9 w-9 border border-border">
              <AvatarFallback className="bg-gradient-to-br from-foreground to-foreground/80 text-sm font-semibold text-background">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Body: sidebar + main content */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        {/* Desktop sidebar */}
        <aside
          className="sticky top-30 hidden h-[calc(100vh-7.5rem)] w-64 shrink-0 lg:block"
          aria-label="Admin sidebar"
        >
          <nav className="flex h-full flex-col rounded-xl bg-foreground text-background">
            <div className="flex-1 overflow-y-auto p-4">
              <p className="px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-wider text-background/50">
                Management
              </p>
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
                            ? "bg-background/15 text-background"
                            : "text-background/70 hover:bg-background/10 hover:text-background"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-background/10 p-4">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-background/70 transition-colors hover:bg-background/10 hover:text-background"
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
              "fixed inset-0 top-30 z-30 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300",
              mobileOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div
            id="admin-sidebar"
            className={cn(
              "absolute left-0 top-30 z-40 h-[calc(100vh-7.5rem)] w-72 max-w-[85vw] rounded-r-xl bg-foreground text-background shadow-premium-lg transition-transform duration-300",
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <nav
              className="flex h-full flex-col p-4"
              aria-label="Mobile admin sidebar"
            >
              <div className="flex-1 overflow-y-auto">
                <p className="px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-wider text-background/50">
                  Management
                </p>
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
                              ? "bg-background/15 text-background"
                              : "text-background/70 hover:bg-background/10 hover:text-background"
                          )}
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="border-t border-background/10 pt-2">
                <Link
                  href="/"
                  onClick={closeMobile}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-background/70 transition-colors hover:bg-background/10 hover:text-background"
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
      <Footer />
    </div>
  );
}
