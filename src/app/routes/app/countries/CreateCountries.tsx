import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/supabaseClient';
import { Button, TextField, View } from '@aws-amplify/ui-react';
import { Link, useNavigate } from 'react-router-dom';
const createCommentInputSchema = z.object({
  countryName: z.string().min(1, 'Required'),
});
// フォームの入力データの型定義
type CreateCommentInput = z.infer<typeof createCommentInputSchema>;

// Supabaseに国を登録する関数
const addCountry = async (data: { name: string }) => {
  const { data: insertedData, error } = await supabase
    .from('countries')
    .insert([{ name: data.name }]);

  if (error) {
    throw new Error(error.message);
  }

  return insertedData;
};
export function CreateCountriesRoute() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentInputSchema),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: addCountry,
    onSuccess: () => {
      // 登録成功時にキャッシュを無効化
      queryClient.invalidateQueries({ queryKey: ['countries'] });
      navigate('/app/countries');
    },
  });

  const onSubmit: SubmitHandler<CreateCommentInput> = async (data) => {
    try {
      const input = { name: data.countryName };
      await mutation.mutateAsync({ name: data.countryName });
      // APIを呼び出す部分（適切なGraphQLミューテーションを定義する必要があります）
      // await API.graphql(graphqlOperation(createCountry, { input }));
      console.log('Country registered:', input);
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
