import Image from "next/image";
import { Newspaper, ArrowRight, Clock } from "lucide-react";
import { newsItems } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function LatestNews() {
  const [featured, ...rest] = newsItems;

  return (
    <section id="news" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <Badge className="w-fit gap-1.5 bg-primary/10 text-primary">
            <Newspaper className="h-3.5 w-3.5" />
            Latest News
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Insights &amp; analysis
          </h2>
        </div>
        <Button variant="outline" className="gap-2 rounded-full">
          All articles
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Featured article */}
        <Card className="group relative overflow-hidden">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
            <div className="absolute left-4 top-4">
              <Badge className="bg-primary text-primary-foreground">
                {featured.category}
              </Badge>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="mb-2 text-xl font-bold leading-snug text-white sm:text-2xl">
                {featured.title}
              </h3>
              <p className="mb-3 line-clamp-2 text-sm text-white/80">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-white/70">
                <span className="font-medium text-white">
                  {featured.author}
                </span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {featured.readTime}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Side articles */}
        <div className="flex flex-col gap-4">
          {rest.map((item) => (
            <Card
              key={item.id}
              className="group flex gap-4 overflow-hidden p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
            >
              <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col py-1">
                <Badge
                  variant="secondary"
                  className="mb-2 w-fit text-[10px]"
                >
                  {item.category}
                </Badge>
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                  {item.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                  <span>{item.author}</span>
                  <span>·</span>
                  <span>{item.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.readTime}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestNews;
