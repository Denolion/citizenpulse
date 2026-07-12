import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PollCard } from "@/components/poll-card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { allPolls, categories } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.id }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.id === params.slug);
  const polls = allPolls.filter(
    (p) => p.category.toLowerCase() === category?.name.toLowerCase()
  );

  if (!category) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Category not found</p>
        </main>
        <Footer />
      </>
    );
  }

  const Icon = category.icon;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.color}`}>
              <Icon className="h-7 w-7" strokeWidth={2} />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">
                {category.name}
              </h1>
              <p className="mt-1 text-muted-foreground">{category.description}</p>
            </div>
          </div>

          <div className="mt-4">
            <Badge variant="secondary">{category.pollCount.toLocaleString()} polls</Badge>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {polls.length > 0 ? (
              polls.map((poll) => <PollCard key={poll.id} poll={poll} />)
            ) : (
              <p className="col-span-full text-muted-foreground">
                No polls in this category yet. Check back soon!
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
