import { supabase } from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";
interface Country {
  id: number;
  name: string;
}
async function fetchCountries() {
  const { data, error } = await supabase.from("countries").select();
  if (error) throw new Error(error.message);
  return data as Country[];
}

export default function Countries() {
  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
  return (
    <ul>
      {countries?.map((country: Country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}
