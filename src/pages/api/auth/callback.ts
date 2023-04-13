// api/auth/callback
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

  // Check for the auth code in the URL query parameters
  const code = req.query.code;

  if (typeof code === "string") {
    // Exchange the auth code for the user session
    await supabase.auth.exchangeCodeForSession(code);
  } else {
    console.log("Auth code not found");
    res.json("404");
  }

  // Redirect the user to a server-side protected route in your app
  res.redirect("/");
}
