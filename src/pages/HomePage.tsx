import HeroSection from '../components/landing/HeroSection';
import HowItWorks from '../components/landing/HowItWorks';
import FAQ from '../components/landing/FAQ';
import FeatureSection from '../components/landing/FeatureSection';
import CTASection from '../components/landing/CTASection';
import PromoBanner from '../components/landing/PromoBanner';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <FeatureSection />
      <PromoBanner />
      <FAQ />
      <CTASection />
    </div>
  );
}
