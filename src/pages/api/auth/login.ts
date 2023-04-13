// api/auth/login
import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create the Supabase Client
  const supabase = createServerSupabaseClient(
    { req, res },
    {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
    }
  );

  // Start sign in with one-time password
  const { error } = await supabase.auth.signInWithOtp({
    email: "foo@example.com",
    options: {
      emailRedirectTo: "http://localhost:3000/api/auth/callback",
    },
  });
  if (error) {
    res.json(JSON.stringify(error));
  }
}
