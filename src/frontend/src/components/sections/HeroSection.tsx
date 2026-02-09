import { Button } from '../primitives/Button';
import { ArrowRight } from 'lucide-react';
import { COPY } from '../../content/copy';
import { LABELS } from '../../content/labels';

export default function HeroSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 px-4 py-20 md:py-32">
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {COPY.hero.headline}
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl">
                {COPY.hero.subheadline}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" onClick={scrollToContact} className="group">
                {COPY.hero.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  servicesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {LABELS.cta.learnMore}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video overflow-hidden rounded-2xl border bg-muted shadow-2xl">
              <img
                src="/assets/generated/hero-illustration.dim_1600x900.png"
                alt="Email copywriting illustration"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
