import { useState } from 'react';
import Section from '../layout/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { useCreateInquiry } from '../../hooks/useCreateInquiry';
import { COPY } from '../../content/copy';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    serviceInterest: '',
  });

  const createInquiry = useCreateInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message || !formData.serviceInterest) {
      return;
    }

    try {
      await createInquiry.mutateAsync({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        message: formData.message,
        serviceInterest: formData.serviceInterest,
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        serviceInterest: '',
      });
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
            {createInquiry.isSuccess ? (
              <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  {COPY.contact.successMessage}
                </AlertDescription>
              </Alert>
            ) : createInquiry.isError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{COPY.contact.errorMessage}</AlertDescription>
              </Alert>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="John Doe"
                    required
                    disabled={createInquiry.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john@company.com"
                    required
                    disabled={createInquiry.isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company / Website</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Acme Inc."
                  disabled={createInquiry.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceInterest">
                  Service Interest <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.serviceInterest}
                  onValueChange={(value) => handleChange('serviceInterest', value)}
                  disabled={createInquiry.isPending}
                  required
                >
                  <SelectTrigger id="serviceInterest">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {COPY.services.items.map((service) => (
                      <SelectItem key={service.title} value={service.title}>
                        {service.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell me about your email marketing needs..."
                  rows={6}
                  required
                  disabled={createInquiry.isPending}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={createInquiry.isPending}>
                {createInquiry.isPending ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {COPY.contact.submitButton}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
