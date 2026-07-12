"use client";

import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { categories } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Categories
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize polls into categories to help users discover relevant content.
          </p>
        </div>
        <Button asChild className="gap-1.5">
          <Link href="/admin/categories">
            <Plus className="h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      {/* Category grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                      category.color
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label={`Edit ${category.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Delete ${category.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="mt-1 leading-relaxed">
                    {category.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm text-muted-foreground">Polls</span>
                  <span className="text-lg font-bold text-foreground">
                    {formatNumber(category.pollCount)}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
