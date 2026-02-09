import Section from '../layout/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../primitives/Card';
import { SiX, SiInstagram } from 'react-icons/si';
import { Mail } from 'lucide-react';
import { COPY } from '../../content/copy';

export default function ContactSection() {
  return (
    <Section
      id="contact"
      title={COPY.contact.title}
      description={COPY.contact.description}
      className="bg-accent/5"
    >
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>{COPY.contact.formTitle}</CardTitle>
            <CardDescription>{COPY.contact.formDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-center text-muted-foreground">
                I'd love to hear from you! Reach out directly via email or send me a DM on social media.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:quillworksmedia@gmail.com"
                  className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send email to quillworksmedia@gmail.com"
                >
                  <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="font-medium">Email me directly</span>
                </a>

                <a
                  href="https://x.com/QuillworksMedia"
                  className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send direct message on X (Twitter) to @QuillworksMedia"
                >
                  <SiX className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="font-medium">DM me on X (Twitter)</span>
                </a>

                <a
                  href="https://www.instagram.com/quillworks_media_/?utm_source=ig_web_button_share_sheet"
                  className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send direct message on Instagram to @quillworks_media_"
                >
                  <SiInstagram className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="font-medium">DM me on Instagram</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
