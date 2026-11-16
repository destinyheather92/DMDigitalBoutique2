/**
 * Builds favicon / app icons and the default social
 * share image from the ORIGINAL logo file. The logo itself is never redrawn,
 * recolored or altered: icons use an exact pixel crop of the DM monogram
 * placed on a canvas, and the share image places the full logo on an ivory
 * card. Run after `npm run textures`.
 *
 *   npm run brand-assets
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const LOGO = path.resolve("public/logos/dm-digital-boutique-logo.png");
const APP = path.resolve("src/app");
const PUB = path.resolve("public");
const IVORY = { r: 243, g: 237, b: 231, alpha: 1 };

// ---- exact crop of the monogram (rows 0–223 of the original artwork)
const meta = await sharp(LOGO).metadata();
const monoBand = await sharp(LOGO).extract({ left: 0, top: 0, width: meta.width, height: 224 }).toBuffer();
const monogram = await sharp(monoBand).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
console.log(`monogram crop: ${monogram.info.width}x${monogram.info.height}`);

async function iconOn(size, background, padRatio) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const mark = await sharp(monogram.data).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

// Favicon (transparent) and touch icon (ivory, like the business card)
fs.writeFileSync(path.join(APP, "icon.png"), await iconOn(192, { r: 0, g: 0, b: 0, alpha: 0 }, 0.04));
fs.writeFileSync(path.join(APP, "apple-icon.png"), await iconOn(180, IVORY, 0.14));
fs.writeFileSync(path.join(PUB, "icon-192.png"), await iconOn(192, IVORY, 0.14));
fs.writeFileSync(path.join(PUB, "icon-512.png"), await iconOn(512, IVORY, 0.14));

// favicon.ico containing PNG-encoded 16, 32 and 48px images
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => iconOn(s, { r: 0, g: 0, b: 0, alpha: 0 }, 0)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
fs.writeFileSync(path.join(APP, "favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));
console.log("icons: icon.png, apple-icon.png, favicon.ico, icon-192.png, icon-512.png");

// ---- default social share image: logo on an ivory card over smoky ink
{
  const W = 1200, H = 630;
  const bg = await sharp(path.join(PUB, "textures/ink-hero.webp")).resize(W, H, { fit: "cover", position: "right" }).toBuffer();
  const cardW = 520, cardH = 298, cardX = 110, cardY = Math.round((H - cardH) / 2);
  const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cardW}" height="${cardH}">
      <rect width="${cardW}" height="${cardH}" rx="4" fill="#F3EDE7"/>
      <rect x="12.5" y="12.5" width="${cardW - 25}" height="${cardH - 25}" rx="2" fill="none" stroke="#C7A36C" stroke-width="1"/>
    </svg>`);
  const logo = await sharp(LOGO).resize({ height: 200 }).toBuffer({ resolveWithObject: true });
  const shadow = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs><filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter></defs>
      <rect x="${cardX + 8}" y="${cardY + 26}" width="${cardW}" height="${cardH}" fill="#000" opacity="0.55" filter="url(#b)"/>
    </svg>`);
  await sharp(bg)
    .composite([
      { input: shadow, left: 0, top: 0 },
      { input: card, left: cardX, top: cardY },
      { input: logo.data, left: cardX + Math.round((cardW - logo.info.width) / 2), top: cardY + Math.round((cardH - logo.info.height) / 2) },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(PUB, "images/og-default.jpg"));
  console.log("og-default.jpg");
}

// ---- headshot: web copy of the original professional photo
await sharp(path.resolve("brand-source/destiny-mills-headshot-original.png"))
  .removeAlpha()
  .webp({ quality: 88 })
  .toFile(path.join(PUB, "images/destiny-mills-headshot.webp"));
console.log("destiny-mills-headshot.webp");

// ---- per-project social share images (1200x630, top of the desktop capture)
{
  /** case study slug -> desktop screenshot in public/projects. Add new projects here. */
  const shareImages = {
    "fort-jackson-eye-center": "fort-jackson-desktop",
    "hoffman-hvac": "hoffman-desktop",
    landstrong: "landstrong-desktop",
    "casecompass-ai": "casecompass-desktop",
  };
  fs.mkdirSync(path.join(PUB, "projects/og"), { recursive: true });
  for (const [slug, shot] of Object.entries(shareImages)) {
    await sharp(path.join(PUB, `projects/${shot}.webp`))
      .resize(1200, 630, { fit: "cover", position: "top" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(PUB, `projects/og/${slug}.jpg`));
  }
  console.log("project share images");
}
