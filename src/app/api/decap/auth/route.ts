import { NextResponse, type NextRequest } from "next/server";

/**
 * Step 1 of admin login: send the browser to GitHub to approve access.
 * Needs GITHUB_CLIENT_ID (from a GitHub OAuth App) in Vercel's environment variables.
 */
export function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response("Admin login isn't set up yet: add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Vercel, then redeploy.", {
      status: 500,
    });
  }

  const state = crypto.randomUUID();
  const scope = req.nextUrl.searchParams.get("scope") === "public_repo" ? "public_repo" : "repo";
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", new URL("/api/decap/callback/", req.nextUrl.origin).toString());
  authorize.searchParams.set("scope", scope);
  authorize.searchParams.set("state", state);

  const res = NextResponse.redirect(authorize);
  // Checked in the callback, so a login can only finish in the browser that started it.
  res.cookies.set("decap_oauth_state", state, {
    httpOnly: true,
    secure: req.nextUrl.protocol === "https:",
    sameSite: "lax",
    path: "/api/decap",
    maxAge: 600,
  });
  return res;
}
