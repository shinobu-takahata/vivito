import { QueryConfig } from '@/lib/react-query';
import { supabase } from '@/supabaseClient';
import { queryOptions, useQuery } from '@tanstack/react-query';

interface Country {
  id: number;
  name: string;
}
async function fetchCountries(): Promise<Country[]> {
  const { data, error } = await supabase.from('countries').select();
  if (error) throw new Error(error.message);
  return data as Country[];
}

export const getCountriesQueryOptions = () => {
  return queryOptions({
    queryKey: ['countries'],
    queryFn: () => fetchCountries(),
  });
};

type UseCountriesOptions = {
  queryConfig?: QueryConfig<typeof getCountriesQueryOptions>;
};
export const useCounries = ({ queryConfig }: UseCountriesOptions = {}) => {
  return useQuery({
    ...getCountriesQueryOptions(),
    ...queryConfig,
  });
};
