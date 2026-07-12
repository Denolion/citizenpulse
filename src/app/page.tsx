import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { TrendingPolls } from "@/components/sections/trending-polls";
import { Categories } from "@/components/sections/categories";
import { LiveResults } from "@/components/sections/live-results";
import { CountryBrowser } from "@/components/sections/country-browser";
import { LatestNews } from "@/components/sections/latest-news";
import { CreatePollCta as CreatePollCTA } from "@/components/sections/create-poll-cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrendingPolls />
        <Categories />
        <LiveResults />
        <CountryBrowser />
        <LatestNews />
        <CreatePollCTA />
      </main>
      <Footer />
    </>
  );
}
