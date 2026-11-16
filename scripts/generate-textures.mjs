/**
 * Generates the DM Digital Boutique smoky ink textures.
 *
 * Soft smoke volumes come from domain-warped fractal noise; the thin,
 * curling tendrils are contour lines of that same warped field (the way
 * ink threads through water). Everything is colored with the brand palette
 * and masked into asymmetric compositions that leave calm space for type.
 *
 *   npm run textures             -> full-size textures in public/textures
 *   npm run textures -- preview  -> quick quarter-size previews
 *   npm run textures -- --only=ink-hero
 *
 * Output is deterministic (seeded): re-running produces identical files.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("public/textures");
const PREVIEW = process.argv.includes("preview");
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
fs.mkdirSync(OUT, { recursive: true });

// ---------------------------------------------------------------- palette
const C = {
  ink: [23, 21, 24],
  smoke: [56, 50, 56],
  smokeLight: [92, 82, 90],
  rose: [183, 123, 145],
  roseDeep: [148, 86, 109],
  petal: [214, 172, 178],
  blush: [230, 185, 200],
  ivory: [243, 237, 231],
  paper: [234, 225, 218],
};

// ---------------------------------------------------------------- noise
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeSimplex(seed) {
  const rand = mulberry32(seed);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
  const grad3 = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0, -1]);
  const F2 = 0.5 * (Math.sqrt(3) - 1);
  const G2 = (3 - Math.sqrt(3)) / 6;

  return function noise2D(xin, yin) {
    let n0 = 0, n1 = 0, n2 = 0;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const x0 = xin - (i - t);
    const y0 = yin - (j - t);
    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255;
    const jj = j & 255;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      const g = permMod12[ii + perm[jj]] * 2;
      t0 *= t0;
      n0 = t0 * t0 * (grad3[g] * x0 + grad3[g + 1] * y0);
    }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      const g = permMod12[ii + i1 + perm[jj + j1]] * 2;
      t1 *= t1;
      n1 = t1 * t1 * (grad3[g] * x1 + grad3[g + 1] * y1);
    }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      const g = permMod12[ii + 1 + perm[jj + 1]] * 2;
      t2 *= t2;
      n2 = t2 * t2 * (grad3[g] * x2 + grad3[g + 1] * y2);
    }
    return 70 * (n0 + n1 + n2);
  };
}

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const mix = (a, b, t) => a + (b - a) * t;

/** Sum of soft elliptical blobs: decides where the smoke lives. */
function blobMask(x, y, blobs) {
  let m = 0;
  for (const b of blobs) {
    const dx = (x - b.x) / b.rx;
    const dy = (y - b.y) / b.ry;
    m += b.a * Math.exp(-(dx * dx + dy * dy));
  }
  return clamp01(m);
}

// ---------------------------------------------------------------- renderer
/**
 * Two layers, like smoke photography:
 *  1. soft volumes (blurred afterwards so they read as out-of-focus smoke)
 *  2. hair-thin tendrils: contour lines of the warped field, kept at a
 *     constant pixel width by dividing by the field's gradient.
 */
