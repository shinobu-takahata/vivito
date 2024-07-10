import { supabase } from '@/supabaseClient';
import { useSuspenseQuery } from '@tanstack/react-query';
interface Country {
  id: number;
  name: string;
}

const fetchCountries = async (): Promise<Country[]> => {
  // 5秒待つ
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const { data, error } = await supabase.from('countries').select();
  if (error) throw new Error(error.message);
  return data as Country[];
};

export const useCountries2 = () => {
  return useSuspenseQuery({
    queryKey: ['test'],
    queryFn: () => fetchCountries(),
  });
};

export function ExampleRoute() {
  useCountries2();

  return <div>example</div>;
}
