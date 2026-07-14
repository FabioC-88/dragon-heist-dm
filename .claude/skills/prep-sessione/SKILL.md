---
name: prep-sessione
description: >
  Orchestratore della pipeline completa di preparazione per la campagna ATTIVA (Dragon Heist o
  Sottomonte). Usa questa skill ogni volta che il DM vuole preparare una nuova unità di gioco, anche
  se scrive semplicemente "/prep-sessione" o "prepara la sessione/il capitolo" o "prossima". Ramifica
  sul modello_prep della campagna: sessioni-lineari (agenti 1→2→3→4→2→6, +5 a cambio capitolo) o
  capitoli-dungeon (agenti 1→2→3→4→6→9 per un livello di dungeon). Produce il file pronto per il tavolo.
---

# Pipeline Preparazione — /prep-sessione

Sei l'orchestratore della pipeline DM. Guidi la preparazione eseguendo in sequenza gli agenti in `ai/agents/`.

## Passo 0 — Risolvi la campagna attiva (SEMPRE per primo)

1. Leggi `ai/knowledge/campagne.md`. Determina la **campagna attiva**: token esplicito
   nell'invocazione (es. `/prep-sessione sottomonte 3`) → `attiva_default` → in dubbio **chiedi al DM**.
2. Carica i path della sua scheda e leggi il **`modello_prep`**.
3. **Ramifica:**
   - `modello_prep = sessioni-lineari` (Dragon Heist) → esegui **Pipeline A** (sotto). Il numero
     sessione target, se non specificato, = file in `{sessioni_path}dm-notes-sessione-*.md` + 1.
   - `modello_prep = capitoli-dungeon` (Sottomonte) → esegui **Pipeline B** (sotto). Il target è un
     **livello di dungeon** (dal DM o dal "Livello dungeon corrente" in `{contesto_path}`); **nessun
     conteggio "prossima sessione", nessun sizing a 2h30m**.

---

## Pipeline A — `sessioni-lineari` (Dragon Heist)

Tra uno step e il successivo, mostra un breve messaggio di avanzamento:
`✅ Agente N completato → avvio Agente N+1...`

### Step 1 — Estrazione chunk narrativo
Leggi ed esegui le istruzioni di `ai/agents/01-session-extractor.agent.md`.

Input: ultimo `{sessioni_path}dm-notes-sessione-XX.md` (per il marker) + `{libro_fonte}` (Modalità A)
Output: documento grezzo con chunk EN, testi boxed marcati `[BOXED TEXT — ID: BT-XX]`, indice encounter.

### Step 2 — Traduzione e stile italiano
Leggi ed esegui le istruzioni di `ai/agents/02-session-translator.agent.md`.

Input: output Step 1
Output: draft IT con testi boxed espansi. Aggiunte atmosferiche in blockquote separati `*[aggiunta atmosferica]*`.
Tutte le informazioni dell'originale devono essere presenti — nessun dettaglio può essere omesso.

### Step 3 — Integrazione personaggi giocanti
Leggi ed esegui le istruzioni di `ai/agents/03-session-pc-integrator.agent.md`.

Input: draft IT da Step 2
File da leggere: `ai/knowledge/party.md`, `ai/knowledge/png-incontrati.md`, `ai/knowledge/rapporti.md` (condivisi),
`{fazioni_path}`, `{contesto_path}`, `{personaggi_path}*.md`
Output: draft con hook PG, scene spotlight opzionali, note DM riservate, atteggiamenti PNG aggiornati.

### Step 4 — Integrazione missioni fazioni
Leggi ed esegui le istruzioni di `ai/agents/04-session-missions-integrator.agent.md`.

Input: draft da Step 3
File da leggere: `{stato_missioni_path}`, `{fazioni_path}` (per `folder_path` e `fonti_path`),
file missioni nelle cartelle indicate da `fazioni.md`.
Output: draft con max 2-3 hook missione inseriti nei momenti di respiro narrativo. Tabella thread narrativi.

### Step 5 — Uniformazione stile (seconda invocazione Agente 2)
Leggi ed esegui di nuovo le istruzioni di `ai/agents/02-session-translator.agent.md`.

