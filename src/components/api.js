import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDY3MDY4OSwiZXhwIjoxOTUwMjQ2Njg5fQ.q54IGtIcPovjtDAIAcfj70f_jel93V4_47gm-A0s4D0";

const SUPABASE_URL = "https://itwmctclrhnoeqnsakvq.supabase.co";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const postMessage = async ({ name, email, message }) => {
  const { data, error } = await supabase
    .from("message")
    .insert({ name, email, message });

  return {
    data,
    error,
  };
};
