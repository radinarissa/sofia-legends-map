import HeroSection from "../components/home/HeroSection";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <title>Легендите на София</title>
      <HeroSection />
    </div>
  );
}