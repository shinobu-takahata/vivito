import { supabase } from '../supabaseClient';
import { User } from '@supabase/supabase-js';

export async function getAuth(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user;
}
