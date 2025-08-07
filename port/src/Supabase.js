import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hqyyswydneiucbhldrqr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxeXlzd3lkbmVpdWNiaGxkcnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MDUzMDMsImV4cCI6MjA2OTk4MTMwM30.ekOS5LPLAZJgdPBzORm0BCk9M8DY-DRmouuBcpchr-E'

export const supabase = createClient(supabaseUrl, supabaseKey)
