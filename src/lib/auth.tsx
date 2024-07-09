import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { getAuth } from '@/feature/auth/auth';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User | null, Error>({
    queryKey: ['auth_user'],
    queryFn: getAuth,
  });

  if (!user) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};
