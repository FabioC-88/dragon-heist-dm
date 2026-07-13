# Registro Campagne

> **Fonte di verità per gli agenti** sui path e il modello di preparazione di ogni campagna.
> Gli agenti e le skill **risolvono i path da qui** invece di cablarli. Prima di aprire un file
> di campagna, un agente legge questo registro, determina la **campagna attiva** e usa i campi
> della scheda corrispondente.
>
> Questo file è **condiviso** (non appartiene a una singola campagna) e non viene pubblicato su Foundry.

---

## Campagna attiva di default

```
attiva_default: sottomonte
```

**Come le skill determinano la campagna attiva:**
1. Se l'invocazione contiene un token campagna esplicito (es. `/prep-sessione sottomonte 3`, `/aggiorna-sessione dragon-heist 12`) → usa quello.
2. Altrimenti usa `attiva_default` qui sopra.
3. In caso di ambiguità o dubbio → **chiedi al DM** quale campagna prima di procedere.

> ⚠️ Le due campagne hanno **numerazioni indipendenti** (sessioni per Dragon Heist, livelli di
> dungeon per Sottomonte). Risolvi **sempre** la campagna **prima** di calcolare qualunque
> "prossimo" numero.

---

## File condivisi (validi per tutte le campagne)

Questi file **non** vanno duplicati né forkati: proseguono da una campagna all'altra perché il
party e le sue relazioni continuano.

```
ai/knowledge/party.md            ← stato PG: livello, condizioni, ganci, note
ai/knowledge/png-incontrati.md   ← relationship map PG↔PNG (attitudini numeriche)
ai/knowledge/rapporti.md         ← note qualitative sui rapporti
```

---

## Campagne

### dragon-heist — Waterdeep: Dragon Heist

| Campo | Valore |
|-------|--------|
| `titolo` | Waterdeep: Dragon Heist |
| `stato` | In corso (tavolo alla S12; arco Cassalanter verso la chiusura) |
| `modello_prep` | `sessioni-lineari` |
| `libro_fonte` | `fonti/campagna/Dragon Heist.md` |
| `sessioni_path` | `campagna/sessioni/` |
| `capitoli_path` | `n/d` |
| `read_aloud_path` | `n/d` |
| `recaps_path` | `ai/knowledge/recaps/` |
| `luoghi_path` | `campagna/luoghi-visitati/` |
| `personaggi_path` | `campagna/personaggi/` *(condiviso col party)* |
| `contesto_path` | `ai/knowledge/contesto.md` |
| `stato_missioni_path` | `ai/knowledge/stato-missioni.md` |
| `fazioni_path` | `ai/knowledge/fazioni.md` |
| `progressione` | `capitoli` (campo "Capitolo corrente" in `contesto.md`) |
| `pack_sessioni` | `sessioni` |
| `pack_luoghi` | `luoghi-visitati` |

### sottomonte — Waterdeep: Dungeon of the Mad Mage

| Campo | Valore |
|-------|--------|
| `titolo` | Waterdeep: Dungeon of the Mad Mage |
| `stato` | In preparazione (parte dopo la chiusura di Dragon Heist) |
| `modello_prep` | `capitoli-dungeon` |
| `libro_fonte` | `fonti/campagna/Waterdeep_ Dungeon of the Mad Mage.md` |
| `sessioni_path` | `campagna-sottomonte/sessioni/` *(solo la sessione-00 ponte, lineare)* |
| `capitoli_path` | `campagna-sottomonte/capitoli/` *(1 file per livello di dungeon)* |
| `read_aloud_path` | `campagna-sottomonte/read-aloud/` *(read-aloud brevi pre-generati per livello)* |
| `recaps_path` | `campagna-sottomonte/recaps/` *(recap story-focused per livello giocato)* |
| `luoghi_path` | `campagna-sottomonte/luoghi-visitati/` *(solo luoghi rilevanti per la storia)* |
| `personaggi_path` | `campagna/personaggi/` *(condiviso — stesso party)* |
| `contesto_path` | `campagna-sottomonte/contesto-sottomonte.md` |
| `stato_missioni_path` | `campagna-sottomonte/stato-missioni-sottomonte.md` |
| `fazioni_path` | `n/d` *(nessuna struttura fazione M1-M4; le quest sono in `stato_missioni_path`)* |
| `progressione` | `livelli` (campo "Livello dungeon corrente" in `contesto-sottomonte.md`) |
| `pack_sessioni` | `sottomonte-sessioni` |
| `pack_luoghi` | `n/d` *(da registrare quando ci sarà contenuto)* |

---

## I due modelli di preparazione

### `sessioni-lineari` (Dragon Heist)

Campagna a trama guidata. La prep è **sessione per sessione**, dimensionata a ~2h30m: l'agente
estrattore prende il **chunk narrativo successivo** dal `libro_fonte` a partire dal marker
dell'ultima sessione, e la pipeline lo trasforma in `dm-notes-sessione-NN.md`. La progressione è
per **capitolo**.

### `capitoli-dungeon` (Sottomonte)

Megadungeon **non lineare**: non si può sapere in che ordine il party visiterà le aree, né cosa
farà in 2h30m. Perciò:

- **L'unità di prep è un file per livello di dungeon** (`{capitoli_path}livello-NN-<slug>.md`),
  creato quando il party raggiunge quel livello. Documenta **l'intero livello nella sua rilevanza
  per la campagna** (PNG chiave, snodi story-defining, ganci personali e quest DotMM che atterrano
  lì) — **non** un walkthrough stanza-per-stanza, **non** dimensionato sul tempo. Gli scontri non
  influenti li gestisce il DM col manuale originale.
- **Per le stanze non importanti** serve solo un **breve read-aloud** da leggere all'ingresso,
  **pre-generato per livello** in `{read_aloud_path}livello-NN-<slug>.md` (agente 09), coerente col
  capitolo e col boxed text originale.
- **I recap sono centrati sulla trama** (quali ganci sono avanzati, PNG chiave, se il livello è
  risolto), **non** sulle singole stanze. Nessun trasferimento di "scene non giocate" (non lineare).
- La progressione è per **livello di dungeon** ("Livello dungeon corrente").

---

## Aggiungere una nuova campagna

1. Crea la cartella `campagna-<slug>/` con le sottocartelle previste dal suo `modello_prep`.
2. Aggiungi una scheda qui sopra con tutti i campi.
3. Crea i suoi `contesto_path` e `stato_missioni_path`.
4. (Se serve pubblicarla su Foundry) registra i pack in `build-foundry.mjs` e `module.json`.

**Non cancellare** le campagne esistenti: convivono in parallelo.
