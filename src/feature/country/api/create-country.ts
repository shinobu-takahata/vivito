import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/supabaseClient';
import { MutationConfig } from '@/lib/react-query';
import { getCountriesQueryOptions } from './get-countries';

export const createCountryInputSchema = z.object({
  countryName: z.string().min(1, 'Required'),
});
// フォームの入力データの型定義
export type CreateCommentInput = z.infer<typeof createCountryInputSchema>;

// Supabaseに国を登録する関数
const createCountry = async (data: CreateCommentInput) => {
  const { data: insertedData, error } = await supabase
    .from('countries')
    .insert([{ name: data.countryName }]);

  if (error) {
    throw new Error(error.message);
  }

  return insertedData;
};

type UseCreateCountryOptions = {
  mutationConfig?: MutationConfig<typeof createCountry>;
};

export const useCreateCountry = ({
  mutationConfig,
}: UseCreateCountryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCountriesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createCountry,
  });
};
