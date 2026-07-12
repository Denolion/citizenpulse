import { LayoutGrid, ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Categories() {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <Badge className="gap-1.5 bg-primary/10 text-primary">
            <LayoutGrid className="h-3.5 w-3.5" />
            Explore Topics
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Browse by category
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Discover polls across the topics that matter most to citizens
            across the continent.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
            >
              <div className="flex items-start gap-4">
                <span
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                    category.color
                  )}
                >
                  <category.icon className="h-6 w-6" />
                </span>
                <div className="flex flex-1 flex-col">
                  <h3 className="text-base font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="text-xs font-medium text-muted-foreground">
                  {formatNumber(category.pollCount)} polls
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
