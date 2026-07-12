import { Globe2, Users, ArrowRight } from "lucide-react";
import { countries } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CountryBrowser() {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <Badge className="gap-1.5 bg-primary/10 text-primary">
            <Globe2 className="h-3.5 w-3.5" />
            54 Nations
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Explore polls by country
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            From Cairo to Cape Town, see what citizens across every region are
            voting on right now.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {countries.map((country) => (
            <Card
              key={country.code}
              className="group flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
            >
              <span
                className="text-4xl leading-none"
                aria-hidden="true"
              >
                {country.flag}
              </span>
              <div className="flex flex-1 flex-col">
                <h3 className="text-base font-semibold text-foreground">
                  {country.name}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{formatNumber(country.pollCount)} polls</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {formatNumber(country.activeUsers)} active
                  </span>
                </div>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 flex justify-center">
          <Button variant="outline" className="gap-2 rounded-full">
            View all 54 countries
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CountryBrowser;
