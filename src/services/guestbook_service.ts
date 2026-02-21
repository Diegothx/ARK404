import { createClient, SupabaseClient } from '@supabase/supabase-js';
 

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface GuestbookEntry {
  id: string;
  name: string;
  email?: string;
  message: string;
  created_at: string;
}

export type GuestbookEntryInsert = Omit<GuestbookEntry, 'id' | 'created_at'>;

export const GuestbookService = {
  listEntriesGuestbookGet: async (): Promise<GuestbookEntry[]> => {
    const { data, error } = await supabase
      .from('guestbook_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  createEntryGuestbookPost: async (entry: GuestbookEntryInsert): Promise<GuestbookEntry> => {
  const { data, error } = await supabase
    .from('guestbook_entries')
    .insert([
        {
            name: entry.name,
            email: entry.email,
            message: entry.message,
        }
    ])
    .select()
    .single();

  if (error) throw error;
  return data!;
}
 
};