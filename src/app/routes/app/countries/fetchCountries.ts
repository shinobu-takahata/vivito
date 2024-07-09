import { supabase } from "@/supabaseClient";
import { QueryClient, QueryKey, QueryFunction } from "@tanstack/react-query";

interface Country {
  id: number;
  name: string;
}

async function fetchCountries(): Promise<Country[]> {
  const { data, error } = await supabase.from("countries").select();
  if (error) throw new Error(error.message);
  return data as Country[];
}

export const countriesLoader = (queryClient: QueryClient) => async () => {
  const queryKey: QueryKey = ["countries"];
  const queryFn: QueryFunction<Country[]> = fetchCountries;

  const data = queryClient.getQueryData(queryKey) ?? await queryClient.fetchQuery({queryKey, queryFn});
  return { countries: data };
};
