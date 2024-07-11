import { useCounries } from '@/feature/country/get-countries';
import { Button } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
interface Country {
  id: number;
  name: string;
}

export function CountriesRoute() {
  const countries = useCounries();
  return (
    <div className="flex justify-center">
      <div>
        <ul className="grid grid-cols-2 gap-4">
          {countries.data?.map((country: Country) => (
            <li key={country.name}>{country.name}</li>
          ))}
        </ul>
        <div className="flex justify-end mt-5">
          <Link to={'/app/countries/create'}>
            <Button variation="primary">Create</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
