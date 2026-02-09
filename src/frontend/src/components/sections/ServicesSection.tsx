import Section from '../layout/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { COPY } from '../../content/copy';

export default function ServicesSection() {
  return (
    <Section id="services" title={COPY.services.title} description={COPY.services.description}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {COPY.services.items.map((service, index) => (
          <Card key={index} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <img
                  src="/assets/generated/icons-set.dim_512x512.png"
                  alt={service.title}
                  className="h-8 w-8 object-contain"
                  style={{
                    objectPosition: `${(index % 3) * -32}px 0`,
                  }}
                />
              </div>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{service.description}</CardDescription>
              <ul className="mt-4 space-y-2">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
