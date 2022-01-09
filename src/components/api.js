import { createClient } from "@supabase/supabase-js";


const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzE5Mjg4NCwiZXhwIjoxOTUyNzY4ODg0fQ.ccQeuD2ticHOpbWQ64Z5Re9SESSfxWCv_PJU472PUfU'

const SUPABASE_URL = "https://etllflmdfvutclujgeah.supabase.co"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const postMessage =async ({
    name,email,message
}) => {
    const { data, error } = await supabase.from('message').insert({ name, email, message })
    
    return {
        data,error
    }
}