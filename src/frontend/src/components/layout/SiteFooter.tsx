import { Heart } from 'lucide-react';
import { SiX } from 'react-icons/si';
import { NAV_ITEMS } from '../../lib/navigation';

export default function SiteFooter() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t bg-accent/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <img
              src="/assets/generated/logo-quillworks.dim_512x256.png"
              alt="Quillworks Media Logo"
              className="mb-4 h-8 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              Professional email copywriting services that drive results for your business.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Get in Touch</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ready to transform your email marketing? Let's talk about how I can help your business grow.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/QuillworksMedia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter/X"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <SiX className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © 2026. Built with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
