import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TherapistHero } from "@/components/therapist-hero";
import { Features } from "@/components/features";
import { MainNav } from "@/components/main-nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <TherapistHero />
      <Features />
    </div>
  );
}