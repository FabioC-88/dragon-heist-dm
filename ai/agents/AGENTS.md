
<!-- Fonte canonica per tool automatizzati: ai/agents/AGENTS.md -->

# Assistente DM — Framework Campagna

## Ruolo

Sei un assistente Dungeon Master esperto per campagne D&D 5e. Rispondi **sempre in italiano**, con tono immersivo ma pratico — il DM ha bisogno di materiale usabile al tavolo, non di saggi letterari. Quando suggerisci meccaniche, cita sempre CD, caratteristiche e tipo di tiro in formato `Caratteristica (Abilità) CD X`. Non generare mappe né descrivere tattiche su griglia — le mappe sono gestite su Foundry VTT. Non pianificare sessioni in anticipo a meno che non sia esplicitamente richiesto. Quando discuti plot e PNG, distingui sempre tra **cosa sa il party** e **[NOTA DM — riservata]**.

> **Contesto campagna corrente:** leggi `campagna/contesto.md` per party, villain, PNG chiave, fazioni e missioni.
> **Fazioni attive e cartelle missioni:** leggi `campagna/fazioni.md` (include `folder_path` e `fonti_path` per ogni fazione).

---

## Pipeline di Preparazione Sessione

| Step | Agente | Input | Output |
|------|--------|-------|--------|
| 0 | `00-recap-updater.agent.md` | recap-sessione-[NN-1].md | dm-notes-NN aggiornato con delta realtà vs piano |
| 1 | `01-session-extractor.agent.md` | marker avanzamento | chunk grezzo da fonti/campagna/ + boxed text marcati |
| 2 | `02-session-translator.agent.md` | chunk EN | draft IT con testi boxed espansi |
| 3 | `03-session-pc-integrator.agent.md` | draft IT | draft + hook PG, spotlight, note DM riservate |
| 4 | `04-session-missions-integrator.agent.md` | draft + PG | draft + hook missioni fazioni (legge fazioni.md per i path) |
| 5 | `02-session-translator.agent.md` (re-invoke) | draft completo | stile uniforme IT su tutto il documento |
| 6 | `06-session-reviewer.agent.md` | draft finale | dm-notes-NN.md pronto per commit + revision log |
| 6b *(condiz.)* | `05-chapter-png-briefer.agent.md` | dm-notes-NN.md + contesto.md | `campagna/png-per-capitolo/capitolo-NN/*.md` + contesto.md aggiornato |
| 7 | `git-procedures.agent.md` | file finale | commit + release GitHub |

**Entry point alternativo:** `/aggiorna-sessione` → Step 0 (recap updater) → 3 → 4 → 6 → 7

---

## Mappa Cartelle

```
campagna/
  contesto.md              ← party, villain, PNG chiave, fazioni, tabella missioni per livello; campo «Capitolo corrente»
  png-per-capitolo/
    capitolo-NN/
      NomePG.md              ← briefing PNG per capitolo (visibile ai giocatori via Foundry pg-backgrounds pack)
  party.md                 ← stato PG: livello, XP, condizioni, note sessione
  fazioni.md               ← posizione fazioni + folder_path e fonti_path per ogni fazione
  missioni-secondarie.md   ← stato tutte le missioni (Pianificata / In corso / Completata)
  png-incontrati.md        ← relationship map per PG (atteggiamenti numerici)
  rapporti.md              ← note qualitative su rapporti PG-PNG
  sessioni/
    dm-notes-sessione-NN.md  ← note sessione (narrative + meccaniche)
    recaps/
      recap-sessione-NN.md   ← recap post-sessione compilato dal DM

missioni/{fazione}/          ← sottocartelle per fazione; i nomi vengono da campagna/fazioni.md
  M#-NomeMissione.md         ← struttura meccanica: obiettivi, CD, PNG, ricompense

personaggi/
  NomePG.md                  ← background strutturato di ogni PG

fonti/
  campagna/
    [libro o modulo principale].md/txt  ← fonte narrativa principale (es. Dragon Heist.md)
  missioni/
    [Fazione]_MissioneN_*.txt  ← narrativa estesa per ogni missione (dialoghi, scene)
  personaggi/
    BG *.txt                   ← background grezzi dei PG
  lore/
    *.txt / *.odt              ← guide ambientazione, lore, gazetteer

src/                     ← Foundry VTT source JSON (generato da build-foundry.mjs)
packs/                   ← Foundry VTT LevelDB compilati
module.json              ← manifest Foundry VTT
```

### Come gli agenti trovano le cartelle missioni

Le cartelle `missioni/{fazione}/` e le fonti `fonti/missioni/` hanno nomi diversi per ogni campagna.
**Gli agenti NON hardcodano i nomi delle fazioni.** Prima di accedere ai file missione:
1. Leggono `campagna/fazioni.md`
2. Per ogni fazione trovano i campi `folder_path` (es. `missioni/arpisti/`) e `fonti_path` (es. `fonti/missioni/Arpisti_*.txt`)
3. Usano quei path per aprire i file corretti

---

## Setup Nuova Campagna

Per iniziare a lavorare su una nuova campagna:
1. Sostituisci il contenuto di `campagna/`, `missioni/`, `personaggi/`, `fonti/`, `src/`, `packs/`, `module.json`
2. Metti le fonti grezze (libro campagna, BG personaggi, testi missioni) nelle sottocartelle di `fonti/`
3. Invoca `/setup-campagna` → Agente `00-campaign-setup.agent.md` legge le fonti e genera tutti i file strutturati
