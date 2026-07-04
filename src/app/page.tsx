import HeroSection from "@/components/heroSection/heroSection";
import WeeklyPortion from "@/components/weekly-portion/WeeklyPortion";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <HeroSection />
      <WeeklyPortion />
    </div>
  );
}