Questa volta il tuo ruolo è solo uniformare lo stile italiano sulle parti aggiunte dagli Agenti 3 e 4.
Non stravolgere le integrazioni — solo correggi calchi linguistici e incongruenze di registro.

### Step 6 — Revisione finale
Leggi ed esegui le istruzioni di `ai/agents/06-session-reviewer.agent.md`.

Input: draft quasi-finale da Step 5 + ultimo `{sessioni_path}dm-notes-sessione-XX.md` giocato
Applica direttamente le correzioni (non solo segnalarle). Genera Revision Log.
Output: `{sessioni_path}dm-notes-sessione-NN.md` finalizzato con sezione `🔍 REVISION LOG — Agente 6`.

### Step 6.5 — Aggiornamento PNG nei file PG (condizionale)
Leggi `{contesto_path}` e controlla il campo di progressione (`Capitolo corrente`).
Confronta col capitolo della sessione appena preparata.

**Solo se il capitolo della sessione > Capitolo corrente:** esegui le istruzioni di
`ai/agents/05-pg-png-updater.agent.md`.
Output: sezione "PNG Conosciuti e Incontrati" aggiornata in ogni `{personaggi_path}PG.md`.
Aggiorna `{contesto_path}` con il nuovo capitolo corrente.

Se il capitolo non è cambiato: stampa `⏭ Step 6.5 saltato (nessuna transizione di capitolo)`.

---

## Pipeline B — `capitoli-dungeon` (Sottomonte)

Target = un **livello di dungeon**. Nessun conteggio "prossima sessione", nessun sizing a tempo.

> **Standard di scrittura (vincolante):** gli **snodi** di trama/missione del livello (aree marcate
> `**Sì**`) vanno scritti come **scene giocabili complete** — read-aloud `[BOXED TEXT — ID: BT-Lnn-N]`,
> dialoghi PNG, meccaniche/CD, tattiche, rami e ricompense `[[/award …]]` — **non** come appunti
> `[NOTA DM]`. Le stanze non-snodo → solo read-aloud breve (Step 9). Template e regola d'oro in
> `ai/agents/AGENTS.md` → "Standard di scrittura per capitoli-dungeon"; esempi in `livello-01`/`livello-02`.

- **Step 1 — Estrazione per rilevanza** (`01-session-extractor`, Modalità B): dal `{libro_fonte}`, estrai
  solo il materiale **rilevante per la campagna** del livello + l'elenco delle aree keyed.
- **Step 2 — Traduzione IT** (`02-session-translator`).
- **Step 3 — Hook PG** (`03-session-pc-integrator`): file condivisi + `{contesto_path}`; `fazioni_path = n/d`.
- **Step 4 — Ganci/quest** (`04-session-missions-integrator`, modalità quest-pool): leggi `{stato_missioni_path}`
  e intreccia **solo i ganci/quest che atterrano su questo livello**.
- **Step 6 — Revisione** (`06-session-reviewer`, ramo capitoli-dungeon): output `{capitoli_path}livello-NN-<slug>.md`.
- **Step 9 — Read-aloud pre-generati** (`09-room-narration`): per ogni area keyed non-snodo, un breve
  read-aloud → `{read_aloud_path}livello-NN-<slug>.md`.
- **Progressione:** aggiorna "Livello dungeon corrente" in `{contesto_path}` quando il party scende
  a un nuovo livello (trigger dell'agente 5 = cambio livello).

---

## Riepilogo finale

Al termine, stampa (adattando i path alla campagna attiva):

```
✅ Pipeline completata — [Sessione NN | Livello NN]

File prodotti:
# sessioni-lineari:
- {sessioni_path}dm-notes-sessione-NN.md
[- {personaggi_path}*.md  ← sezione PNG aggiornata, solo se Step 6.5 attivo]
# capitoli-dungeon:
- {capitoli_path}livello-NN-<slug>.md
- {read_aloud_path}livello-NN-<slug>.md

Prossimi step manuali:
1. Leggi e approva il file prodotto
2. /aggiorna-locations [NN]  (dopo aver giocato)
3. /git-release  (per pubblicare su Foundry, se il pack è registrato)
```
