import { createClient } from '@supabase/supabase-js'

// 1. We constructed this URL using the ID from the link you just sent
const supabaseUrl = 'https://pxrwrmsywkobaxmjcody.supabase.co'

// 2. This is the key you sent earlier
const supabaseKey = 'sb_publishable_8jwu9sE2Sh3GRkj68qrcOg_ch89mazu'

export const supabase = createClient(supabaseUrl, supabaseKey)
