import { useEffect, useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useCurrentUserProfile';
import { useListInquiries, useDeleteInquiry } from '../hooks/useAdminInquiries';
import LoginButton from '../components/auth/LoginButton';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Mail, Building2, Calendar, MessageSquare } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import type { Inquiry } from '../backend';

export default function AdminInboxPage() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: inquiries, isLoading: inquiriesLoading } = useListInquiries();
  const deleteInquiry = useDeleteInquiry();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    if (selectedInquiry && inquiries) {
      const updated = inquiries.find(i => i.id === selectedInquiry.id);
      if (!updated) {
        setSelectedInquiry(null);
      }
    }
  }, [inquiries, selectedInquiry]);

  const handleDelete = async (id: bigint) => {
    try {
      await deleteInquiry.mutateAsync(id);
      toast.success('Inquiry deleted successfully');
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch (error) {
      toast.error('Failed to delete inquiry');
      console.error('Delete error:', error);
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <CardDescription>Please log in to access the admin inbox</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <LoginButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showProfileSetup) {
    return <ProfileSetupModal />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inquiry Inbox</h1>
          <p className="mt-2 text-muted-foreground">
            Manage client inquiries and contact requests
          </p>
        </div>
        <LoginButton />
      </div>

      {inquiriesLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="text-muted-foreground">Loading inquiries...</p>
          </div>
        </div>
      ) : !inquiries || inquiries.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <Mail className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No inquiries yet</h3>
              <p className="text-sm text-muted-foreground">
                New contact form submissions will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              All Inquiries ({inquiries.length})
            </h2>
            <div className="space-y-3">
              {inquiries.map((inquiry) => (
                <Card
                  key={inquiry.id.toString()}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    selectedInquiry?.id === inquiry.id ? 'border-primary bg-accent' : ''
                  }`}
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base">{inquiry.name}</CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-2 text-xs">
                          <Mail className="h-3 w-3" />
                          {inquiry.email}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {inquiry.serviceInterest}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {inquiry.message}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatDate(inquiry.timestamp)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-4 lg:h-fit">
            {selectedInquiry ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedInquiry.name}</CardTitle>
                      <CardDescription className="mt-2 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <a
                          href={`mailto:${selectedInquiry.email}`}
                          className="hover:underline"
                        >
                          {selectedInquiry.email}
                        </a>
                      </CardDescription>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this inquiry? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(selectedInquiry.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedInquiry.company && (
                    <div className="flex items-start gap-3">
                      <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Company</p>
                        <p className="text-sm text-muted-foreground">{selectedInquiry.company}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <MessageSquare className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Service Interest</p>
                      <Badge variant="outline" className="mt-1">
                        {selectedInquiry.serviceInterest}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Received</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(selectedInquiry.timestamp)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="mb-2 text-sm font-medium">Message</p>
                    <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                      {selectedInquiry.message}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <Button asChild className="w-full">
                      <a href={`mailto:${selectedInquiry.email}?subject=Re: Your Inquiry`}>
                        Reply via Email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex min-h-[400px] items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MessageSquare className="mx-auto mb-4 h-12 w-12" />
                    <p>Select an inquiry to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
