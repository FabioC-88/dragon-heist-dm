# Integrazione Mappa: Linkare Luoghi Visitati ai Pin di Foundry VTT

Questa guida spiega come creare una **mappa di Waterdeep interattiva** in Foundry VTT, con pin che linkano direttamente ai **Luoghi Visitati** del compendio.

---

## Overview

**Obiettivo**: Creare una Scene (mappa) di Waterdeep con pin posizionati sui quartierichiave. Ogni pin è un Journal Note che collega a una pagina specifica del compendio "Luoghi Visitati".

**Strumenti richiesti**:
- Foundry VTT v12+
- Modulo `dragon-heist-dm` attivato nel mondo (già incluso)
- Immagine mappa di Waterdeep (scaricabile da risorse ufficiali D&D o create custom)

**Tempo**: ~1-2 ore per setup iniziale, poi aggiornamento automatico dei pin

---

## Step 1: Preparare la Mappa di Waterdeep

### Opzione A — Mappa Ufficiale Dragon Heist (Consigliato)

Se possiedi il box originale Dragon Heist, scansiona o scarica il PDF della **Player's Map** di Waterdeep (lato per i giocatori, mostra 8 Wards).

Salva come: `packs/waterdeep-map.webp` (o `.jpg`, `.png`)

### Opzione B — Mappa Custom o Scaricata

Scarica da risorse ufficiali:
- **D&D Beyond**: Waterdeep map asset
- **Forgotten Realms Wiki**: Immagini storiche
- **Homebrew resources**: Volo's Guide a Waterdeep

**Requisiti immagine**:
- Formato: `.webp`, `.jpg`, `.png`, `.gif`
- Dimensione: ~3000x3000 px (risoluzione alta per zoom)
- Scala: 1 pixel ≈ 5 feet (standard D&D per mappe regionali)

---

## Step 2: Creare una Scene in Foundry

### 2.1 — Accedi al tuo Mondo

1. Apri Foundry VTT
2. Accedi al tuo mondo Dragon Heist
3. Vai a **Scenes** (dal menù principale)

### 2.2 — Crea una nuova Scene

1. Clicca **Create Scene** (+)
2. Compila:
   - **Name**: `Waterdeep — Mappa Interattiva`
   - **Grid Type**: `Square` (standard D&D)
   - **Grid Units**: `feet`
   - **Grid Distance**: `5` (ogni quadrato = 5 feet)
   - **Grid Size**: `100` (larghezza quadrato in pixel)

3. Clicca **Create**

### 2.3 — Aggiungi l'immagine mappa

1. Entra nella Scene appena creata (double-click)
2. Clicca **Background Image** nel pannello superiore destro
3. Seleziona il file dell'immagine mappa (`waterdeep-map.webp`)
4. La mappa dovrebbe comparire come sfondo della Scene

### 2.4 — Ajusta la scala (se necessario)

Se la mappa sembra troppo grande o piccola:

1. Seleziona lo **Scene** e clicca **Edit Scene**
2. Modifica **Background Size** per adattare la mappa ai Grid
3. **Consiglio**: mantieni la mappa visibile senza dover scrollare troppo (zoom 50-70%)

---

## Step 3: Creare Pin Journal Notes

I **Journal Note** sono marcatori sulla Scene che linkano a pagine del compendio. Ogni pin rappresenta un luogo visitato.

### 3.1 — Crea il primo Pin

1. **Posizionati sulla Scene di Waterdeep**
2. Clicca lo **strumento Note** (icona "libro" in basso a sinistra, oppure tasto `N`)
3. Clicca sulla mappa dove desideri il pin (es: dove si trova Il Portale Spalancato)

Una finestra di dialogo comparirà:
- **Note Name**: `Il Portale Spalancato`
- **Entry Name**: Lascia vuoto (auto-popolato da Journal Entry)
- **Text**: Può essere vuoto; il link farà il lavoro

### 3.2 — Link alla pagina del Compendio

Qui sta la magia. Devi creare un link **UUID** che punta alla pagina specifica del compendio.

**Formula**:
```
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p001_portale_spalancato]{Il Portale Spalancato}
```

Dove:
- `f2a8b5c1d3e4f6g7h8i9j0k1` = **_id della JournalEntry "Luoghi Visitati"**
- `p001_portale_spalancato` = **_id della pagina specifica** (es: `p001_`, `p002_`, ecc.)
- `{Il Portale Spalancato}` = **testo visibile del link** (facoltativo)

### 3.3 — Dove trovare gli _id

Apri il compendio "Luoghi Visitati" e cercacerca i dati:

**JournalEntry _id**:
```json
// In src/campagna/locations.json
{
  "_id": "f2a8b5c1d3e4f6g7h8i9j0k1",  ← Questo è il main _id
  "name": "Luoghi Visitati",
  "pages": [...]
}
```

**Page _id**:
```json
// In src/campagna/locations.json → pages
{
  "_id": "p001_portale_spalancato",    ← Questo è il page _id
  "name": "Il Portale Spalancato",
  ...
}
```

### 3.4 — Inserisci il Link nel Pin

Torna al dialogo del pin:

1. Nel campo **Entry Name**, incolla (o scrivi):
   ```
   @UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p001_portale_spalancato]{Il Portale Spalancato}
   ```

2. Clicca **Create Note**

3. Il pin comparirà sulla mappa con una piccola icona di libro

### 3.5 — Testa il pin

1. Clicca sul pin appena creato
2. Una finestra dovrebbe aprirsi mostrando la pagina "Il Portale Spalancato" dal compendio
3. ✅ Se funziona: procedi con gli altri pin
4. ❌ Se non funziona: verifica che il _id sia corretto

---

