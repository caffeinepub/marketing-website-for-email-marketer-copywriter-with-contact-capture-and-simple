import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface CreateInquiryParams {
  name: string;
  email: string;
  company: string | null;
  message: string;
  serviceInterest: string;
}

export function useCreateInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateInquiryParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createInquiry(
        params.name,
        params.email,
        params.company,
        params.message,
        params.serviceInterest
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}
