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

1. **Titolo campagna:** come si chiama?
2. **Villain/antagonista principale:** chi è, qual è il suo obiettivo, cosa non sa il party?
3. **Party:** quanti giocatori fissi? Ospiti occasionali? Per ogni giocatore: nome giocatore, nome PG, razza/classe, fazione di appartenenza.
4. **Fazioni:** quali fazioni secondarie sono presenti? Per ognuna: nome, referente PNG, stile operativo, quante missioni ha.
5. **Durata media sessioni:** quanto durano di solito?
6. **Livello di partenza:** da che livello parte il party?
7. **Fonte principale:** qual è il file principale in `fonti/campagna/`?

---

## Step 3 — Genera i file strutturati

Dopo le risposte del DM, esegui le istruzioni complete di `ai/agents/00-campaign-setup.agent.md`
per generare nell'ordine:

1. `ai/knowledge/contesto.md` (villain, party, fazioni, PNG chiave, tabella missioni per livello)
2. `ai/knowledge/party.md` (stato PG: livello, XP, HP, gancio attivo)
3. `ai/knowledge/fazioni.md` ← **includi sempre `folder_path` e `fonti_path` per ogni fazione**
4. `ai/knowledge/stato-missioni.md` (tabella stato missioni)
5. `ai/knowledge/png-incontrati.md` (template vuoto con header)
6. `ai/knowledge/rapporti.md` (file vuoto con header)
7. `missioni/{fazione}/M#-NomeMissione.md` per ogni missione in `fonti/missioni/`
8. `personaggi/NomePG.md` per ogni PG in `fonti/personaggi/`

Per `ai/knowledge/fazioni.md`, il `folder_path` usa il nome fazione in minuscolo senza spazi
(es. "Force Grey" → `forcegrey`, "Arpisti" → `arpisti`).

---

## Riepilogo finale

Stampa al termine:

```
✅ File generati:
- ai/knowledge/contesto.md
- ai/knowledge/party.md
- ai/knowledge/fazioni.md      (con folder_path e fonti_path per N fazioni)
- ai/knowledge/stato-missioni.md
- ai/knowledge/png-incontrati.md
- ai/knowledge/rapporti.md
- missioni/{fazione}/M#-*.md   (N file totali)
- personaggi/NomePG.md         (N file totali)

⚠️ TODO da completare manualmente:
[lista campi [TODO] aperti]

Prossimo passo: /prep-sessione per preparare la prima sessione.
```
