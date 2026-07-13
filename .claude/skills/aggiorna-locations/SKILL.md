---
name: aggiorna-locations
description: >
  Aggiorna il compendio "Luoghi Visitati" della campagna attiva (Dragon Heist o Sottomonte) dopo
  un'unità completata. Risolve i path dal registro ai/knowledge/campagne.md, legge le note finalizzate
  dall'Agente 6, crea/aggiorna i file markdown nella cartella luoghi della campagna, e (se il pack è
  registrato) esegue npm run build e prepara il commit Git.
  Usa questa skill dopo ogni sessione/livello giocato: "/aggiorna-locations [campagna] NN",
  "aggiorna i luoghi della sessione N", "update locations sessione N".
  NON usare mentre prepari — i luoghi devono essere già stati visitati.
---

# Aggiornamento Luoghi Visitati — /aggiorna-locations

> ⚠️ **NOTA**: Dal workflow unificato post-sessione, l'aggiornamento dei luoghi è integrato
> automaticamente in `/aggiorna-sessione` (Step 5). Usa questa skill standalone solo se hai
> bisogno di aggiornare i luoghi in isolamento (es. hai saltato lo step o vuoi rieseguirlo).

Sei lo specialista di aggiornamento del compendio Foundry VTT "Luoghi Visitati". Una sessione è
appena stata giocata e il Reviewer (Agente 6) ha finalizzato il file dm-notes. Il tuo compito è
estrarre ogni luogo visitato, aggiornare i file markdown del compendio, compilare il pack e
preparare il commit.

**⚠️ TIMING CRITICO**: Questa skill si usa solo DOPO che la sessione è stata giocata e
dm-notes-sessione-NN.md è stato finalizzato dall'Agente 6. Mai durante la preparazione.

---

## Step 0 — Risolvi campagna attiva + verifica prerequisiti

0. **Risolvi la campagna attiva** da `ai/knowledge/campagne.md` (token esplicito → default → chiedi).
   Carica `modello_prep`, `sessioni_path`/`capitoli_path`, `luoghi_path`, `pack_luoghi`.
   **Ramo capitoli-dungeon (Sottomonte):** registra **solo i luoghi story-relevant** (non ogni stanza);
   se `pack_luoghi = n/d`, genera i markdown ma **salta build/commit del pack**.
1. Determina il numero NN dell'unità. Se non specificato, chiedi al DM.
2. Verifica che esista `{sessioni_path|capitoli_path}<unità>-NN.md`.
3. Controlla che il file contenga la sezione `## Revision Log` — marker di finalizzazione (Agente 6).

**Se il file non esiste o manca il Revision Log**, fermati e avvisa:

```
⚠️ dm-notes-sessione-NN.md non trovato o non finalizzato.
Assicurati di aver completato /aggiorna-sessione NN prima di aggiornare i luoghi.
```

---

## Pipeline (esegui nell'ordine)

Tra uno step e il successivo, mostra: `✅ Step N completato → avvio Step N+1...`

### Step 1 — Estrai luoghi visitati (Agente 7)

Leggi ed esegui le istruzioni di `ai/agents/07-location-updater.agent.md` (Step 1 e 2).

File da leggere:
- `{sessioni_path|capitoli_path}<unità>-NN.md` ← input principale
- `{luoghi_path}*.md` ← stato attuale del compendio

Scansiona tutte le sezioni FASE e le sottosezioni Tappa. Per ogni luogo con interazione fisica:
- Registra nome del luogo, quartiere/zona, evento accaduto, PNG incontrati
- Usa formato GENERICO: "Il party ha..." — mai nomi PG specifici
- Escludi menzioni passanti senza interazione

**Non aggiungere luoghi se il party li ha solo menzionati o visti da lontano.**

### Step 2 — Crea/aggiorna file luoghi (Agente 7)

Leggi ed esegui le istruzioni di `ai/agents/07-location-updater.agent.md` (Step 3, 4A, 4B, 5).

Per ogni luogo estratto:

**Se NUOVO** — crea `{luoghi_path}NN-nome-slug.md` con la struttura:
```markdown
# Nome del Luogo

**Quartiere/Zona**: Nome Quartiere, Area
**Sessioni Visitate**: SX
**Descrizione**: Descrizione breve (2-3 righe) senza nomi PG specifici.

## PNG Incontrati

- PNG 1 (brevissima descrizione)

## Eventi Importanti

- [SX] Il party ha [azione generica]

## Note Aggiuntive

Note storiche, referenze, o contesto.
```

**Se ESISTENTE** — aggiungi evento in `## Eventi Importanti` e aggiorna `**Sessioni Visitate**`:
```markdown
- [SX] Il party ha [azione generica]
```

Numerazione file: sequenziale progressiva (`01-`, `02-`, …), senza limite fisso.

### Step 3 — Build compendio *(salta se `pack_luoghi = n/d`)*

```bash
npm run build
```

Verifica che l'output contenga:
```
✓ 9bd14f4f1a5f9a82  "Luoghi Visitati"  (NN pagine)
```

Dove NN corrisponde al numero totale di file .md in `{luoghi_path}`.

**⚠️ Nota**: `npm run build` richiede Node.js installato localmente. Se il build fallisce,
segnala l'errore al DM senza procedere al commit.

### Step 4 — Verifica JSON compilato

Conta le pagine generate per confermare che il build sia completo:

```powershell
Get-Content src/luoghi-visitati/9bd14f4f1a5f9a82.json | Select-String '"name"' | Measure-Object
```

Il conteggio deve corrispondere al numero di file .md in `{luoghi_path}`.

---

## Riepilogo finale

```
✅ Luoghi Visitati aggiornati — Sessione NN

Luoghi processati:
  Nuovi:      [lista nomi nuovi luoghi]
  Aggiornati: [lista nomi luoghi esistenti con nuovo evento]

File modificati:
  {luoghi_path}  ([N] file)
  packs/{pack_luoghi}/              (pack recompilato; assente se pack_luoghi = n/d)

Messaggio commit suggerito:
  feat: sessione NN — aggiornamento compendio Luoghi Visitati

  - Aggiunti: [nuovi luoghi]
  - Aggiornati: [luoghi esistenti]
  - Pack campagna recompilato ([N] pagine totali)

Prossimo step: commit e push con git-procedures o /git-release.
```
