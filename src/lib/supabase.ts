import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://huebnklszwzzxwysqbdj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1ZWJua2xzend6enh3eXNxYmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1Njc4MTUsImV4cCI6MjA4OTE0MzgxNX0.OiC5fEZjlMNRNMkepMgt5cK9BeL1oFemVml58dVpeuU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);