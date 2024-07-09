import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/supabaseClient';
import { Navigate } from 'react-router-dom';

export function LoginRoute() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return !session ? (
    // Authコンポーネントにmax-widthを指定
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    </div>
  ) : (
    <Navigate to="/app/countries" />
  );
}
