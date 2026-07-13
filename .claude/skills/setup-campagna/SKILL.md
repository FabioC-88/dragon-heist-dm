---
name: setup-campagna
description: >
  Bootstrap di una nuova campagna D&D. Legge i materiali grezzi in fonti/ e genera tutti i file
  strutturati necessari alla pipeline DM: contesto, party, fazioni, missioni, personaggi.
  Usa questa skill quando il DM vuole iniziare una nuova campagna da zero: "/setup-campagna",
  "inizia nuova campagna", "crea i file strutturati dalle fonti". Da eseguire una sola volta per
  campagna dopo aver caricato i materiali grezzi in fonti/. NON usare per aggiornare una campagna
  già avviata — per quello usa /aggiorna-sessione.
---

# Bootstrap Nuova Campagna — /setup-campagna

Sei l'agente di setup per una nuova campagna D&D 5e. Il tuo compito è leggere i materiali grezzi
e generare tutti i file strutturati che gli altri agenti useranno durante tutta la campagna.

> **⚠️ NON distruttivo:** il repo ospita **più campagne in parallelo** (registro `ai/knowledge/campagne.md`).
> Questo setup **aggiunge** una campagna, non sostituisce le altre. Crea una cartella dedicata
> `campagna-<slug>/`, **registra** la campagna nel registro, e — se il party continua da una campagna
> precedente — **eredita** i file condivisi (`party.md`, `png-incontrati.md`, `rapporti.md`) senza rigenerarli.

**Regola fondamentale:** non inventare informazioni non presenti nelle fonti. Usa `[TODO: da compilare]`
per i gap e vai avanti — è meglio un file incompleto onesto che uno inventato.

---

## Step 1 — Verifica materiali disponibili

Controlla cosa è presente in `fonti/`:

```
fonti/campagna/     ← deve contenere il libro/modulo principale (es. Dragon Heist.md)
fonti/missioni/     ← testi grezzi delle missioni secondarie
fonti/personaggi/   ← file BG dei PG (es. NomeGiocatore.md)
fonti/lore/         ← opzionale: guide ambientazione, gazetteer
```

Se una cartella essenziale è vuota o mancante, segnalalo prima di procedere.

---

## Step 2 — Intervista al DM

Fai **tutte queste domande in un unico messaggio**, poi aspetta le risposte prima di generare i file:

1. **Titolo campagna + slug:** come si chiama e con quale slug breve (es. `sottomonte`)?
2. **Modello di prep:** `sessioni-lineari` (trama guidata, chunk ~2h30m, progressione a capitoli) o
   `capitoli-dungeon` (megadungeon non lineare, un file per livello, progressione a livelli)?
3. **Party:** è lo **stesso party** di una campagna precedente (→ eredita i file condivisi) o nuovo?
   Per ogni giocatore: nome giocatore, PG, razza/classe, fazione.
4. **Villain/antagonista principale:** chi è, obiettivo, cosa non sa il party?
5. **Fazioni:** presenti sì/no. Se sì: nome, referente PNG, stile, numero missioni. Se no (megadungeon):
   `fazioni_path = n/d`, le quest vanno nel quest-pool di `stato-missioni`.
6. **Durata media sessioni** *(solo `sessioni-lineari`)* e **livello di partenza**.
7. **Fonte principale (`libro_fonte`):** qual è il file in `fonti/campagna/`?

---

## Step 3 — Registra e genera i file (non distruttivo)

Dopo le risposte del DM, esegui le istruzioni complete di `ai/agents/00-campaign-setup.agent.md`:

1. **Registra la campagna** nel registro `ai/knowledge/campagne.md` (scheda con tutti i campi + slug).
2. **Crea la cartella** `campagna-<slug>/` con le sottocartelle del `modello_prep` scelto.
3. Genera nella cartella della campagna: il **contesto** (`contesto-<slug>.md`, con il campo di
   progressione adatto: Capitolo corrente **o** Livello dungeon corrente) e lo **stato-missioni/quest**.
4. Se `modello_prep = sessioni-lineari` e ci sono fazioni: genera `fazioni.md` (con `folder_path`/`fonti_path`)
   e i file `missioni-secondarie/{fazione}/M#-*.md`. Se megadungeon: popola il **quest-pool** in stato-missioni.
5. **File condivisi** (`party.md`, `png-incontrati.md`, `rapporti.md`): **eredita** se il party continua;
   genera da zero solo se è un party nuovo.
6. Genera/aggiorna `{personaggi_path}NomePG.md` per ogni PG (condiviso se stesso party).
7. (Se va su Foundry) registra i pack in `build-foundry.mjs` + `module.json`.

---

## Riepilogo finale

Stampa al termine (adattando i path allo slug scelto):

```
✅ Campagna <slug> registrata in ai/knowledge/campagne.md e file generati:
- campagna-<slug>/contesto-<slug>.md
- campagna-<slug>/stato-missioni-<slug>.md  (quest-pool o missioni fazione)
- [campagna-<slug>/... sottocartelle del modello_prep]
- [fazioni.md + missioni-secondarie/ se sessioni-lineari con fazioni]
- File condivisi: ereditati / creati (party.md, png-incontrati.md, rapporti.md)
- {personaggi_path}NomePG.md (N file)

⚠️ TODO da completare manualmente:
[lista campi [TODO] aperti]

Prossimo passo: /prep-sessione <slug> per preparare la prima unità.
```
