---
name: aggiorna-sessione
description: >
  Entry point post-sessione. Aggiorna dm-notes-sessione-NN.md in base a cosa è realmente accaduto
  al tavolo nella sessione precedente. Usa questa skill ogni volta che il DM ha appena giocato una
  sessione e vuole aggiornare la successiva con i delta realtà vs piano: "/aggiorna-sessione",
  "abbiamo giocato la sessione, aggiorna la prossima", "recap della sessione X". Richiede che esista
  campagna/sessioni/recaps/recap-sessione-[NN-1].md prima di procedere. Esegue agenti 0→3→4→6.
---

# Aggiornamento Post-Sessione — /aggiorna-sessione

Sei l'orchestratore del flusso di aggiornamento post-sessione. Hai appena giocato una sessione e
devi aggiornare il file della sessione successiva basandoti su cosa è davvero accaduto al tavolo.
La realtà giocata ha sempre la precedenza sul piano teorico.

---

## Step 0 — Verifica prerequisiti

1. Determina il numero della sessione TARGET (NN). Se non specificato, chiedi al DM.
2. Verifica che esista `campagna/sessioni/recaps/recap-sessione-[NN-1].md`.

**Se il file recap NON esiste**, fermati e mostra questo template al DM:

```markdown
# Recap Sessione [NN-1] — [Data]

## Cosa è Successo
[Riassunto libero di ciò che è accaduto]

## Deviazioni dal Piano
- Es: "Il party ha evitato lo scontro corrompendo i goblin"
- Es: "Floon è stato liberato senza combattere Grum'shar (fuga)"

## PNG Incontrati / Atteggiamenti Finali
| PNG | Attitudine finale | Note |
|-----|------------------|------|
| [Nome PNG] | +X / Neutrale / -X | [nota] |

## Missioni
| Missione | Stato dopo sessione |
|----------|-------------------|
| [nome] | Avviata / Completata / Saltata / Modificata |

## XP e Livello
- XP guadagnati questa sessione: [numero]
- XP totali party: [numero]
- Level up avvenuto: Sì / No → Lv [N]

## Oggetti e Ricompense
- [lista oggetti ottenuti, oro, favori]

## Thread Aperti
- [cosa il party ha lasciato irrisolto]

## Note DM
[Appunti personali: cosa ha funzionato, cosa no, idee per dopo]
```

Chiedi al DM di salvarlo in `campagna/sessioni/recaps/recap-sessione-[NN-1].md` e poi riprendere.

---

## Pipeline (esegui nell'ordine)

Tra uno step e il successivo, mostra: `✅ Step N completato → avvio Step N+1...`

### Step 1 — Aggiornamento delta (Agente 0)
Leggi ed esegui le istruzioni di `ai/agents/00-recap-updater.agent.md`.

File da leggere:
- `campagna/sessioni/recaps/recap-sessione-[NN-1].md` ← input principale
- `campagna/sessioni/dm-notes-sessione-[NN-1].md` ← piano originale
- `campagna/sessioni/dm-notes-sessione-NN.md` ← file da aggiornare
- `campagna/party.md`, `campagna/png-incontrati.md`, `campagna/missioni-secondarie.md`

Costruisci la tabella delta (Piano vs Realtà). Applica aggiornamenti al file target:
- Sposta integralmente le scene non giocate (verbatim, non riassunti)
- Aggiorna atteggiamenti PNG dai valori finali del recap
- Correggi stato missioni e XP/livello
- Aggiungi sezione `📋 NOTE AGGIORNAMENTO — Agente 0` con delta applicati e TODO DM

**Non leggere né considerare file di sessione con numero > NN.**

### Step 2 — Riverifica hook PG (Agente 3)
Leggi ed esegui le istruzioni di `ai/agents/03-session-pc-integrator.agent.md`.

Verifica che gli hook personali siano ancora coerenti con la nuova realtà dopo i delta dello Step 1.
Correggi quelli che sono stati invalidati dai cambiamenti.

### Step 3 — Aggiorna hook missioni (Agente 4)
Leggi ed esegui le istruzioni di `ai/agents/04-session-missions-integrator.agent.md`.

Esegui solo se nel recap risultano missioni cambiate di stato (avviate, completate, saltate).
Se nessuna missione è cambiata, questo step può essere veloce: verifica e conferma che gli hook
esistenti siano ancora validi.

### Step 4 — Revisione finale (Agente 6)
Leggi ed esegui le istruzioni di `ai/agents/06-session-reviewer.agent.md`.

Revisione finale di coerenza e struttura sul file aggiornato. Genera Revision Log.
Output: `dm-notes-sessione-NN.md` finalizzato.

---

## Riepilogo finale

```
✅ Aggiornamento completato — Sessione NN

Delta applicati: [N] modifiche da recap-sessione-[NN-1].md
File aggiornato: campagna/sessioni/dm-notes-sessione-NN.md

TODO DM aperti (richiedono una tua decisione):
[lista dei TODO DM emersi dall'Agente 0]

Prossimo step: /prep-sessione [NN+1] quando sei pronto per la sessione successiva.
```
