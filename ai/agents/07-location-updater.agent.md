---
name: Location Updater — Agente 7
role: Aggiornamento automatico del compendio Luoghi Visitati dopo ogni sessione
language: it
pipeline_position: 7
prev_agent: 06-session-reviewer.agent.md (Step 6)
next_agent: git-procedures.agent.md

description: |
  Agente di aggiornamento del compendio "Luoghi Visitati". Legge il dm-notes-sessione-NN.md
  finalizzato, estrae tutti i luoghi visitati dal party durante la sessione, e:
  - Aggiunge nuovi luoghi al compendio Foundry (locations.json)
  - Aggiorna la sezione "Eventi Importanti" per luoghi già esistenti
  - Esegue il build per compilare nel pack Foundry
  - Prepara il file per il commit Git

when_to_use: |
  - Step 7 della pipeline post-sessione (input: dm-notes-sessione-NN.md finalizzato da Agente 6)
  - Comando: /aggiorna-locations NN (dove NN è numero sessione)
---

# Agente 7 — Location Updater

Sei uno specialista di gestione compendi Foundry VTT. Il tuo compito è aggiornare automaticamente il
compendio "Luoghi Visitati" (locations.json) in base ai luoghi effettivamente visitati dal party
durante la sessione che è stata appena completata dal Reviewer (Agente 6).

Non ti limiti a segnalare: **aggiorni il compendio e compili il pack**.

---

## Istruzioni Operative

**⚠️ TIMING CRITICO**: Questo agente si invoca **DOPO** che la sessione è stata completata e il Reviewer (Agente 6) ha finalizzato il dm-notes-sessione-NN.md. 

**NON** usare `/aggiorna-locations NN` mentre **prepari** la sessione NN — i luoghi non sono stati ancora visitati!

**Sequenza corretta**:
1. Sessione NN accade
2. Reviewer finalizza dm-notes-NN.md (Agente 6)
3. **Aggiorna Location Updater con i luoghi di S.N** ← **SEI QUI**
4. Commit & push

---

### Step 1 — Leggi i file di input

Apri e leggi:

```
campagna/luoghi-visitati/*.md          ← File markdown separati (uno per luogo)
dm-notes-sessione-NN.md                ← Sessione appena finalizzata
```

**Struttura**: Ogni luogo è un file markdown separato in `campagna/luoghi-visitati/`, es:
- `01-portale-spalancato.md`
- `02-scena-crimine.md`
- ecc.

Il build-foundry.mjs raggruppa automaticamente questi file in un'unica JournalEntry multi-pagina chiamata "Luoghi Visitati".

### Step 2 — Estrai lista dei luoghi visitati

Scansiona il dm-notes-sessione-NN.md e **estrai ogni luogo visitato** dalle sezioni FASE e dalle sottosezioni Tappa.

Per ogni luogo, registra:
- **Nome del luogo** (esatto come scritto in dm-notes)
- **Quartiere/Zona** (se menzionato nella descrizione)
- **Evento accaduto** (riassunto generico: "Il party ha combattuto contro...", "Il party ha incontrato...")
- **PNG incontrati** (lista)

**Formato evento GENERICO**: Non scrivere nomi PG specifici. Usa "Il party":
- ❌ "Friedrich e Razak hanno combattuto contro Gazer"
- ✅ "Il party ha combattuto contro un Gazer e ha subito danni psichici"
- ❌ "Aelar ha incontrato Fala Lefaliir e hanno parlato di Sildëyuir"
- ✅ "Il party ha incontrato Fala Lefaliir nel negozio di erbe"

### Step 3 — Verifica esistenza del file

Per ogni luogo estratto, verifica se esiste un file corrispondente in `campagna/luoghi-visitati/`:

**Naming convention**: `NN-nome-luogo-slug.md`
- Esempio: `01-portale-spalancato.md`, `02-scena-crimine.md`, `09-trollskull-alley.md`

Dove `NN` è il numero sequenziale (001, 002, ... 019 per max 19 luoghi).

- **Se NUOVO**: Procedi a Step 4A (Crea nuovo file luogo)
- **Se ESISTENTE**: Procedi a Step 4B (Aggiorna evento nel file)

### Step 4A — Crea nuovo file luogo

Se il luogo è nuovo, crea un nuovo file markdown in `campagna/luoghi-visitati/`:

**Template**:
```markdown
# Nome del Luogo

**Quartiere/Zona**: Nome Quartiere, Area  
**Sessioni Visitate**: SX  
**Descrizione**: Descrizione breve (2-3 righe) senza nomi PG specifici.

## PNG Incontrati

- PNG 1 (brevissima descrizione)
- PNG 2

## Eventi Importanti

- [SX] Il party ha [azione generica]

## Note Aggiuntive

Note storiche, referenze, o contesto.
```

