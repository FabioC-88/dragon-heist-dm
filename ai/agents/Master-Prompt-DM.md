# Master Prompt DM — Waterdeep: Dragon Heist

> **Uso:** Documento di riferimento per la **prep di sessione**. Leggilo dall'inizio o salta alla sezione che ti serve. Non è pensato per la consultazione during la sessione — Foundry VTT gestisce il runtime. Aggiorna i file di tracking dopo ogni sessione usando la **§7 Post-Sessione Checklist**.
>
> **Stile:** Risposte tattiche per meccaniche, narrative per PNG e atmosfera. Tutti i dialoghi sono in italiano.
>
> **Campagna:** Waterdeep: Dragon Heist · Villain: Cassalanters (stagione Estate) · Livello attuale: 1

---

## Indice rapido

| § | Sezione | Quando usarla |
|---|---------|---------------|
| [§1](#1-dove-trovare-cosa) | Mappa dei file | Stai cercando qualcosa |
| [§2](#2-pre-sessione-checklist) | Pre-Sessione Checklist | Ogni volta, 30 min prima |
| [§3](#3-quale-missione-fare-ora) | Quale Missione Fare Ora? | Devi scegliere la prossima sequenza |
| [§4](#4-matrice-tensioni-fazioni) | Matrice Tensioni Fazioni | Hai due archi che si toccano o si scontrano |
| [§5](#5-secret-plot-timeline) | Secret Plot Timeline | Vuoi calibrare una rivelazione |
| [§6](#6-session-design-template) | Session Design Template | Stai costruendo la struttura della sessione |
| [§7](#7-post-sessione-tracking) | Post-Sessione Tracking | Fine sessione — cosa aggiornare |
| [§8](#8-quick-reference) | Quick Reference | Al volo: CD, PNG, dialoghi, meccaniche |
| [§9](#9--workflow-release-foundry-vtt) | Workflow Release Foundry | Dopo modifiche ai file — build e pubblicazione |

---

## §1 — Dove Trovare Cosa

```
AGENTS.md                        → Overview campagna (villain, party, PNG, fazioni, missioni)
Campagna/party.md                → Stato PG — PNG collegati, relazioni, note sesssione
Campagna/fazioni.md              → Posizione fazioni verso party, archi lunghi
Campagna/missioni-secondarie.md  → Stato tutte le 12 missioni + note timing DM
Campagna/png-incontrati.md       → Relationship map per PG (atteggiamenti numerici)
Campagna/sessioni/dm-notes-##.md → Note sessione per sessione (narrative + meccaniche)

Missioni/Arpisti/M#-*.md         → Struttura tattica missioni Arpisti (obiettivi, CD, ricompense)
Missioni/ForceGrey/M#-*.md       → Struttura tattica missioni Force Grey
Missioni/Zentharim/M#-*.md       → Struttura tattica missioni Zentharim

Fonti-Originali/BG *.txt         → Background PG estesi (hook, PNG personali, segreti)
Fonti-Originali/*_Missione*.txt  → Narrativa estesa per ogni missione (dialoghi, scene)
Fonti-Originali/Dragon Heist.txt → Avventura ufficiale (EN): struttura, PNG canonici
Fonti-Originali/Volo guide *.txt → Quartieri, locande, istituzioni di Waterdeep
```

---

## §2 — Pre-Sessione Checklist

Esegui in ordine. Tempo totale: **~30 minuti**.

### Step 1 — Rinfrescare il contesto (5 min)
- [ ] Apri [`Campagna/sessioni/dm-notes-sessione-##.md`](Campagna/sessioni/) dell'**ultima sessione giocata**
	- Identifica: plot hook rimasti aperti, PNG citati, tesori non assegnati, XP pendenti
- [ ] Controlla [`Campagna/party.md`](Campagna/party.md): livello attuale, XP verso prossimo livello, condizioni aperte
- [ ] Controlla chi è presente questa sessione (Silvia presente? → Barnabus Reed attivo → aggiungi tensione porto/Urstul)

### Step 2 — Stato fazioni (5 min)
- [ ] Apri [`Campagna/fazioni.md`](Campagna/fazioni.md): verifica gli archi in corso
	- **Gabri** → a che punto è nel percorso Oathbreaker? Quale missione Zentharim è la prossima?
	- **Eric** → ha avuto contatti con Davil? Ha ricevuto segnali su Rennis?
	- **Aelar** → Mirt lo ha contattato? Ci sono info da Harper da passare?
	- **Razak/Thraximundar** → Vajra ha nuovi ordini? Il presagio di Hlam è ancora aperto?
- [ ] Verifica atteggiamenti PNG rilevanti in [`Campagna/png-incontrati.md`](Campagna/png-incontrati.md)

### Step 3 — Scegliere la missione (5 min)
- [ ] Apri [`Campagna/missioni-secondarie.md`](Campagna/missioni-secondarie.md)
- [ ] Usa la tabella in **§3** per scegliere quale missione è appropriata per livello + arco narrativo attivo
- [ ] Nota se la missione che hai scelto coinvolge tutti i PG presenti o solo alcuni → pianifica scene per gli altri

### Step 4 — Leggere la missione (10 min)
- [ ] Apri il file `.md` nella cartella [`Missioni/`](Missioni/) — struttura meccanica, obiettivi, CD
- [ ] Se hai bisogno di dialoghi o scene estese, apri il file `.txt` corrispondente in [`Fonti-Originali/`](Fonti-Originali/)
- [ ] Identifica: **tiro critico che cambia la scena**, **reazione del PNG se il party fallisce**, **ricompensa e XP**

### Step 5 — PNG della sessione (5 min)
- [ ] Per ogni PNG che comparerrà nella sessione:
	- Controlla atteggiamento attuale in `png-incontrati.md`
	- Hai un dialogo-modello? Consulta **§8 — Dialoghi PNG**
	- Il PNG sa cose che il party non sa? Segna con **[NOTA DM]** nelle tue note

### Step 6 — Costruire la struttura (5 min)
- [ ] Usa il template in **§6 — Session Design** per strutturare le fasi della sessione
- [ ] Scrivi le note della sessione futura in `Campagna/sessioni/dm-notes-sessione-##.md` (usa +1 rispetto all'ultima)

---

## §3 — Quale Missione Fare Ora?

### Tabella decisionale per livello

| Livello party | Missione consigliata | Fazione protagonista | Dipendenze |
|---------------|---------------------|----------------------|------------|
| **1** | Cap. 1 — Portale Spalancato, rescue Floon | Tutto il party | Prima sessione / già gestita |
| **2** | Arpisti M1 — Un Cavallo Donato | Aelar (+ party) | Nessuna; introduce Davil e Yagra → gioca **prima** di Zentharim M1 |
| **2** | Force Grey M1 — Il Carico del Fondatore | Razak, Thraximundar | Vajra deve aver convocato il party dopo S1 |
| **2** | Zentharim M1 — Un Brutto Momento | Gabri, Eric (+ Barnabus se presente) | Meglio dopo Arpisti M1 (Davil già visto) |
| **3** | Force Grey M2 — Non è Tutto Oro | Razak, Thraximundar | Dopo M1 Force Grey; sessione "relax" sociale |
| **3** | Arpisti M2 — Disinfestazione | Aelar (+ party) | Nessuna; location: libreria Trades Ward |
| **3** | Zentharim M2 — Tieni il Resto | Gabri, Eric | **Introdure Skeemo** — torna in Z-M4 |
| **4** | Force Grey M3 — Crimini di Pensiero | Razak, Thraximundar | Dura più sessioni (10 gg in-game); pianifica 3-5 sessioni |
| **4** | Arpisti M3 — Benvenuti in Famiglia | Aelar (+ party) | Nessuna; introduce doppelganger e Mattrim |
| **4** | Zentharim M3 — Corri, Dasher! | Gabri, Eric | Tono investigativo + umano; famiglia Snobeedle |
| **5** | Force Grey M4 — Cose Terribili | Razak, Thraximundar | Usa mappa covo Xanathar da Dragon Heist.txt |
| **5** | Zentharim M4 — Sangue del Patto | Gabri, Eric | **Breaking point Gabri → Oathbreaker**; hook su Rennis/Manshoon per Eric |
| **4-5** | Arpisti M4 — Velo Alzato | Aelar (+ party) | Dipende dall'arco Jarlaxle; party deve conoscere Zardoz Zord |

