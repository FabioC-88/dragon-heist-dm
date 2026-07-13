---
name: aggiorna-sessione
description: >
  Workflow completo post-sessione per la campagna ATTIVA (Dragon Heist o Sottomonte, risolta dal
  registro ai/knowledge/campagne.md). Il DM ha appena giocato l'unità N (una sessione per Dragon
  Heist, un livello di dungeon per Sottomonte) e fornisce un recap in forma libera. La skill
  riformatta il recap, finalizza le note con la realtà giocata, aggiorna i file di contorno
  (party/PNG/rapporti condivisi + quest-pool/fazioni), aggiorna i luoghi story-relevant, e — solo
  per sessioni-lineari — prepara la N+1. Ramo capitoli-dungeon: recap story-focused, niente
  trasferimento scene, niente prep automatica del livello successivo.
  Uso: "/aggiorna-sessione [campagna] N". Alias: "abbiamo giocato la sessione/il livello N",
  "recap della sessione N", "aggiorna dopo sessione N".
---

# Workflow Post-Sessione — /aggiorna-sessione

Sei l'orchestratore del flusso post-sessione. Il DM ha appena giocato la sessione **N** e ti
ha fornito un recap (in qualsiasi forma). Il tuo compito è eseguire tutti gli step in sequenza,
dalla strutturazione del recap fino alla release, senza richiedere interventi intermedi salvo
dove indicato.

La realtà giocata ha sempre la precedenza sul piano teorico.

---

## Step 0 — Risolvi campagna attiva + verifica prerequisiti

0. **Risolvi la campagna attiva** leggendo `ai/knowledge/campagne.md`: token esplicito
   (es. `/aggiorna-sessione sottomonte 3`) → `attiva_default` → in dubbio **chiedi al DM**. Carica i
   path e il **`modello_prep`**. Da qui in poi usa `{sessioni_path}`/`{capitoli_path}`, `{recaps_path}`,
   `{stato_missioni_path}`, `{contesto_path}`, `{luoghi_path}`, `{fazioni_path}`, `{pack_luoghi}` risolti.

   **Ramo `capitoli-dungeon` (Sottomonte):** l'unità è un **livello di dungeon**, il recap è
   **story-focused** e **non lineare** → nel **Percorso B** più sotto usa la variante capitoli-dungeon:
   niente trasferimento di "scene non giocate", niente prep di "N+1"; si aggiorna lo stato dei
   ganci/quest e del file capitolo. Il "Step 6 — Prepara N+1" diventa "prepara il capitolo del
   livello successivo **solo quando il party ci scende**" (di norma si salta subito dopo il recap).

1. Identifica il numero **N** dell'unità appena giocata (sessione o livello).
   - Se specificato nel comando → usa quel numero.
   - Se non specificato → chiedi al DM.

2. Verifica che esista `{sessioni_path|capitoli_path}<unità>-[N].md`.
   - Se non esiste: fermati e avvisa il DM — non si può aggiornare un'unità mai preparata.

3. Verifica il recap. Uno dei seguenti deve essere vero:
   - Il DM ha fornito il testo del recap direttamente nel prompt → usa quello.
   - Esiste già `{recaps_path}recap-<unità>-[N].md` → usalo.
   - Se né l'uno né l'altro: chiedi al DM di fornire il recap (anche in forma libera).

Mostra una conferma dei file identificati prima di procedere:
```
📋 [Sessione | Livello] [N] identificato — campagna: [attiva].
   note: {sessioni_path|capitoli_path}<unità>-[N].md ✅
   recap: [da prompt / da file] ✅

Avvio pipeline post-[sessione|livello]...
```

---

## Pipeline (esegui nell'ordine)

Tra uno step e il successivo, mostra: `✅ Step N completato → avvio Step N+1...`

---

### Step 1 — Riformatta recap (Agente 0 — Fase A)

Leggi ed esegui le istruzioni di `ai/agents/00-recap-updater.agent.md`, **solo la Fase A**.

Obiettivo: trasformare il testo grezzo del DM nel formato standard strutturato e salvarlo in
`ai/knowledge/recaps/recap-sessione-[N].md`.

Se il recap era già strutturato nel formato corretto, questo step è veloce: verifica la struttura
e procedi.

---

### Step 2 — Finalizza dm-notes sessione N (Agente 0 — Fase B)

Leggi ed esegui le istruzioni di `ai/agents/00-recap-updater.agent.md`, **solo la Fase B**.

File da leggere:
- `{recaps_path}recap-<unità>-[N].md` ← output Step 1
- `{sessioni_path|capitoli_path}<unità>-[N].md` ← piano originale da annotare

