import {create} from 'zustand';
import { supabase } from '../supabaseClient';

import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  checkAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  checkAuth: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    set({ user, loading: false });
  },
}));

export default useAuthStore;
