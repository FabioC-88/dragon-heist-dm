#!/usr/bin/env node
/**
 * build-foundry.mjs
 *
 * Converte i file Markdown della campagna in Compendium Packs di JournalEntry
 * compatibili con Foundry VTT V12+.
 *
 * Flusso:
 *   1. Legge tutti i .md dalle cartelle sorgente per ogni pack
 *   2. Converte Markdown → HTML con marked
 *   3. Genera oggetti JSON in formato JournalEntry (Foundry V10+)
 *   4. Salva i JSON in src/{pack-name}/
 *   5. Chiama `fvtt package pack` per compilare ogni pack in LevelDB (packs/{pack-name}/)
 *
 * Modalità di build per pack:
 *   flat     — un JournalEntry separato per ogni file .md
 *   grouped  — un JournalEntry multi-pagina per ogni gruppo (es. una fazione)
 *   multipage — un unico JournalEntry multi-pagina con tutti i file
 *
 * Utilizzo:
 *   npm install
 *   npm run build
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join, basename, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { marked } from 'marked';

const ROOT = fileURLToPath(new URL('.', import.meta.url));

// ── Utility ────────────────────────────────────────────────────────────────

/** ID deterministico a 16 caratteri hex da una stringa seed. */
function makeId(seed) {
  return createHash('sha256').update(seed).digest('hex').slice(0, 16);
}

