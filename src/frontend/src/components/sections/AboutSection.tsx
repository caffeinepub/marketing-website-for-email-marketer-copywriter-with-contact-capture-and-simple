import Section from '../layout/Section';
import { COPY } from '../../content/copy';

export default function AboutSection() {
  return (
    <Section id="about" title={COPY.about.title}>
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        {COPY.about.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
