import { useCounries } from '@/feature/country/get-countries';
interface Country {
  id: number;
  name: string;
}

export function CountriesRoute() {
  const countries = useCounries();
  return (
    <ul>
      {countries.data?.map((country: Country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}