function render(o) {
  const div = PREVIEW ? 4 : 1;
  const W = Math.round(o.w / div);
  const H = Math.round(o.h / div);
  const N = W * H;
  const noise = makeSimplex(o.seed);
  const rand = mulberry32(o.seed + 99);
  const aspect = W / H;

  const fbm = (x, y, oct, gain = 0.5) => {
    let v = 0, amp = 0.5, f = 1;
    for (let k = 0; k < oct; k++) {
      v += amp * noise(x * f, y * f);
      f *= 1.93;
      amp *= gain;
    }
    return v;
  };

  const warp = o.warp ?? 1.85;
  const theta = ((o.angle ?? -55) * Math.PI) / 180;
  const cos = Math.cos(theta), sin = Math.sin(theta);
  const stretch = o.stretch ?? [1, 0.5];
  const levels = o.levels ?? [-0.16, 0.08];
  const sheetPx = (o.sheet ?? 22) / div; // soft glow trailing each edge
  const lineW = (o.lineWidth ?? 1.4) / div; // in output pixels
  const lineSpan = o.lineSpan ?? 0.55; // how much of each tendril is visible

  const F = new Float32Array(N), LF = new Float32Array(N), M = new Float32Array(N), T = new Float32Array(N), FADE = new Float32Array(N);

  // pass 1: fields
  for (let py = 0; py < H; py++) {
    const y = py / H;
    for (let px = 0; px < W; px++) {
      const x = px / W;
      const ax = x * aspect;
      const u = (ax * cos - y * sin) * o.scale * stretch[0];
      const v = (ax * sin + y * cos) * o.scale * stretch[1];
      const q0 = fbm(u, v, 3);
      const q1 = fbm(u + 5.2, v + 1.3, 3);
      const r0 = fbm(u + warp * q0 + 1.7, v + warp * q1 + 9.2, 3);
      const r1 = fbm(u + warp * q0 + 8.3, v + warp * q1 + 2.8, 3);
      const f = fbm(u + warp * r0, v + warp * r1, 3, 0.45);
      const i = py * W + px;
      F[i] = f;
      // smoother field for tendrils: long flowing curves, few islands
      LF[i] = fbm(u + warp * r0, v + warp * r1, 2, 0.5);
      M[i] = blobMask(x + 0.1 * q0, y + 0.1 * q1, o.blobs);
      T[i] = clamp01(0.5 + r1 * 1.6 + q0 * 0.8);
      FADE[i] = smoothstep(lineSpan - 0.25, lineSpan + 0.15, 0.5 + fbm(u * 0.7 + 11, v * 0.7 - 4, 2) * 1.2 + r0 * 0.5);
    }
  }

  // pass 2: compose
  const vol = Buffer.alloc(N * 3);
  const lines = Buffer.alloc(N * 4);
  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      const i = py * W + px;
      const f = F[i], m = M[i], tint = T[i];
      const x = px / W, y = py / H;

      // volume colour
      const v = smoothstep(-0.3, 0.4, f) * m;
      const core = Math.pow(smoothstep(0.02, 0.45, f), 2) * m;
      const vr = mix(o.vol[0], o.volB[0], tint);
      const vg = mix(o.vol[1], o.volB[1], tint);
      const vb = mix(o.vol[2], o.volB[2], tint);
      const glow = (o.glow ?? 0.3) * m;
      let r = mix(o.base[0], o.glowColor[0], glow);
      let g = mix(o.base[1], o.glowColor[1], glow);
      let b = mix(o.base[2], o.glowColor[2], glow);
      const tv = clamp01(v * (o.volOpacity ?? 0.6));
      r = mix(r, vr, tv); g = mix(g, vg, tv); b = mix(b, vb, tv);
      const tc = clamp01(core * (o.coreOpacity ?? 0.25));
      r = mix(r, o.core[0], tc); g = mix(g, o.core[1], tc); b = mix(b, o.core[2], tc);
      if (o.vignette) {
        const vx = x - 0.5, vy = y - 0.5;
        const k = 1 - o.vignette * clamp01((vx * vx + vy * vy) * 2.4);
        r = mix(o.base[0], r, k); g = mix(o.base[1], g, k); b = mix(o.base[2], b, k);
      }
      vol[i * 3] = r; vol[i * 3 + 1] = g; vol[i * 3 + 2] = b;

      // tendrils: crisp edge on one side, soft translucent sheet on the other
      const lf = LF[i];
      const fx = LF[py * W + Math.min(W - 1, px + 1)] - LF[py * W + Math.max(0, px - 1)];
      const fy = LF[Math.min(H - 1, py + 1) * W + px] - LF[Math.max(0, py - 1) * W + px];
      const grad = Math.max(1e-6, Math.hypot(fx, fy) * 0.5);
      let line = 0;
      for (let k = 0; k < levels.length; k++) {
        const d = (lf - levels[k]) / grad; // signed distance in px
        const crisp = Math.exp(-(d / lineW) * (d / lineW));
        const sheet = d > 0 ? Math.exp(-d / sheetPx) * (o.sheetStrength ?? 0.35) : 0;
        line = Math.max(line, crisp + sheet);
      }
      line *= m * FADE[i];
      const la = clamp01(line * (o.lineOpacity ?? 0.6));
      lines[i * 4] = o.line[0]; lines[i * 4 + 1] = o.line[1]; lines[i * 4 + 2] = o.line[2];
      lines[i * 4 + 3] = Math.round(la * 255);
    }
  }
  return { vol, lines, W, H, rand };
}

