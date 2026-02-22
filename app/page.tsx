import { HeroCarousel } from "@/components/hero-carousel";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { GallerySection } from "@/components/gallery-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default async function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <GallerySection />
      <FaqSection />
      <Footer />
    </main>
  );
}
