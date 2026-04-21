import fs from 'fs';
import path from 'path';

const manifestPath = path.join(process.cwd(), 'ai', 'manifest.json');
const outDir = path.join(process.cwd(), 'ai', 'export');

if (!fs.existsSync(manifestPath)) {
  console.error('Manifest not found at ai/manifest.json');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const entry of manifest.entries || []) {
  const p = path.join(process.cwd(), entry.path);
  if (!fs.existsSync(p)) {
    console.warn('Missing file:', entry.path);
    continue;
  }
  const content = fs.readFileSync(p, 'utf8');
  const out = {
    name: entry.name,
    path: entry.path,
    role: entry.role || null,
    domain: entry.domain || null,
    content: content
  };
  const safeName = entry.name.replace(/[\\/:*?"<>|\\s]/g, '_');
  fs.writeFileSync(path.join(outDir, safeName + '.json'), JSON.stringify(out, null, 2), 'utf8');
  console.log('Exported:', safeName + '.json');
}

console.log('Done. Exported prompts/agents to ai/export/');
