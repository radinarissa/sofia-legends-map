import HeroSection from "../components/home/HeroSection";
import DailyLegend from "../components/home/DailyLegend";
import FeaturedLegends from "../components/home/FeaturedLegends";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <title>Легендите на София</title>
      <HeroSection />
      <DailyLegend />
      <FeaturedLegends />
    </div>
  );
}