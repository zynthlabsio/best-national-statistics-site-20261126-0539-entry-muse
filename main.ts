// Indonesia in Numbers — hand-in program for the make.fun bounty
// "best-national-statistics-site-20261126-0539" (Node 22, standard library only).
//
// The site itself is plain static files under app/ (ES modules, CSS, canvas
// charts, no build step, nothing loaded over the network). This program's
// whole job is the hand-in: copy app/ and screenshots/ to /output and write
// /output/dossier.json with the vendored make.fun library, byte for byte as
// the scorer builds it. Outside the grader, MAKEFUN_OUTPUT_DIR stands in
// for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Leave vendor/makefun-frontend.ts exactly as the kit ships it: the gate
// rebuilds the dossier with its own copy and compares the two.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (this competition's reference/gate.json): only
// text_max_bytes shapes the bytes; the others refuse an entry the scorer
// would refuse (more than 4 screenshots or one over 256 KiB; more than 993
// files and directories in app/ or 16 MiB of app files).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

console.log('Indonesia in Numbers handed in: app/ + screenshots/ copied, dossier.json written.');
