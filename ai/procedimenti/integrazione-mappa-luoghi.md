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

Apri il compendio "Luoghi Visitati" in Foundry e verifica i dati:

**JournalEntry _id** (raggruppamento locations):
```
9bd14f4f1a5f9a82
```

**Page _id** (singolo luogo):
- Il Portale Spalancato: `97f66a0732aa837d`
- Per altri luoghi, il page _id è generato dal build-foundry.mjs

**Convenzione naming**: File markdown in `campagna/luoghi-visitati/`:
- `01-portale-spalancato.md` → pagina "01 Portale Spalancato"
- `02-scena-crimine.md` → pagina "02 Scena Crimine"
- ecc.

### 3.4 — Inserisci il Link nel Pin

Torna al dialogo del pin:

1. Nel campo **Entry Name**, incolla (o scrivi):
   ```
   @UUID[JournalEntry.9bd14f4f1a5f9a82.97f66a0732aa837d]{Il Portale Spalancato}
   ```

2. Clicca **Create Note**

3. Il pin comparirà sulla mappa con una piccola icona di libro

### 3.5 — Testa il pin

1. Clicca sul pin appena creato
2. Una finestra dovrebbe aprirsi mostrando la pagina "Il Portale Spalancato" dal compendio
3. ✅ Se funziona: procedi con gli altri pin
4. ❌ Se non funziona: verifica che l'UUID sia corretto (ricarica Foundry con F5)

---

## Step 4: Aggiungere Pin per tutti i Luoghi

Ripeti **Step 3** per ogni luogo visitato dal party.

### Come trovare i page_id

Per ogni luogo, devi trovare il suo `page_id`. Accedi a:

1. Foundry VTT → apri il compendio "Luoghi Visitati"
2. Apri la pagina del luogo
3. Nella barra indirizzi del browser, vedi un ID come: `https://...#/journal/9bd14f4f1a5f9a82/97f66a0732aa837d`
4. L'ultimo valore è il `page_id` (es: `97f66a0732aa837d`)

### Template di Pin (formula generica)

```
@UUID[JournalEntry.9bd14f4f1a5f9a82.PAGE_ID_DEL_LUOGO]{Nome Luogo}
```

Dove:
- `9bd14f4f1a5f9a82` = JournalEntry "Luoghi Visitati" (sempre questo)
- `PAGE_ID_DEL_LUOGO` = Sostituisci con l'ID effettivo della pagina del luogo

### Esempi

**S1 — Luogo aggiunto (page_id conosciuto)**:
```
@UUID[JournalEntry.9bd14f4f1a5f9a82.97f66a0732aa837d]{Il Portale Spalancato}
```

**S2+ — Luogo futuro (page_id da scoprire)**:
1. Apri il compendio dopo il prossimo build
2. Apri il luogo e copia il page_id dalla barra indirizzi
3. Crea il pin con la formula template sopra

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
3. **Clicca sulla mappa** dove si trova il Portale (Dock Ward, vicino a Piazza Sottomonte)
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
