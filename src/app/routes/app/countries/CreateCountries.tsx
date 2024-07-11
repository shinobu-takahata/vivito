import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, View } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import {
  CreateCommentInput,
  createCountryInputSchema,
  useCreateCountry,
} from '@/feature/country/api/create-country';
import { navigate } from '@/lib/react-router';

export function CreateCountriesRoute() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<CreateCommentInput>({
    resolver: zodResolver(createCountryInputSchema),
  });
  // const navigate = useNavigate();
  const createCountryMutation = useCreateCountry({
    mutationConfig: {
      onSuccess: () => {
        navigate('/app/countries');
      },
    },
  });

  const onSubmit: SubmitHandler<CreateCommentInput> = async (data) => {
    try {
      // APIを呼び出す部分（適切なGraphQLミューテーションを定義する必要があります）
      // await API.graphql(graphqlOperation(createCountry, { input }));
      createCountryMutation.mutate(data);
      console.log('Country registered:', data);
    } catch (error) {
      console.error('Error registering country:', error);
    }
  };
  return (
    <View
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg mx-auto p-4"
    >
      <TextField
        label="Country Name"
        {...register('countryName')}
        placeholder="Enter country name"
        required
        className="flex-1 min-w-0"
      />
      <div className="flex justify-end gap-3 mt-4">
        <Button type="submit" className="ml-auto" variation="primary">
          Register
        </Button>
        <Link to={'/app/countries/'}>
          <Button className="ml-auto">Back</Button>
        </Link>
      </div>
    </View>
  );
}
