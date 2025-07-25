// app/config/supabase/supabaseServerClient.ts
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const createServerSupabaseClient = () => {
  return createServerComponentClient({
    cookies,
  });
};
