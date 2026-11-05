/**
 * Image loader for pre-resized images.
 * `npm run images` writes each image in several widths, e.g.
 *   /images/work/tohfa-640.webp, -960, -1280, -1920
 * In content you reference the base name (/images/work/tohfa.webp) and
 * next/image picks the right width for each screen via srcset.
 */
export const IMAGE_WIDTHS = [640, 960, 1280, 1920];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  // Uploaded from the admin panel: served as-is (no pre-made sizes).
  if (src.startsWith("/images/uploads/")) return `${src}?w=${width}`;
  if (!src.startsWith("/images/") || !src.endsWith(".webp")) return src;
  const w = IMAGE_WIDTHS.find((s) => s >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  return src.replace(/\.webp$/, `-${w}.webp`);
}
