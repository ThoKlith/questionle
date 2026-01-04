
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pmjlyqfsogrdvzijvnrr.supabase.co";
const supabaseAnonKey = "sb_publishable_rUS_5I9jLd6RdWW0zVmTfw_Tg2dB9p1";

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
