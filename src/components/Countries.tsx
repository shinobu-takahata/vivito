import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
interface Country {
  id: number;
  name: string;
}
export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    console.log(data);

    setCountries(data as Country[]);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}
