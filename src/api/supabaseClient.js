import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lafkmqzutnpganhhxxxz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZmttcXp1dG5wZ2FuaGh4eHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwNTA3OTUsImV4cCI6MjAzMDYyNjc5NX0.o4iBi6xcvWcRekzBOKUR3UkA9hN8kdLgtJ_urgfOPwQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