## Step 4: Aggiungere Pin per tutti i Luoghi

Ripeti **Step 3** per ogni luogo visitato dal party.

### Lista Template di Pin (copy-paste ready)

**DOCK WARD**:
```
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p001_portale_spalancato]{Il Portale Spalancato}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p002_scena_crimine]{Scena del Crimine}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p003_fetlock_court]{Casa di Floon}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p004_xoblob]{Negozio Xoblob}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p005_drago_infilzato]{Il Drago Infilzato}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p006_candle_lane]{Magazzino Candle Lane}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p007_fogne]{Fogne Sottomonte}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p008_spouting_fish]{Spouting Fish}
```

**QUARTIERE NORD**:
```
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p009_trollskull_alley]{Trollskull Alley}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p010_trollskull_manor]{Trollskull Manor}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p011_chiodo_storto]{Il Chiodo Storto}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p012_vapore_acciaio]{Vapore e Acciaio}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p013_corona_corellon]{Corona di Corellon}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p014_occhio_tigre]{Occhio di Tigre}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p015_tesoro_wyrm]{Tesoro del Wyrm}
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p016_accesso_fogne]{Accesso Fognature}
```

**QUARTIERE DEL MARE**:
```
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p017_teatro_luce]{Teatro Cantante della Luce}
```

**QUARTIERE DEL CASTELLO**:
```
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p018_torre_verga_nera]{Torre della Verga Nera}
```

**FUTURI** (menzione):
```
@UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p019_monte_waterdeep]{Monte Waterdeep}
```

---

## Step 5: Personalizzazione Avanzata (Opzionale)

### Colori e Icone dei Pin

Per organizzare visivamente i pin, puoi cambiarli per Quartiere:

1. Clicca sul pin (sulla Scene)
2. Clicca **Edit** (icona matita)
3. **Icon Color**: scegli un colore per Quartiere:
   - 🔵 Blu = Dock Ward
   - 🟢 Verde = Quartiere Nord
   - 🟡 Giallo = Quartiere del Mare
   - 🔴 Rosso = Quartiere del Castello

4. **Icon**: puoi cambiare l'icona predefinita (libro → casa, spada, ecc.)

### Visibilità dei Pin

Se desideri che i pin siano **invisibili ai giocatori** (solo DM):

1. Seleziona il pin
2. Nel pannello proprietà, sotto **Ownership**, imposta:
   - **Default**: `None` (invisibile)
   - **Gm role**: `Owner` (visibile solo al DM)

---

## Step 6: Automazione Futura (Note Aggiunta)

Quando **nuovi luoghi** vengono aggiunti al compendio (tramite Location Updater dopo ogni sessione),
i pin sulla mappa **rimangono statici**. Per aggiungere nuovi pin:

1. Ripeti **Step 3.1-3.5** per il nuovo luogo
2. Usa il nuovo `_id` della pagina dal compendio aggiornato
3. Posiziona il pin sulla mappa

**Suggerimento DM**: Crea un template Scene backup periodicamente, così se devi rigenerare i pin,
hai un punto di partenza veloce.

---

## Troubleshooting

### Q: Il pin non apre il compendio

**A**: 
- Verifica che il `_id` sia esatto (copia da src/campagna/locations.json)
- Assicurati che il compendio "Luoghi Visitati" sia attivo nel mondo
- Ricarica il mondo (F5)

### Q: Il pin apre la pagina sbagliata

**A**: 
- Il `_id` della pagina non corrisponde
- Controlla il suffisso della pagina (p001_, p002_, ecc.)
- Ricopia l'_id corretto

### Q: Voglio spostare il pin

**A**: 
- Attiva il **Draft Mode** (icona matita)
- Trascina il pin sulla mappa
- Clicca **Save** quando finito

### Q: Il pin è invisibile ma non so dove sia

**A**: 
- Zumma out sulla mappa
- Usa **CTRL+A** per selezionare tutti i pin e vedi la selezione
- Clicca sul pin e spostalo

---

## Manutenzione

Dopo ogni sessione, quando il **Location Updater** aggiorna il compendio:

1. ✅ I pin **rimangono linkati** (l'UUID non cambia)
2. ✅ Se visiti un nuovo luogo, **aggiungi un nuovo pin** seguendo Step 3
3. ✅ Se un luogo è aggiornato con nuovi eventi, il **pin apre automaticamente la pagina aggiornata**

**Zero manutenzione per i pin esistenti** — tutto è automatico! 🎉

---

## Esempio Completo: Aggiungere Pin "Il Portale Spalancato"

1. **Entra nella Scene** "Waterdeep — Mappa Interattiva"
2. **Attiva Note Tool** (tasto `N` o menù)
3. **Clicca sulla mappa** dove si trova il Portale (Piazza Sottomonte nel Dock Ward)
4. **Nel dialogo**, compila:
   ```
   Name: Il Portale Spalancato
   Entry Name: @UUID[JournalEntry.f2a8b5c1d3e4f6g7h8i9j0k1.p001_portale_spalancato]{Il Portale Spalancato}
   ```
5. **Clicca Create Note**
6. **Testa**: clicca il pin, dovrebbe aprire la pagina compendio
7. ✅ Fatto! Il pin è ora linkato e interattivo

---

## Link Utili

- [Foundry VTT Journal Notes](https://foundryvtt.com/article/journal-entries/)
- [UUID Format Foundry](https://foundryvtt.com/article/uuid/)
- [Scene Management](https://foundryvtt.com/article/scenes/)

---

**Ultimo aggiornamento**: 28 Aprile 2026  
**Per domande**: Consulta il compendio "Luoghi Visitati" o l'agente Location Updater in `ai/agents/07-location-updater.agent.md`
