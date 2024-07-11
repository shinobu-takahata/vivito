import { getCountriesQueryOptions } from '@/feature/country/api/get-countries';
import { QueryClient } from '@tanstack/react-query';

export const countriesLoader = (queryClient: QueryClient) => async () => {
  const query = getCountriesQueryOptions();

  const data =
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query));
  return { countries: data };
};
