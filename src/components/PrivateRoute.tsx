import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAuth } from "../feature/auth/auth";
import { User } from "@supabase/supabase-js";

export default function PrivateRoute() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User | null, Error>({
    queryKey: ["auth_user"],
    queryFn: getAuth,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/" />;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
}