async function save(name, o, quality = 80) {
  if (only && only !== name) return;
  const t = Date.now();
  const { vol, lines, W, H, rand } = render(o);
  const div = PREVIEW ? 4 : 1;
  const blur = Math.max(0.3, (o.softness ?? 7) / div);
  const lineLayer = await sharp(lines, { raw: { width: W, height: H, channels: 4 } })
    .blur(Math.max(0.3, 0.5 / div))
    .png()
    .toBuffer();
  let img = sharp(vol, { raw: { width: W, height: H, channels: 3 } }).blur(blur);
  const composed = await img.composite([{ input: lineLayer }]).raw().toBuffer({ resolveWithObject: true });
  // dither after compositing to prevent banding in smooth gradients
  const px = composed.data;
  const ch = composed.info.channels;
  for (let i = 0; i < px.length && !o.colorToAlpha; i += ch) {
    const d = (rand() - 0.5) * 1.6;
    px[i] = Math.max(0, Math.min(255, px[i] + d));
    px[i + 1] = Math.max(0, Math.min(255, px[i + 1] + d));
    px[i + 2] = Math.max(0, Math.min(255, px[i + 2] + d));
  }
  const file = path.join(OUT, `${name}${PREVIEW ? "-preview" : ""}.webp`);
  if (o.colorToAlpha) {
    // "Color to alpha" against the base: the ink disappears, leaving only smoke,
    // so the plume layers over anything without relying on blend modes.
    const [br, bg, bb] = o.base;
    const rgba = Buffer.alloc((px.length / ch) * 4);
    for (let i = 0, j = 0; i < px.length; i += ch, j += 4) {
      const c = [px[i], px[i + 1], px[i + 2]];
      const b = [br, bg, bb];
      let a = 0;
      for (let k = 0; k < 3; k++) {
        const ak = c[k] > b[k] ? (c[k] - b[k]) / (255 - b[k]) : b[k] > 0 ? (b[k] - c[k]) / b[k] : 0;
        if (ak > a) a = ak;
      }
      a = Math.min(1, a * (o.alphaGain ?? 2.2));
      for (let k = 0; k < 3; k++) rgba[j + k] = a > 0.004 ? Math.max(0, Math.min(255, Math.round(b[k] + (c[k] - b[k]) / Math.max(a / (o.alphaGain ?? 2.2), 0.004)))) : 0;
      rgba[j + 3] = Math.round(a * 255);
    }
    await sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).webp({ quality, effort: 6, alphaQuality: 80 }).toFile(file);
    console.log(`${name}: ${W}x${H} ${Math.round(fs.statSync(file).size / 1024)}KB (alpha)`);
    return;
  }
  await sharp(px, { raw: { width: W, height: H, channels: ch } }).webp({ quality, effort: 6, alphaQuality: 70, smartSubsample: true }).toFile(file);
  const kb = Math.round(fs.statSync(file).size / 1024);
  console.log(`${name}: ${W}x${H} ${kb}KB (${((Date.now() - t) / 1000).toFixed(1)}s)`);
}

const dark = { base: C.ink, vol: C.smoke, volB: C.roseDeep, core: C.rose, line: C.blush, glowColor: [36, 31, 37] };

// Hero: smoke rising up the right side, behind the work preview.
await save("ink-hero", {
  ...dark, w: 2400, h: 1500, seed: 7, scale: 1.25, angle: -58, stretch: [1, 0.42],
  blobs: [
    { x: 0.84, y: 0.6, rx: 0.3, ry: 0.55, a: 1.15 },
    { x: 0.55, y: 1.02, rx: 0.3, ry: 0.2, a: 0.85 },
    { x: 1.0, y: 0.05, rx: 0.22, ry: 0.25, a: 0.7 },
    { x: 0.02, y: 0.02, rx: 0.16, ry: 0.14, a: 0.3 },
  ],
  volOpacity: 0.72, lineOpacity: 0.58, coreOpacity: 0.32, glow: 0.45, vignette: 0.3, softness: 9, lineWidth: 1.5,
});