Obiettivo *(ramo sessioni-lineari)*: annotare le note con i marcatori ✅/⏸️/🔀 per ogni fase, aggiungere
la sezione `📋 ACCADUTO IN SESSIONE` con tabella delta e lista delle scene non giocate da
trasferire a N+1.

**Non leggere né considerare file di sessione con numero > N.**

---

### Step 3 — Riverifica hook PG (Agente 3)

Leggi ed esegui le istruzioni di `ai/agents/03-session-pc-integrator.agent.md`.

Questo step verifica che le note DM riservate per i PG nel dm-notes-N siano ancora coerenti
con la realtà giocata. Non si tratta di aggiungere nuovi hook, ma di correggere quelli già
presenti che siano stati invalidati dai delta.

È uno step rapido: se non ci sono discrepanze, conferma e procedi.

---

### Step 4 — Aggiorna file di contorno (Agente 8)

Leggi ed esegui le istruzioni di `ai/agents/08-context-updater.agent.md`.

File da leggere e aggiornare:
- `ai/knowledge/party.md`, `ai/knowledge/png-incontrati.md`, `ai/knowledge/rapporti.md` (condivisi)
- `{stato_missioni_path}` (missioni fazione OPPURE quest-pool)
- `{fazioni_path}` (solo se valorizzato; `n/d` → salta)
- `{contesto_path}` (progressione: Capitolo / Livello dungeon corrente)

Obiettivo: aggiornare sistematicamente i file di contorno sulla base del recap strutturato
(Step 1) e delle note finalizzate (Step 2). Vincoli dell'Agente 8: aggiornare solo ciò che è
esplicitamente citato nel recap. **Ramo capitoli-dungeon:** recap story-focused (ganci avanzati,
PNG chiave), aggiorna il quest-pool e lo stato nel file capitolo-livello.

---

### Step 5 — Aggiorna luoghi visitati (Agente 7)

Leggi ed esegui le istruzioni di `ai/agents/07-location-updater.agent.md`.

File da leggere:
- `{sessioni_path|capitoli_path}<unità>-[N].md` ← input principale
- `{luoghi_path}*.md` ← stato attuale del compendio

Esegui l'intero flusso dell'Agente 7:
1. Estrai i luoghi con interazione fisica (ramo capitoli-dungeon: **solo luoghi story-relevant**)
2. Crea o aggiorna i file markdown in `{luoghi_path}`
3. Se `{pack_luoghi}` è valorizzato, esegui `npm run build` e verifica; se `n/d`, salta build/commit del pack
4. Segnala eventuali errori di build senza procedere al commit

---

### Step 6 — Prepara la prossima unità

**Ramo `capitoli-dungeon` (Sottomonte):** di norma **salta** questo step subito dopo il recap — il
livello successivo si prepara **solo quando il party ci scende** (esplorazione non lineare). Non
trasferire "scene non giocate".

**Ramo `sessioni-lineari` (Dragon Heist):** verifica se esiste `{sessioni_path}dm-notes-sessione-[N+1].md`.

---

#### PERCORSO A — Sessione N+1 già esiste

Se il file esiste, applicagli i delta dalla sessione N appena finalizzata:

**Step 6A.1 — Trasferisci scene non giocate**

Leggi la sezione `### Scene da Trasferire a Sessione N+1` dal dm-notes-N (aggiunta in Step 2).
Per ogni scena elencata:
1. Copia il contenuto verbatim (copialo integralmente, senza riassumere) dal dm-notes-N.
2. Inseriscilo in dm-notes-[N+1].md **all'inizio delle fasi** (prima del contenuto già pianificato),
   rinumerando le fasi esistenti di conseguenza (es. la scena spostata diventa Fase 0 o Fase 1).
3. Aggiorna l'header di dm-notes-[N+1] (Contesto, SETUP INIZIALE) per rispecchiare lo stato
   reale del party dopo sessione N (usando i valori aggiornati da party.md e png-incontrati.md).

**Step 6A.2 — Riverifica hook PG su sessione N+1 (Agente 3)**

Leggi ed esegui `ai/agents/03-session-pc-integrator.agent.md` su dm-notes-[N+1].md.
Verifica che gli hook PG siano coerenti con la nuova realtà dopo sessione N.

**Step 6A.3 — Aggiorna hook missioni su sessione N+1 (Agente 4)**

Leggi ed esegui `ai/agents/04-session-missions-integrator.agent.md` su dm-notes-[N+1].md.
Priorità: missioni cambiate di stato in sessione N (Aggiornato in Step 4).

