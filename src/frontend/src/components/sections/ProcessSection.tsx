import Section from '../layout/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../primitives/Card';
import { COPY } from '../../content/copy';

export default function ProcessSection() {
  return (
    <Section
      id="process"
      title={COPY.process.title}
      description={COPY.process.description}
      className="bg-accent/5"
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {COPY.process.steps.map((step, index) => (
          <div key={index} className="relative">
            <Card className="h-full">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardContent>
            </Card>
            {index < COPY.process.steps.length - 1 && (
              <div className="absolute right-0 top-1/2 hidden h-0.5 w-8 -translate-y-1/2 translate-x-full bg-border lg:block" />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
