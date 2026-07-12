"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ChevronDown,
  LogIn,
  Menu,
  Search,
  Sparkles,
  UserPlus,
  X,
} from "lucide-react";
import { navCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const VISIBLE_COUNT = 4;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const visibleLinks = navCategories.slice(0, VISIBLE_COUNT);
  const moreLinks = navCategories.slice(VISIBLE_COUNT);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-border/60 shadow-premium"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-18 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="CitizenPulse home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/20">
            <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-secondary ring-2 ring-background" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-foreground">Citizen</span>
            <span className="gradient-text">Pulse</span>
          </span>
        </Link>

        {/* Desktop search */}
        <div className="relative hidden flex-1 lg:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search polls, topics, countries…"
            className="h-10 max-w-md border-border/70 bg-muted/40 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:bg-background"
            aria-label="Search polls, topics, countries"
          />
        </div>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 lg:flex">
          {visibleLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          {moreLinks.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="More navigation"
                >
                  More
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  Explore
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {moreLinks.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

       {/* Desktop auth buttons */}
<div className="ml-auto hidden items-center gap-2 lg:flex">
  <Button asChild variant="ghost" size="sm" className="gap-1.5">
    <Link href="/login">
      <LogIn className="h-4 w-4" />
      Login
    </Link>
  </Button>

  <Button asChild size="sm" className="gap-1.5">
    <Link href="/signup">
      <UserPlus className="h-4 w-4" />
      Sign Up
    </Link>
  </Button>
</div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 top-16 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        {/* Panel */}
        <div
          className={cn(
            "absolute inset-x-0 top-16 origin-top border-b border-border bg-background shadow-premium-lg transition-all duration-300",
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          )}
        >
          <div className="space-y-5 px-4 py-6 sm:px-6">
            {/* Mobile search */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search polls, topics, countries…"
                className="h-11 border-border/70 bg-muted/40 pl-9 pr-4"
                aria-label="Search polls, topics, countries"
              />
            </div>

            {/* Mobile nav links */}
            <nav className="grid gap-1">
              {navCategories.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile auth buttons */}
<div className="grid grid-cols-2 gap-3 pt-2">
  <Button asChild variant="outline" className="gap-1.5">
    <Link href="/login" onClick={() => setMobileOpen(false)}>
      <LogIn className="h-4 w-4" />
      Login
    </Link>
  </Button>

  <Button asChild className="gap-1.5">
    <Link href="/signup" onClick={() => setMobileOpen(false)}>
      <UserPlus className="h-4 w-4" />
      Sign Up
    </Link>
  </Button>
</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
