import { cmsConfig } from "@/cms/config";

// The admin panel: a plain HTML page that loads Decap CMS.
// Sign in with GitHub, edit, press Publish. Changes are committed to the repo and Vercel redeploys.
export const dynamic = "force-static";

const DECAP_VERSION = "3.16.3";

export function GET() {
  const config = JSON.stringify(cmsConfig).replace(/</g, "\\u003c");
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Admin · Tushar Bhojwani</title>
  <link rel="icon" href="/icon.svg" type="image/svg+xml" />
</head>
<body>
  <script>window.CMS_MANUAL_INIT = true;</script>
  <script src="https://unpkg.com/decap-cms@${DECAP_VERSION}/dist/decap-cms.js"></script>
  <script>
    var config = ${config};
    config.backend.base_url = window.location.origin;
    CMS.init({ config: config });
  </script>
</body>
</html>`;
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" },
  });
}
