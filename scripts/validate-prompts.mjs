import fs from 'fs';
import path from 'path';

const repoRoot = path.resolve(new URL(import.meta.url).pathname.replace(/^\/[A-Za-z]:/, ''));
const manifestPath = path.join(process.cwd(), 'ai', 'manifest.json');

function exitWith(msg, code=1) {
  console.error(msg);
  process.exit(code);
}

if (!fs.existsSync(manifestPath)) {
  exitWith(`Manifest not found at ${manifestPath}`);
}

const manifestRaw = fs.readFileSync(manifestPath, 'utf8');
let manifest;
try { manifest = JSON.parse(manifestRaw); } catch(e) { exitWith('Failed to parse ai/manifest.json: ' + e); }

const missing = [];
for (const entry of (manifest.entries || [])) {
  const p = path.join(process.cwd(), entry.path);
  if (!fs.existsSync(p)) missing.push(entry.path);
}

if (missing.length === 0) {
  console.log('OK: All manifest entries present.');
  process.exit(0);
} else {
  console.error('Missing files listed in ai/manifest.json:');
  for (const m of missing) console.error(' - ' + m);
  process.exit(2);
}
