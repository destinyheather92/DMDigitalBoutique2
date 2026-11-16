/**
 * Turns raw project screenshots (PNG captures of the live sites) into
 * web-ready WebP files in public/projects, and writes a typed manifest
 * with each image's dimensions and a tiny blur placeholder.
 *
 *   npm run process-screenshots -- <folder-with-raw-pngs>
 *
 * Expected raw file names: <slug>-desktop.png, <slug>-mobile.png,
 * <slug>-desktop-full.png, <slug>-mobile-full.png, <slug>-<page>-desktop.png
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = process.argv[2];
if (!SRC || !fs.existsSync(SRC)) {
  console.error("Usage: npm run process-screenshots -- <folder-with-raw-pngs>");
  process.exit(1);
}
const OUT = path.resolve("public/projects");
const MANIFEST = path.resolve("src/data/generated/project-images.json");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });

/** How each kind of capture is prepared. */
const recipes = [
  // name suffix,        width, max height, quality
  { match: /-desktop\.png$/, width: 2000, maxHeight: null, quality: 80 },
  { match: /-mobile\.png$/, width: 780, maxHeight: null, quality: 80 },
  // Full-page captures, trimmed for in-frame scrolling previews
  { match: /-desktop-full\.png$/, width: 1200, maxHeight: 5200, quality: 72 },
  { match: /-mobile-full\.png$/, width: 600, maxHeight: 4200, quality: 72 },
];

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};

for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith(".png")).sort()) {
  const recipe = recipes.find((r) => r.match.test(file));
  if (!recipe) continue;
  const name = file.replace(/\.png$/, "");
  const outFile = path.join(OUT, `${name}.webp`);

  let img = sharp(path.join(SRC, file)).resize({ width: recipe.width, withoutEnlargement: true });
  const resized = await img.toBuffer({ resolveWithObject: true });
  let pipeline = sharp(resized.data);
  let height = resized.info.height;
  if (recipe.maxHeight && height > recipe.maxHeight) {
    pipeline = pipeline.extract({ left: 0, top: 0, width: resized.info.width, height: recipe.maxHeight });
    height = recipe.maxHeight;
  }
  await pipeline.webp({ quality: recipe.quality, effort: 6, smartSubsample: true }).toFile(outFile);

  const blur = await sharp(outFile).resize(16).webp({ quality: 40 }).toBuffer();
  manifest[name] = {
    src: `/projects/${name}.webp`,
    width: resized.info.width,
    height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  console.log(`${name}.webp  ${resized.info.width}x${height}  ${Math.round(fs.statSync(outFile).size / 1024)}KB`);
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Manifest: ${Object.keys(manifest).length} images -> ${path.relative(process.cwd(), MANIFEST)}`);