**Step 6A.4 — Revisione finale sessione N+1 (Agente 6)**

Leggi ed esegui `ai/agents/06-session-reviewer.agent.md` su dm-notes-[N+1].md.
Output: dm-notes-sessione-[N+1].md finalizzato con Revision Log.

---

#### PERCORSO B — Sessione N+1 non esiste

Se il file NON esiste, crea la sessione da zero con la pipeline completa di prep-sessione,
partendo già con il contesto aggiornato dalla sessione N:

**Step 6B.1 — Estrai chunk narrativo (Agente 1)**

Leggi ed esegui `ai/agents/01-session-extractor.agent.md`.
Il marker di avanzamento viene letto dal dm-notes-N finalizzato.

**Step 6B.2 — Traduzione italiana (Agente 2)**

Leggi ed esegui `ai/agents/02-session-translator.agent.md`.

**Step 6B.3 — Integra hook PG (Agente 3)**

Leggi ed esegui `ai/agents/03-session-pc-integrator.agent.md`.

**Step 6B.4 — Integra hook missioni (Agente 4)**

Leggi ed esegui `ai/agents/04-session-missions-integrator.agent.md`.
I file di contorno aggiornati in Step 4 riflettono già la realtà post-sessione N.

**Step 6B.5 — Uniformazione stile (Agente 2 — re-invoke)**

Leggi ed esegui `ai/agents/02-session-translator.agent.md` per uniformare le sezioni aggiunte
dagli Agenti 3 e 4.

**Step 6B.6 — Revisione finale (Agente 6)**

Leggi ed esegui `ai/agents/06-session-reviewer.agent.md`.
Output: dm-notes-sessione-[N+1].md finalizzato con Revision Log.

**Step 6B.7 — (Condizionale) Aggiornamento PNG nei file PG (Agente 5)**

Se la sessione N+1 appartiene a un capitolo diverso rispetto al capitolo corrente in
`{contesto_path}`, leggi ed esegui `ai/agents/05-pg-png-updater.agent.md`.

---

### Step 7 — Git commit

Esegui il commit di tutti i file modificati in questa pipeline:

```
# Path risolti dal registro per la campagna attiva (aggiungi solo ciò che esiste):
git add {sessioni_path} {capitoli_path} {read_aloud_path} {luoghi_path} \
        {contesto_path} {stato_missioni_path} \
        ai/knowledge/party.md ai/knowledge/png-incontrati.md ai/knowledge/rapporti.md \
        {fazioni_path} \
        {recaps_path} \
        packs/{pack_luoghi}/          # salta se pack_luoghi = n/d
git commit -m "feat: recap e aggiornamento [sessione|livello] [N] (campagna: [attiva])"
git push origin master
```

Usa sempre il sistema .NET per encoding (vedi `ai/agents/git-procedures.agent.md`):
mai `Set-Content` diretto per file con caratteri speciali.

---

### Step 8 — Release (con conferma DM)

Mostra il riepilogo di cosa è cambiato e chiedi conferma esplicita prima di procedere:

```
📦 RIEPILOGO RELEASE

File aggiornati questa sessione:
  - dm-notes-sessione-[N].md (finalizzato)
  - dm-notes-sessione-[N+1].md ([aggiornato / creato da zero])
  - party.md, png-incontrati.md, missioni-secondarie.md, rapporti.md
  - [N] file in luoghi-visitati/

Versione corrente in module.json: [versione]

Vuoi procedere con la release? (sì / no)
Se sì: indica la nuova versione (es. v1.2.0) o lascia decidere automaticamente (+patch).
```

Se il DM conferma, leggi ed esegui `ai/agents/git-procedures.agent.md` per il workflow
completo di release (build → bump → tag → GitHub Release).

Se il DM non vuole fare la release ora, concludi con il riepilogo finale.

---

## Riepilogo finale

```
✅ Workflow post-sessione completato — Sessione [N]

Sessione [N]:
  Stato: finalizzato con annotazioni realtà vs piano
  Scene non giocate: [N] → trasferite a sessione [N+1]
  
Sessione [N+1]:
  Stato: [aggiornata con delta / creata da zero]
  
File di contorno aggiornati:
  party.md, png-incontrati.md, missioni-secondarie.md, rapporti.md
  
Luoghi visitati: [N] file aggiornati/creati, pack recompilato
  
TODO DM aperti:
  [lista dei TODO emersi dall'Agente 0 e dall'Agente 8]

Release: [completata vX.Y.Z / rimandata]
```