// Mobile hero: portrait composition, plume under the headline.
await save("ink-hero-portrait", {
  ...dark, w: 1000, h: 1800, seed: 7, scale: 1.3, angle: -70, stretch: [1, 0.45],
  blobs: [
    { x: 0.95, y: 0.84, rx: 0.6, ry: 0.32, a: 1.15 },
    { x: 0.05, y: 1.02, rx: 0.5, ry: 0.16, a: 0.75 },
    { x: 1.0, y: 0.04, rx: 0.45, ry: 0.12, a: 0.5 },
  ],
  volOpacity: 0.7, lineOpacity: 0.7, coreOpacity: 0.3, glow: 0.45, vignette: 0.25, softness: 6, lineWidth: 1.4,
});

// Dark section: smoke drifting in from opposite corners.
await save("ink-section", {
  ...dark, w: 2400, h: 1400, seed: 23, scale: 1.7, angle: -50, stretch: [1, 0.45], line: C.petal,
  blobs: [
    { x: -0.02, y: 0.06, rx: 0.3, ry: 0.32, a: 0.95 },
    { x: 1.02, y: 0.9, rx: 0.32, ry: 0.34, a: 1.0 },
  ],
  volOpacity: 0.6, lineOpacity: 0.55, coreOpacity: 0.24, glow: 0.35, vignette: 0.2, softness: 9, lineWidth: 1.4,
});

// Closing CTA: dramatic plume rising from the lower left.
await save("ink-cta", {
  ...dark, w: 2400, h: 1400, seed: 41, scale: 1.5, angle: -62, stretch: [1, 0.4],
  blobs: [
    { x: 0.16, y: 0.98, rx: 0.42, ry: 0.48, a: 1.2 },
    { x: 0.96, y: 0.22, rx: 0.28, ry: 0.36, a: 0.95 },
  ],
  volOpacity: 0.75, lineOpacity: 0.75, coreOpacity: 0.34, glow: 0.5, vignette: 0.25, softness: 10, lineWidth: 1.6,
});

// Light: rose ink blooming through warm ivory paper (marbled).
await save("ink-light", {
  w: 2400, h: 1500, seed: 53, scale: 1.4, angle: -40, stretch: [1, 0.6],
  base: C.ivory, vol: [236, 222, 218], volB: C.blush, core: C.petal, line: C.rose, glowColor: C.paper,
  blobs: [
    { x: 1.02, y: 0.2, rx: 0.32, ry: 0.42, a: 1.0 },
    { x: -0.02, y: 0.98, rx: 0.26, ry: 0.28, a: 0.75 },
  ],
  volOpacity: 0.75, lineOpacity: 0.45, coreOpacity: 0.35, glow: 0.25, softness: 5, lineWidth: 1.3,
});

// Blush: smoky pink field for the lighter feature sections.
await save("ink-blush", {
  w: 2400, h: 1500, seed: 71, scale: 1.3, angle: -48, stretch: [1, 0.55],
  base: [241, 229, 227], vol: [234, 212, 214], volB: C.blush, core: C.petal, line: C.rose, glowColor: [236, 216, 218],
  blobs: [
    { x: -0.02, y: 0.3, rx: 0.38, ry: 0.5, a: 1.0 },
    { x: 0.92, y: 1.02, rx: 0.4, ry: 0.36, a: 0.9 },
  ],
  volOpacity: 0.85, lineOpacity: 0.42, coreOpacity: 0.35, glow: 0.35, softness: 6, lineWidth: 1.3,
});

// Plume on an ink base, layered with mix-blend-mode: lighten over dark areas.
await save("ink-plume", {
  ...dark, w: 1000, h: 1000, seed: 89, scale: 1.7, angle: -75, stretch: [1, 0.4], vol: C.smokeLight,
  blobs: [
    { x: 0.5, y: 0.64, rx: 0.3, ry: 0.42, a: 1.15 },
    { x: 0.6, y: 0.22, rx: 0.18, ry: 0.22, a: 0.6 },
  ],
  volOpacity: 0.65, lineOpacity: 0.75, coreOpacity: 0.3, glow: 0.2, softness: 5, lineWidth: 1.2,
});
