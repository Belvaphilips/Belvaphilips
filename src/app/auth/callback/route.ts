import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  console.log("=== AUTH CALLBACK DEBUG (Production) ===");
  console.log("Full URL:", request.url);
  console.log("Code:", code ? "present" : "missing");
  console.log("Next parameter:", next);
  console.log("Origin:", origin);
  console.log("All search params:", Object.fromEntries(searchParams.entries()));

  if (code) {
    const supabase = await createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && session?.user) {
      const isValidRedirect = next.startsWith("/") && !next.startsWith("//");

      if (isValidRedirect) {
        const redirectUrl = `${origin}${next}`;

        return NextResponse.redirect(redirectUrl);
      } else {
        return NextResponse.redirect(`${origin}/`);
      }
    } else {
      console.error("Session exchange error:", error);
      console.log("Redirecting to error page due to session exchange failure");
    }
  } else {
    console.log("No code parameter found in URL");
  }

  console.log("Redirecting to auth error page");
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
