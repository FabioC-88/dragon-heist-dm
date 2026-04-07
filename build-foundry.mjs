#!/usr/bin/env node
/**
 * build-foundry.mjs
 *
 * Converte i file Markdown della campagna in Compendium Packs di JournalEntry
 * compatibili con Foundry VTT V12+.
 *
 * Flusso:
 *   1. Legge tutti i .md dalle cartelle sorgente
 *   2. Converte Markdown → HTML con marked
 *   3. Genera oggetti JSON in formato JournalEntry (Foundry V10+)
 *   4. Salva i JSON in src/{pack-name}/
 *   5. Chiama `fvtt package pack` per compilare ogni pack in LevelDB (packs/{pack-name}/)
 *
 * Utilizzo:
 *   npm install
 *   npm run build
 *
 * Dopo il build: ricarica il World in Foundry (F5 o "Return to Setup → Launch").
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
    .replace(/([A-Z])/g, ' $1')   // CamelCase → spazi
    .replace(/[-_]/g, ' ')         // kebab/snake → spazi
    .replace(/\s+/g, ' ')
    .trim();
}

/** Raccoglie tutti i file .md in modo ricorsivo. */
function collectMdFiles(dir) {
  if (!existsSync(dir)) return [];
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMdFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

// ── Conversione MD → JournalEntry JSON ────────────────────────────────────

/**
 * Genera un oggetto JournalEntry Foundry V10+ da un file Markdown.
 * Gli ID sono deterministici (basati sul path relativo) per garantire
 * stabilità tra build successive senza ricreate i compendi.
 */
function buildJournalEntry(filePath) {
  const relPath    = relative(ROOT, filePath).replace(/\\/g, '/');
  const journalId  = makeId(relPath);
  const pageId     = makeId(relPath + ':page0');
  const title      = fileToTitle(filePath);
  const mdContent  = readFileSync(filePath, 'utf-8');
  const htmlContent = marked.parse(mdContent);
  const now        = Date.now();

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
    sort:      0,
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

// ── Definizione Pack ───────────────────────────────────────────────────────

const PACKS = [
  {
    name: 'missioni-arpisti',
    label: 'Missioni — Arpisti',
    dirs: ['Missioni/Arpisti']
  },
  {
    name: 'missioni-forcegrey',
    label: 'Missioni — Force Grey',
    dirs: ['Missioni/ForceGrey']
  },
  {
    name: 'missioni-zentharim',
    label: 'Missioni — Zentharim',
    dirs: ['Missioni/Zentharim']
  },
  {
    name: 'pg-backgrounds',
    label: 'Background PG',
    dirs: ['PG-Background']
  },
  {
    name: 'campagna',
    label: 'Note Campagna',
    dirs: ['Campagna']
  }
];

// ── Build ──────────────────────────────────────────────────────────────────

console.log('\n🎲 Dragon Heist DM — Build Foundry Packs\n');

let totalEntries = 0;
const builtPacks = [];

for (const pack of PACKS) {
  // Raccoglie tutti i file .md per questo pack
  const mdFiles = pack.dirs.flatMap(d => collectMdFiles(join(ROOT, d)));

  if (mdFiles.length === 0) {
    console.log(`⏭  ${pack.name} — nessun file .md, skip\n`);
    continue;
  }

  console.log(`📦 Pack: ${pack.label} (${mdFiles.length} file)`);

  // 1. Genera JSON sorgente in src/{pack}/
  const srcDir = join(ROOT, 'src', pack.name);
  mkdirSync(srcDir, { recursive: true });

  // Rimuovi vecchi JSON per evitare residui di file rinominati
  for (const f of readdirSync(srcDir).filter(x => x.endsWith('.json'))) {
    rmSync(join(srcDir, f));
  }

  for (const filePath of mdFiles) {
    const journal  = buildJournalEntry(filePath);
    const outPath  = join(srcDir, `${journal._id}.json`);
    writeFileSync(outPath, JSON.stringify(journal, null, 2), 'utf-8');
    const relFile  = relative(ROOT, filePath).replace(/\\/g, '/');
    console.log(`   ✓ ${journal._id}  "${journal.name}"  (${relFile})`);
    totalEntries++;
  }

  // 2. Compila LevelDB con fvtt-cli
  // Il CLI crea automaticamente una sottocartella con il nome del compendio
  // dentro outputDirectory: packs/{pack.name}/
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
console.log(`✅ Build completata`);
console.log(`   Journal Entry generate : ${totalEntries}`);
console.log(`   Pack compilati         : ${builtPacks.length} (${builtPacks.join(', ')})`);
console.log('');
console.log('Prossimo passo: ricarica il tuo World in Foundry VTT (F5 o');
console.log('"Return to Setup → Launch World") per vedere i pack aggiornati.');
console.log('');
