import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qnozlrgdqrnayuixtwmd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFub3pscmdkcXJuYXl1aXh0d21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NzEzNTIsImV4cCI6MjA3MjA0NzM1Mn0.GeAFug9yoKYoGmXE3kgC4WsdVu08KHarr-tMbsaYDyo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
