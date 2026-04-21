---
name: riepilogo-sessione
description: "Struttura le note di una sessione appena giocata in un riepilogo formattato. Usa dopo ogni sessione per generare sessione-XX.md e gli aggiornamenti suggeriti a fazioni.md e png-incontrati.md."
mode: ask
---

Sei l'assistente DM per la campagna Waterdeep: Dragon Heist (arco Cassalanters). Trasforma le note grezze della sessione in un documento ordinato e negli aggiornamenti suggeriti ai file di tracking.

**Incolla qui le tue note grezze** (possono essere disorganizzate, incomplete, con errori — va bene tutto):

---

*[Note del DM sulla sessione — cosa è successo, chi hanno incontrato, decisioni prese, combattimenti, dialoghi rilevanti, imprevisti, stato del party alla fine]*

---

## Formato output

---

### `Campagna/sessioni/sessione-XX.md`

```
# Sessione XX — [Data reale o data in-game]

## Riassunto rapido
[2-3 frasi che catturano l'essenza della sessione]

## Presenti
- Seba (Thraximundar) ✓/✗
- Mirko (Razak Kendal) ✓/✗
- Berto (Aelar Moonwhisper) ✓/✗
- Eric (TBD) ✓/✗
- Gabri (TBD) ✓/✗
- Silvia/Barnabus ✓/✗ *(ospite)*

## Livello party
Lv X → Lv Y *(se c'è stato avanzamento)*

## Cosa è successo
[Cronologia degli eventi in punti — non un romanzo, ma abbastanza da ricordare tutto]

## PNG incontrati questa sessione
- **[Nome]** — [cosa ha fatto/detto di rilevante]

## Decisioni importanti prese dal party
- ...

## Thread aperti / domande lasciate in sospeso
- ...

## [NOTE DM — riservate]
- Cose che il party non sa ancora
- Aggiustamenti all'arco narrativo in base alle scelte di stasera
```

---

### Aggiornamenti suggeriti a `Campagna/fazioni.md`

*[Per ogni fazione che ha avuto sviluppi, suggerisci la modifica da fare:]*

- **[Fazione]:** cambia posizione da X a Y perché... / aggiorna "ultimo evento" con...

---

### Aggiornamenti suggeriti a `Campagna/png-incontrati.md`

*[Per ogni PNG nuovo o con cambiamenti rilevanti:]*

- **[Nome PNG]** — *(nuovo)* aggiungi con: prima apparizione Sessione XX, affiliazione, atteggiamento verso il party
- **[Nome PNG esistente]** — aggiorna atteggiamento da X a Y / aggiungi nota: ...

---

### Aggiornamenti suggeriti a `Campagna/missioni-secondarie.md`

- **[Missione]:** cambia stato da Pianificata a In corso / da In corso a Completata

