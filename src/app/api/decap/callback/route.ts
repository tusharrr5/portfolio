import type { NextRequest } from "next/server";

/**
 * Step 2 of admin login: GitHub sends the user back here with a one-time code.
 * We swap it for an access token (server-side, so the client secret never reaches the browser)
 * and hand the token to the admin window with postMessage, the way Decap CMS expects.
 */
export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const expected = req.cookies.get("decap_oauth_state")?.value;

  let status: "success" | "error" = "error";
  let payload: Record<string, string> = { message: "Login failed. Close this window and try again." };

  if (!code || !state || !expected || state !== expected) {
    payload = { message: "Login expired or was started in another browser. Close this window and try again." };
  } else {
    try {
      const res = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: new URL("/api/decap/callback/", origin).toString(),
        }),
      });
      const data = (await res.json()) as { access_token?: string; error_description?: string };
      if (data.access_token) {
        status = "success";
        payload = { token: data.access_token, provider: "github" };
      } else {
        payload = { message: data.error_description || "GitHub didn't return a token." };
      }
    } catch {
      payload = { message: "Couldn't reach GitHub. Try again in a moment." };
    }
  }

  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Signing in…</title></head>
<body style="font-family:system-ui;background:#070c1a;color:#edf1fa;padding:2rem">
<p>${status === "success" ? "Signed in. You can close this window." : payload.message}</p>
<script>
(function () {
  var origin = ${JSON.stringify(origin)};
  var message = ${JSON.stringify(message).replace(/</g, "\\u003c")};
  if (!window.opener) return;
  function receive(e) {
    if (e.origin !== origin) return;
    window.removeEventListener("message", receive);
    window.opener.postMessage(message, origin);
  }
  window.addEventListener("message", receive);
  window.opener.postMessage("authorizing:github", origin);
})();
</script></body></html>`;

  const response = new Response(html, {
    status: status === "success" ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
  response.headers.append("Set-Cookie", "decap_oauth_state=; Path=/api/decap; Max-Age=0; HttpOnly; SameSite=Lax");
  return response;
}
