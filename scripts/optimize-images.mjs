/**
 * npm run images
 *
 * images-src/work/<slug>.(png|jpg|jpeg|webp)  -> public/images/work/<slug>-{640,960,1280,1920}.webp
 *   Cropped to 16:10 from the top, so every project card lines up.
 * images-src/me.(png|jpg|jpeg|webp)           -> public/images/me-{640,960,1280,1920}.webp
 *   Cropped square around the centre.
 *
 * Then reference the base name in src/content/site.ts, e.g. "/images/work/tohfa.webp".
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const SRC = path.join(root, "images-src");
const OUT = path.join(root, "public", "images");
const exts = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function render(file, outBase, ratio, widths, position) {
  const { width: W, height: H } = await sharp(file).metadata();
  // Largest crop at this ratio. Never upscale: if the source is smaller than a
  // requested width, that file is written at the largest size available.
  const maxW = Math.floor(Math.min(W, H * ratio));
  for (const want of widths) {
    const w = Math.min(want, maxW);
    const h = Math.round(w / ratio);
    await sharp(file)
      .resize(w, h, { fit: "cover", position })
      .webp({ quality: 80 })
      .toFile(`${outBase}-${want}.webp`);
  }
  console.log("✓", path.relative(root, file), "→", path.relative(root, outBase) + "-{" + widths.join(",") + "}.webp", `(max ${maxW}px wide)`);
}

async function main() {
  await mkdir(path.join(OUT, "work"), { recursive: true });

  const workDir = path.join(SRC, "work");
  const files = (await readdir(workDir).catch(() => [])).filter((f) => exts.has(path.extname(f).toLowerCase()));
  for (const f of files) {
    const slug = path.basename(f, path.extname(f));
    await render(path.join(workDir, f), path.join(OUT, "work", slug), 16 / 10, [640, 960, 1280, 1920], "top");
  }

  const me = (await readdir(SRC).catch(() => [])).find((f) => /^me\.(png|jpe?g|webp)$/i.test(f));
  if (me) await render(path.join(SRC, me), path.join(OUT, "me"), 1, [640, 960, 1280, 1920], "centre");

  if (!files.length && !me) console.log("No images found in images-src/. Nothing to do.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