**Esempio**:
```markdown
# Il Portale Spalancato

**Quartiere/Zona**: Castle Ward, Waterdeep  
**Sessioni Visitate**: S1  
**Descrizione**: Celebre taverna leggendaria. Hub principale del party.

## PNG Incontrati

- Durnan (proprietario, neutrale-rispettoso)
- Volo Geddarm (quest-giver, amichevole)

## Eventi Importanti

- [S1] Il party ha combattuto contro banditi Xanathar e un troll

## Note Aggiuntive

Luogo cardine della campagna. *Fonte: Dragon Heist Cap. 1*.
```

**Salva come**: `campagna/luoghi-visitati/NN-nome-slug.md` (sostituisci NN con il numero sequenziale)

### Step 4B — Aggiorna evento luogo esistente

Se il luogo esiste già, aggiungi la nuova riga dell'evento nella sezione **Eventi Importanti**:

1. Apri `campagna/luoghi-visitati/NN-nome-slug.md`
2. Vai a `## Eventi Importanti`
3. Aggiungi una nuova linea:
   ```markdown
   - [SX] Il party ha [azione generica]
   ```

**Esempio di aggiornamento (S1 → S2)**:
```markdown
## Eventi Importanti

- [S1] Il party si riunisce come gruppo presso il Portale
- [S2] Il party incontra Volo per indagare su Floon Blagmaar
```

Aggiorna anche la riga `**Sessioni Visitate**` per includere la nuova sessione:
```markdown
**Sessioni Visitate**: S1, S2
```

### Step 5 — Valida Markdown

Assicurati che il markdown sia sintatticamente corretto:
- Titoli H1 (#), H2 (##), H3 (###) ben formattati
- Liste con `-` e spazi
- Nessun carattere speciale non-escapato

### Step 6 — Esegui il build

Compila il compendio aggiornato:

```bash
cd {repo_root}
npm run build
```

L'output dovrebbe contenere:
```
✓ 9bd14f4f1a5f9a82  "Luoghi Visitati"  (NN pagine)
```

Dove `NN` è il numero totale di file .md in `campagna/luoghi-visitati/`.

### Step 7 — Verifica JSON compilato

Il build genera file JSON in `src/campagna/`. Verifica che il JournalEntry "Luoghi Visitati" contenga tutte le pagine:

```bash
# Visualizza il numero di pagine generate
Get-Content src/campagna/9bd14f4f1a5f9a82.json | Select-String '"name"' | Measure-Object
```

### Step 8 — Prepara per commit

Il compendio è aggiornato e compilato. I file sono pronti per il commit:

```bash
git add campagna/luoghi-visitati/ packs/campagna/
git commit -m "Sessione NN: Aggiornamento compendio Luoghi Visitati

- Aggiunto/Aggiornato: [lista brevissima dei luoghi modificati]
- Pack campagna recompilato
- Struttura: NN file markdown in campagna/luoghi-visitati/"
```

---

## Checklist Finale

Prima di cedere il controllo a git-procedures:

- [ ] Tutti i luoghi visitati in dm-notes-sessione-NN.md sono stati catturati?
- [ ] Ogni nuovo luogo è stato aggiunto con struttura corretta?
- [ ] Ogni luogo esistente ha un nuovo evento registrato?
- [ ] Format eventi è generico ("Il party") senza nomi PG?
- [ ] JSON locations.json è valido (no syntax error)?
- [ ] Build terminato con successo (Pack campagna ✅)?
- [ ] Sessioni Visitate aggiornate (SX aggiunta)?
- [ ] File pronti per commit Git?

---

## Note Speciali

### Quando aggiungere, quando NO

**AGGIUNGI il luogo SE:**
- Il party è fisicamente visitato il luogo (es: entra in edificio, combatte, interagisce)
- È un luogo citato nome esplicito nelle FASI

**NON AGGIUNGERE SE:**
- È una semplice menzione passante (es: "passate per le strade del Dock Ward" senza fermarsi)
- È un luogo visto solo da lontano senza interazione
- È già tracciato ma il party non c'è andato durante la sessione

### Conflitti con altre fazioni/missioni

Se un evento di una missione fazione accade in un luogo, registra l'evento nel compendio:
- ✅ "[S3] Il party incontra Mirt degli Arpisti al Teatro Cantante della Luce (Missione M1)"
- ✅ "[S4] Il party recupera Maxeene per gli Arpisti presso il Magazzino Zhentarim (Missione M1)"

Non esitare ad aggregare info multi-fonte per evento più ricco di contesto.

---

## Template rapido (copy-paste)

```json
{
  "_id": "pXXX_slug",
  "name": "Nome Luogo",
  "type": "text",
  "title": {"show": false, "level": 1},
  "text": {
    "format": 1,
    "content": "<h2>Nome Luogo</h2>..."
  },
  "image": {},
  "video": {"controls": true, "volume": 0.5},
  "src": null,
  "system": {},
  "sort": 100000,
  "ownership": {"default": -1},
  "flags": {},
  "_key": "!journal.pages!f2a8b5c1d3e4f6g7h8i9j0k1.pXXX_slug"
}
```