/** Converti nome file (kebab-case, CamelCase, underscore) in titolo leggibile. */
function fileToTitle(filePath) {
  const name = basename(filePath, extname(filePath));
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

/** Estrae il numero della missione (M1, M2…) dal nome file; 0 se assente. */
function missionSortKey(filePath) {
  const name = basename(filePath, extname(filePath));
  const match = name.match(/^M(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

/** Estrae YAML frontmatter (---\nkey: value\n---) dal contenuto markdown. */
function parseFrontmatter(mdContent) {
  const match = mdContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return { content: mdContent, data: {} };
  const data = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) data[m[1].trim()] = m[2].trim();
  }
  return { content: mdContent.slice(match[0].length), data };
}

/**
 * Raccoglie tutti i file .md in modo ricorsivo.
 * Se excludeSubdirs è valorizzato, salta le sottocartelle con quel nome.
 */
function collectMdFiles(dir, excludeSubdirs = []) {
  if (!existsSync(dir)) return [];
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (excludeSubdirs.includes(entry.name)) continue;
      results.push(...collectMdFiles(fullPath, excludeSubdirs));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

// ── Conversione MD → JournalEntry JSON ────────────────────────────────────

/** Genera un oggetto JournalEntry Foundry V10+ da un file Markdown (modalità flat). */
function buildJournalEntry(filePath) {
  const relPath     = relative(ROOT, filePath).replace(/\\/g, '/');
  const journalId   = makeId(relPath);
  const pageId      = makeId(relPath + ':page0');
  const mdContent   = readFileSync(filePath, 'utf-8');
  const { content, data } = parseFrontmatter(mdContent);
  const htmlContent = marked.parse(content);
  const now         = Date.now();
  const mNum        = missionSortKey(filePath);
  const sort        = mNum > 0 ? mNum * 100000 : 0;
  let title         = fileToTitle(filePath);
  if (data.status) title = `${title} [${data.status}]`;

  return {
    _id:   journalId,
    name:  title,
    pages: [
      {
        _id:   pageId,
        name:  title,
        type:  'text',
        title: { show: false, level: 1 },
        text:  { format: 1, content: htmlContent },
        image: {},
        video: { controls: true, volume: 0.5 },
        src:    null,
        system: {},
        sort:   100000,
        ownership: { default: -1 },
        flags: {},
        _key: `!journal.pages!${journalId}.${pageId}`
      }
    ],
    folder:    null,
    sort,
    ownership: { default: 0 },
    flags:     {},
    _stats: {
      systemId:       null,
      systemVersion:  null,
      coreVersion:    '14.0.0',
      createdTime:    now,
      modifiedTime:   now,
      lastModifiedBy: 'dragon-heist-dm'
    },
    _key: `!journal!${journalId}`
  };
}

/** Raggruppa più file markdown in un unico JournalEntry multi-pagina. */
function buildMultiPageJournalEntry(journalTitle, seedId, files) {
  const journalId = makeId(seedId);
  const now = Date.now();
  const pages = files.map((filePath, i) => {
    const relPath = relative(ROOT, filePath).replace(/\\/g, '/');
    const pageId = makeId(relPath + ':page0');
    const mdContent = readFileSync(filePath, 'utf-8');
    const { content } = parseFrontmatter(mdContent);
    const pageTitle = fileToTitle(filePath);
    return {
      _id:   pageId,
      name:  pageTitle,
      type:  'text',
      title: { show: true, level: 1 },
      text:  { format: 1, content: marked.parse(content) },
      image: {},
      video: { controls: true, volume: 0.5 },
      src:    null,
      system: {},
      sort:   (i + 1) * 100000,
      ownership: { default: -1 },
      flags: {},
      _key: `!journal.pages!${journalId}.${pageId}`
    };
  });
  return {
    _id:   journalId,
    name:  journalTitle,
    pages,
    folder:    null,
    sort:      999 * 100000,
    ownership: { default: 0 },
    flags:     {},
    _stats: {
      systemId:       null,
      systemVersion:  null,
      coreVersion:    '14.0.0',
      createdTime:    now,
      modifiedTime:   now,
      lastModifiedBy: 'dragon-heist-dm'
    },
    _key: `!journal!${journalId}`
  };
}

/** Legge module.json, incrementa la patch version (3 cifre) e riscrive solo quella riga. */
function bumpVersion() {
  const moduleJsonPath = join(ROOT, 'module.json');
  let raw = readFileSync(moduleJsonPath, 'utf-8');
  const match = raw.match(/"version":\s*"([\d.]+)"/);
  if (!match) throw new Error('Versione non trovata in module.json');
  const parts = match[1].split('.').slice(0, 3).map(Number);
  parts[2] = (parts[2] || 0) + 1;
  const newVersion = parts.join('.');
  raw = raw.replace(/"version":\s*"[\d.]+"/, `"version": "${newVersion}"`);
  writeFileSync(moduleJsonPath, raw, 'utf-8');
  return newVersion;
}

// ── Definizione Pack ───────────────────────────────────────────────────────

const PACKS = [
  {
    name: 'campagna-completa',
    label: 'Dragon Heist — Sorgente Completa',
    mode: 'flat',
    dirs: ['fonti/campagna']
  },
  {
    name: 'sessioni',
    label: 'Sessioni',
    mode: 'flat',
    dirs: ['campagna/sessioni'],
    excludeSubdirs: ['recaps']
  },
  {
    name: 'missioni-secondarie',
    label: 'Missioni Secondarie',
    mode: 'grouped',
    groups: [
      { journalName: 'Arpisti', dir: 'missioni-secondarie/arpisti' },
      { journalName: 'Force Grey', dir: 'missioni-secondarie/forcegrey' },
      { journalName: 'Zentharim', dir: 'missioni-secondarie/zentharim' }
    ]
  },
  {
    name: 'pg-background',
    label: 'Background PG',
    mode: 'flat',
    dirs: ['campagna/personaggi']
  },
  {
    name: 'luoghi-visitati',
    label: 'Luoghi Visitati',
    mode: 'multipage',
    journalTitle: 'Luoghi Visitati',
    dirs: ['campagna/luoghi-visitati']
  }
];

// ── Build ──────────────────────────────────────────────────────────────────

console.log('\n🎲 Dragon Heist DM — Build Foundry Packs\n');

const SKIP_BUMP = process.env.SKIP_BUMP === '1' || process.env.SKIP_BUMP === 'true';
let newVersion;
if (SKIP_BUMP) {
  const raw = readFileSync(join(ROOT, 'module.json'), 'utf-8');
  const match = raw.match(/"version":\s*"([\d.]+)"/);
  newVersion = match ? match[1] : '0.0.0';
} else {
  newVersion = bumpVersion();
}
console.log(`📌 Versione: ${newVersion}\n`);

let totalEntries = 0;
const builtPacks = [];

for (const pack of PACKS) {
  console.log(`📦 Pack: ${pack.label}`);

  const srcDir = join(ROOT, 'src', pack.name);
  mkdirSync(srcDir, { recursive: true });
  for (const f of readdirSync(srcDir).filter(x => x.endsWith('.json'))) {
    rmSync(join(srcDir, f));
  }

  const journals = [];

  if (pack.mode === 'flat') {
    // Un JournalEntry per file
    let files = pack.dirs.flatMap(d => collectMdFiles(join(ROOT, d), pack.excludeSubdirs || []));
    files.sort();
    if (files.length === 0) {
      console.log(`   ⏭  Nessun file .md, skip\n`);
      continue;
    }
    for (const filePath of files) {
      journals.push(buildJournalEntry(filePath));
    }

  } else if (pack.mode === 'grouped') {
    // Un JournalEntry multi-pagina per gruppo (fazione)
    for (const group of pack.groups) {
      const files = collectMdFiles(join(ROOT, group.dir));
      if (files.length === 0) {
        console.log(`   ⚠  Gruppo "${group.journalName}": nessun file .md`);
        continue;
      }
      files.sort((a, b) => missionSortKey(a) - missionSortKey(b));
      const seedId = `grouped:${pack.name}:${group.journalName}`;
      journals.push(buildMultiPageJournalEntry(group.journalName, seedId, files));
    }

  } else if (pack.mode === 'multipage') {
    // Un unico JournalEntry multi-pagina con tutti i file
    const files = pack.dirs.flatMap(d => collectMdFiles(join(ROOT, d)));
    files.sort();
    if (files.length === 0) {
      console.log(`   ⏭  Nessun file .md, skip\n`);
      continue;
    }
    journals.push(buildMultiPageJournalEntry(pack.journalTitle, `multipage:${pack.name}`, files));
  }

  // Salva JSON sorgente
  for (const journal of journals) {
    const outPath = join(srcDir, `${journal._id}.json`);
    writeFileSync(outPath, JSON.stringify(journal, null, 2), 'utf-8');
    const pageCount = journal.pages.length;
    const pageInfo = pageCount > 1 ? ` (${pageCount} pagine)` : '';
    console.log(`   ✓ ${journal._id}  "${journal.name}"${pageInfo}`);
    totalEntries++;
  }

  // Compila LevelDB
  const packsRootDir = join(ROOT, 'packs');
  mkdirSync(packsRootDir, { recursive: true });
  try {
    execSync(
      `npx fvtt package pack` +
      ` --id dragon-heist-dm --type Module` +
      ` --compendiumName "${pack.name}" --compendiumType JournalEntry` +
      ` --inputDirectory "${srcDir}" --outputDirectory "${packsRootDir}"`,
      { stdio: 'inherit', cwd: ROOT }
    );
    console.log(`   ✅ Pack compilato → packs/${pack.name}\n`);
    builtPacks.push(pack.name);
  } catch (err) {
    console.error(`   ❌ Errore compilazione pack ${pack.name}:`);
    console.error(`      ${err.message}\n`);
  }
}

// ── Riepilogo ──────────────────────────────────────────────────────────────

console.log('─'.repeat(60));
console.log(`✅ Build completata  (v${newVersion})`);
console.log(`   Journal Entry generate : ${totalEntries}`);
console.log(`   Pack compilati         : ${builtPacks.length} (${builtPacks.join(', ')})`);
console.log('');
console.log('Prossimo passo: ricarica il tuo World in Foundry VTT (F5 o');
console.log('"Return to Setup → Launch World") per vedere i pack aggiornati.');
console.log('');
