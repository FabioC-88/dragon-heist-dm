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

### Regole di priorità

1. **Non sovrapporre due missioni contemporaneamente** — una missione per sessione, a meno che siano brevissime
2. **Arpisti M1 prima di Zentharim M1** — introduce Davil e Yagra dal punto di vista "esterno", crea più tensione quando Gabri/Eric li ingaggiano direttamente
3. **Zentharim M2 prima di M4** — Skeemo deve essere un volto noto quando diventa l'obiettivo
4. **Force Grey M1 entro L2** — il filo Cassalanters/Midnight Tears deve emergere presto
5. **Zentharim M4 non prima di L4-5** — è il breaking point di Gabri; troppo presto svuota l'arco Oathbreaker

### Sessioni con Silvia (Barnabus Reed)
Quando Silvia è presente, aggiungi elementi del **porto e della Guardia Cittadina**:
- Un incontro casuale con Saeth Cromley o un soldato di Hyustus Staget
- Una menzione di attività Zhentarim al porto (Urstul Floxin opera qui → tensione con Gabri/Eric)
- Barnabus può raccogliere informazioni separatamente dal party nella stessa scena

---

## §4 — Matrice Tensioni Fazioni

### Overview conflitti strutturali

```
Force Grey (Razak, Thraximundar)  ←→ [conflitto di metodo]  ←→  Zentharim (Gabri, Eric)
        ↑                                                                   ↑
   [alleanza info]                                                   [tensione porto]
        ↑                                                                   ↑
  Arpisti (Aelar) ←---------- [sorveglianza su] ---------------→ Zentharim
                                                                          ↕
                                                              Barnabus Reed (Guardia)
                                                            [vuole catturare Urstul Floxin]
```

### Trigger di conflitto espliciti

| Evento | Chi è coinvolto | Momento consigliato | Come gestirlo |
|--------|----------------|---------------------|---------------|
| Party scopre che Gabri/Eric lavorano per Zentharim | Razak/Thraximundar (Force Grey) vs Gabri/Eric | Dopo Z-M1, se Force Grey chiede info su Zhentarim attività porto | Non forzare conflitto diretto: lascia che emerga come sospetto, non accusa |
| Barnabus indaga su Urstul Floxin — lo trova nei contatti di Davil | Barnabus vs Gabri/Eric | Z-M2 o Z-M3 | Barnabus non sa che Gabri/Eric frequentano Davil → scena potenzialmente tesa se Silvia è presente |
| Aelar riporta a Mirt le attività Zhentarim dopo Arpisti M1 | Aelar vs Gabri/Eric | Dopo A-M1 | Aelar deve scegliere cosa condividere con Mirt e cosa tenere tra sé |
| Zentharim M4 — assassinio Skeemo | Gabri (breaking point Oathbreaker) | L4-5 | **Momento chiave.** Vedi §5 per timing Oathbreaker |
| Force Grey scopre attività di Nihiloor (Xanathar) | Razak/Thraximundar vs Xanathar; indirettamente Eric se Rennis è già filo attivo | FG-M3/M4 | La connessione Xanathar-Zhentarim può complicare il rapporto tra i due sottogruppi |

### Ganci personali in potenziale collisione

| PG | Gancio personale | Chi nel party potrebbe ostacolarlo |
|----|-----------------|-----------------------------------|
| **Gabri** | Arco Oathbreaker — Z-M4 come punto di non ritorno | Razak/Thraximundar (Force Grey) potrebbero opporsi all'assassinio |
| **Eric** | Trovare Rennis — attraverso la rete Manshoon | Stessa rete che Thraximundar potrebbe voler sgominare |
| **Thraximundar** | Trovare Brottor — indagini Ordine Magisti | Nessun conflitto diretto, ma Brottor è connesso a minacce planari che potrebbero destabilizzare forze dell'ordine |
| **Razak** | Il presagio — Giorno dei Fondatori, Cassalanters | Diventa urgente in Cap. 4-5; nel frattempo alimenta la paranoia |
| **Aelar** | Patron Trobbio — apparizioni imprevedibili | Trobbio può complicare qualsiasi missione in qualsiasi momento |

### Come bilanciare le questline parallele

- **Regola 1:** Ogni sessione deve dare almeno **una scena personale** a un PG della fazione non protagonista
  - *Esempio:* Sessione incentrata su Z-M1 (Gabri/Eric) → aggiungi una breve scena in cui Razak riceve un messaggio di Vajra, o Aelar trova una nota cifrata da Mirt
- **Regola 2:** Se una missione coinvolge solo 2-3 PG, dai agli altri un **obiettivo parallelo** nella stessa sessione (stessa location o stesso quartiere)
- **Regola 3:** I segreti non si rivelano da soli — se vuoi che il party scopra qualcosa, pianta il seme 2-3 sessioni prima (un PNG che menziona un nome, un documento trovato a metà)

---

## §5 — Secret Plot Timeline

> Questa sezione gestisce le rivelazioni critiche. La colonna **"Cosa sa il party"** è quello che i giocatori possono sapere. Le voci **[NOTA DM]** sono riservate.

### Rivelazioni principali

---

#### ALDRIC = ASMODEO IN FORMA MORTALE
**[NOTA DM — RISERVATA]** Aldric, l'amico/mentore di Gabri incontrato al Portale Spalancato, è Asmodeo travestito da ex-avventuriero umano. Mantiene la finzione di vecchio amico saggio per tutto l'arco di campagna.

| Fase | Cosa sa il party | Cosa sa il DM |
|------|-----------------|---------------|
| **Lvl 1-2** | Aldric è un caro amico di Gabri, saggio, umano, con passato da avventuriero | Sta testando Gabri, nutrendo lentamente il suo disincanto con gli ideali assoluti |
| **Lvl 2-3** | Aldric ha una visione pragmatica del mondo, condivide storie di "quando era giovane e si sbagliava" | Ogni consiglio di Aldric spinge Gabri verso il grigio morale; registra ogni compromesso |
| **Lvl 3-4** ← *reveal window* | Gabri inizia ad avere dubbi sul suo mentore; piccoli dettagli non tornano | **Momento di rivelazione suggerito.** Gabri è già sulla soglia Oathbreaker → il reveal amplifica la tragedia. Usalo dopo la Z-M4 (assassinio Skeemo) oppure in coincidenza con un confronto diretto. |
| **Post-reveal** | Il voto di paladino di Gabri si è già incrinato; chi era Aldric davvero? | Asmodeo non è il villain principale — è semplicemente curioso di un'anima che si dibatte. Non agisce direttamente contro il party. |

**Come piantare i semi:**
- Aldric conosce dettagli sul passato di Gabri che non avrebbe potuto sapere da una conversazione casuale
- Quando Gabri compie un'azione moralmente discutibile, Aldric la "capisce" troppo facilmente
- Aldric non è mai presente quando si parla di Tyr o della fede in modo diretto
- [Opzionale] Un chierico o un rilevatore di magia vede qualcosa di anomalo nell'aura di Aldric

---

#### RENNIS AI KOLAT TOWERS (PRIGIONIERO DI MANSHOON)
**[NOTA DM — RISERVATA]** Rennis Coalsworth, mentore scomparso di Eric, ha accettato una commessa da un intermediario di Manshoon. Quando ha capito con chi aveva a che fare ha provato a tirarsi fuori. È attualmente tenuto nelle Kolat Towers.

| Fase | Cosa sa il party (Eric) | Cosa sa il DM |
|------|------------------------|---------------|
| **Lvl 1-2** | Rennis è scomparso. La sua officina era disordinata, i debiti sono rimasti | Skeemo Weirdbottle è un intermediario di Manshoon — compare in Z-M2 |
| **Lvl 2-3** | Z-M2: Skeemo è coinvolto in qualcosa che puzza di Manshoon | Eric può iniziare a collegare i puntini **(ma il DM non lo fa per lei)** |
| **Lvl 3-4** | Il nome "Kolat Towers" è menzionato in conversazioni Zhentarim | Il filo si ispessisce; Rennis è vivo ma sotto pressione |
| **Lvl 4-5 (Z-M4)** | Z-M4 coinvolge Skeemo + connessione Manshoon → Kolat Towers entra nel radar | **Opportunità narrativa:** Eric può scegliere di cercare Rennis durante/dopo l'assassinio di Skeemo |

**Come piantare i semi:**
- Z-M2: Skeemo menziona "certi committenti" in modo vago ma allarmante
- Z-M3: Un contatto parla di persone "trattenute per motivi di riservatezza" alle Kolat Towers
- Z-M4: Nei documenti di Skeemo c'è un riferimento a "il progetto Coalsworth" — non spiega nulla, ma il nome è lì

---

#### CASSALANTERS — ESCALATION VERSO IL FINALE
**[NOTA DM — RISERVATA]** I Cassalanters devono consegnare 99 anime innocenti + 999 dragoni d'oro entro il Giorno dei Fondatori (fine estate) per salvare i figli dal patto con Asmodeo. Lo Stone of Golorr porta alla Vault of Dragons.

| Fase | Segnali al party | Tensione narrativa |
|------|-----------------|-------------------|
| **Lvl 1-2** | Il nome "Cassalanter" appare su una lista di carico sospetta (FG-M1) | Nessun collegamento diretto: sembrano nobili rispettabili |
| **Lvl 2-3** | Voci di una cerimonia religiosa privata alla villa Cassalanter nel Sea Ward | Qualcuno di Ammalia viene visto comprare un componente raro nei Trades Ward |
| **Lvl 3-4** | Persone scomparse nel porto — forse vendute, forse peggio | I Cassalanters sono coinvolti ma nessuna prova diretta |
| **Lvl 4-5** | Stone of Golorr entra nel radar del party; la gara per la Vault inizia | I Cassalanters accelerano; antagonismo diretto inevitabile |

---

#### BROTTOR DEEPDELVER — MENTORE SCOMPARSO DI THRAXIMUNDAR
> Status attuale: non ancora risolto. Sviluppa questo filo in parallelo con le missioni Force Grey.

**Suggerimento:** Brottor stava indagando su un culto planare (Dendar?) quando è sparito. Piantare un documento dell'Ordine Magisti che lo cita ogni 2-3 sessioni mantiene il filo vivo senza forzare la trama.

---

## §6 — Session Design Template

### Struttura base per una sessione da ~2 ore

```
[0:00 - 0:15]  APERTURA
  → Recap della sessione precedente (voce fuori campo o DM in 2-3 frasi)
  → Situazione di partenza: dove sono i PG, cosa sta succedendo
  → Una scena di "vita normale" (taverna, mercato, incontro con PNG) — warm-up RP

[0:15 - 0:45]  ATTO I — Setup della missione / nuovo problema
  → La missione viene presentata dal referente (Vajra, Mirt, Davil)
  → Tiro di INFO: Intelligenza (Indagare) CD 12 per dettagli extra, Saggezza (Intuizione) CD 12 sul PNG
  → I PG decidono come approcciarsi — evita di forzare una sola via

[0:45 - 1:30]  ATTO II — Esplorazione + Confronto
  → 1-2 scene di esplorazione con potenziale tiro (Percezione, Furtività, Atletica)
  → Il confronto centrale: combattimento, negoziazione complessa, o investigazione
  → Momento di scelta per almeno un PG (moral crossroads, gancio personale toccato)

[1:30 - 1:50]  ATTO III — Risoluzione
  → Outcome del confronto
  → Reazione dei PNG coinvolti
  → Tesoro / XP / informazioni guadagnate
  → Plot hook per la prossima sessione (una sola frase misteriosa va bene)

[1:50 - 2:00]  CHIUSURA
  → Dove finiscono i PG?
  → Domanda aperta al party: "Cosa fa il tuo personaggio stanotte?" (breve, max 30 sec per PG)
  → Annuncia XP
```

### Template note di sessione

```markdown
# DM Notes — Sessione N (In-Game)

## SETUP INIZIALE
> [Descrizione ambientale — cosa vedono, odori, suoni, luce]

## FASE 1: [NOME SCENA]
### Descrizione (leggere ai giocatori)
> [Testo pronto]

### Trigger narrativo
[Quando/come si attiva]

### Tiri
- Caratteristica (Abilità) CD X → cosa succede se passa / fallisce

### Reazione PNG
> [Come reagisce il PNG al risultato]

## FASE 2: [COMBATTIMENTO / NEGOZIAZIONE]
### Posizioni iniziali
| Nemico/PNG | Posizione | HP | Note |
|---|---|---|---|

### Tattiche round-per-round
- Round 1-2: [comportamento]
- Round 3+: [escalation o fuga]

### Treasure & XP
- [lista]

## NOTE ATMOSFERICHE
- Suoni: 
- Odori: 
- Luce: 
- Clienti/passanti:
```

### Come dare a tutti una scena

| Situazione | Soluzione |
|-----------|-----------|
| Missione incentrata su 2-3 PG | Assegna un obiettivo parallelo agli altri nello stesso quartiere |
| Un PG è pasivo | Fai intervenire il loro gancio personale (PNG, lettera, voce) |
| Barnabus Reed (Silvia) è presente | Aggiungi un elemento porto / Urstul / Guardia Cittadina nella stessa sessione |
| Trobbio appare (Aelar) | Usalo per rompere una scena tesa o aggiungere caos controllato |

---

## §7 — Post-Sessione Tracking

Dopo ogni sessione, aggiorna questi file. Tutto il tracking è in [`Campagna/`](Campagna/).

### Checklist

```
[ ] party.md
    → Livello / XP aggiornati?
    → Condizioni aperte? (veleni, maledizioni, patti)
    → Tesoro distribuito? Oggetti magici assegnati?
    → Nuovi PNG aggiunti alla lista "PNG collegati" per i PG coinvolti?
    → Note [S##] aggiunte sotto ogni PG che ha avuto una scena rilevante?

[ ] fazioni.md
    → Posizione delle fazioni aggiornata? (Es. Zentharim: Neutrale → Amichevole dopo Z-M1)
    → Archi narrativi personali avanzati?
      → Gabri: quanto è avanzato verso Oathbreaker? (scala 1-5: 1=devoto, 5=caduto)
      → Eric: ha ricevuto segnali su Rennis? Quale Z-missione è la prossima?
    → Tensioni tra fazioni create in questa sessione?

[ ] missioni-secondarie.md
    → Cambia stato della missione giocata: Pianificata → In corso → Completata
    → Aggiungi note DM se necessario (es. "party ha saltato la trappola principale")
    → Segnala quale missione è la prossima in sequenza

[ ] png-incontrati.md
    → Nuovi PNG incontrati? Aggiungi con atteggiamento iniziale
    → Atteggiamento di PNG esistenti cambiato? Aggiornalo (es. Yagra da +1 a +2)
    → PNG "di fama" diventati "conosciuti"? Spostali nella sezione corretta

[ ] sessioni/dm-notes-sessione-##.md  (sessione PASSATA)
    → Aggiungi una sezione "## POST-SESSIONE" con:
      → cosa è andato bene narrativamente
      → cosa il party si aspetta per la prossima volta
      → plot hook rimasti aperti
      → reazioni dei giocatori a PNG/eventi (per calibrare l'intensità futura)
```

### Quando avanzare di livello

| Da → A | XP richiesti | Momento narrativo consigliato |
|--------|-------------|-------------------------------|
| L1 → L2 | 300 | Dopo Cap. 1 (rescue Floon) → inizio Cap. 2 Trollskull |
| L2 → L3 | 900 | Dopo 1-2 missioni secondarie completate + Cap. 2 consolidato |
| L3 → L4 | 2.700 | Dopo Fireball (Cap. 3) + 1 missione L3 completata |
| L4 → L5 | 6.500 | Dopo missioni L4 completate + Cap. 4 Stone of Golorr in corso |

---

## §8 — Quick Reference

### PNG di Waterdeep — Posizioni e Atteggiamenti

| PNG | Quartiere | Affiliazione | Atteg. attuale | Ruolo nav. |
|-----|-----------|-------------|----------------|-----------|
| **Durnan** | Portale Spalancato (Castle Ward) | Indipendente | Amichevole | Punto fisso, info, ospitalità |
| **Volothamp "Volo" Geddarm** | Vario | Indipendente | Amichevole | Quest-giver, cronista |
| **Renaer Neverember** | Sea Ward | Indipendente | Grato (+2) | Alleato, conosce Stone of Golorr |
| **Vajra Safahr** | Torre Bastone Nero (Castle Ward) | Force Grey / Ordine | Alleata (Force Grey) | Referente Force Grey |
| **Mirt il Cambiavalute** | Villa propria (Castle Ward) | Arpisti | Alleato (Arpisti) | Referente Arpisti |
| **Davil Starsong** | Portale Sbadigliante (Dock Ward) | Zhentarim | Neutrale → Amichevole | Referente Zentharim |
| **Yagra Stonefist** | Dock Ward | Zhentarim | Amichevole (+1) | Braccio armato Davil |
| **Hlam** | Monte Waterdeep | Indipendente | Misterioso | Oracolo; presagio di Razak |
| **Barnibus Blastwind** | Ordine Magisti | Ordine Magisti | Professionale | Collega Thraximundar |
| **Saeth Cromley** | Vario (Guardia) | Guardia Cittadina | Amichevole | Contatto Guardia per Thraximundar |
| **Hyustus Staget** | Dock Ward | Guardia Cittadina | Rivale | Antagonista di Barnabus Reed |
| **Urstul Floxin** | Porto / Zhentarim | Zhentarim | Ostile | Obiettivo personale di Barnabus |
| **Aldric** | Portale Spalancato e vario | **Asmodeo** (travestito) | Amichevole (+2, apparente) | Mentore di Gabri **[NOTA DM]** |
| **Skeemo Weirdbottle** | Trades Ward (alchimista) | Manshoon / Zentharim | Diffidente | Villain minore Z-M2; obiettivo Z-M4 |
| **Trobbio** | Dovunque (Feywild) | Patron di Aelar | Imprevedibile | Eladrin caotico; appare a discrezione DM |
| **Maestro Bec** | Con Aelar | — | Familiare | Beccaccia con papillon fucsia; giudice silenzioso |

---

### Dialoghi modello PNG chiave

#### DURNAN *(proprietario Portale Spalancato)*
> [Tono: laconico, asciutto, nessuna parola sprecata. Non alza lo sguardo se non necessario. Parla come qualcuno che ha visto assolutamente tutto e non si aspetta di essere sorpreso.]

- **Prima impressione:** *"Ordinano qualcosa o occupano solo spazio?"*
- **Su Undermountain:** *"È sotto. Ci entra chi vuole. Non ci rientra chi va sotto male preparato."*
- **Dopo che il party ha fatto qualcosa di utile:** *"Non male. Prossima volta rompete meno sedie."*
- **Se qualcuno chiede del passato:** *"Ho smesso di raccontare storie. Ordinate un'altra birra se siete qui per chiacchierare."*
- **In pericolo diretto:** *(Niente parole — impugna lo spadone e combatte. Parla solo dopo.)*

---

#### VOLOTHAMP "VOLO" GEDDARM *(cronista, quest-giver)*
> [Tono: entusiasta, teatrale, gesticolante. Interrompe se stesso. Ama le tangenti. Non riesce a finire una frase senza aggiungerne un'altra. Si aggiusta baffi e cappello almeno una volta ogni paragrafo.]

- **Entrata:** *"Voi! LO SAPEVO che sareste stati voi. Ho un senso per le persone capaci — e voi avete esattamente quel qualcosa che cercavo. Come lo chiamo? Destino? No, destino è banale. Chiamiamolo... coincidenza professionale."*
- **Per chiedere favori:** *"Si tratta di una cosa di niente, due ore al massimo — e lo so, lo so, lo avete già sentito, ma stavolta è davvero diverso. Ho persino preso appunti."*
- **Su Waterdeep:** *"Questa città! Ogni vicolo ha tre storie e nessuno le sta scrivendo. Tranne me. Ecco perché sono indispensabile."*
- **Di fronte a un pericolo:** *"Aspettate, aspettate — questo va nel libro. Qualcuno ha una matita?"*

---

#### DAVIL STARSONG *(referente Zentharim, Portale Sbadigliante)*
> [Tono: rilassato, diretto, pragmatico. Sorride spesso ma non è mai caldo nel senso affettuoso. Parla come un imprenditore che sa esattamente cosa vale il tuo tempo e cosa vale il suo. Non minaccia — constata.]

- **Prima impressione:** *"Siediti. Ho già ordinato qualcosa per te. Se non ti piace, cambia quartiere."*
- **Su una missione:** *"Il lavoro è semplice. Fai questo, ricevi quello. Nessuna domanda extra — le domande costano tempo, e il tempo qui ha un prezzo."*
- **Se il party esita:** *"Non ti sto chiedendo di amare quello che fai. Ti sto chiedendo di farlo bene."*
- **Su Manshoon (se menzionato):** *"Non conosco quel nome. E se lo conoscessi, non ne parlerei qui."* *(pausa)* *"Riparti dalla prima frase."*
- **Dopo una missione riuscita:** *"Come promesso. E quando hai bisogno di qualcosa — e ne avrai bisogno — sai dove trovarmi."*

---

#### VAJRA SAFAHR — IL BASTONE NERO *(referente Force Grey)*
> [Tono: precisa, autorevole, economica con le parole. Non è fredda — è efficiente. Parla come qualcuno che gestisce la sicurezza di una città di un milione di abitanti e non può permettersi imprecisioni. Raramente esprime emozioni; quando lo fa, è deliberato.]

- **Prima convocazione:** *"Vi ho chiamati perché avete dimostrato di saper agire. Non di obbedire — agire. C'è differenza. Spero che l'abbiate ancora chiara quando uscirete da qui."*
- **Su una minaccia:** *"Non vi sto chiedendo di essere eroi. Vi sto chiedendo di essere utili. Gli eroi improvvisano. Voi riferirete."*
- **Se il party fallisce parzialmente:** *"Avete fatto quello che potevate con quello che sapevate. La prossima volta saprete di più."* *(non è incoraggiamento — è analisi)*
- **Se il party fa una domanda su di lei:** *"Quello che devo dirvi ve lo sto dicendo. Il resto non è rilevante per l'incarico."*
- **Su Waterdeep:** *"Questa città non cade. Non mentre posso fare qualcosa per impedirlo."*

---

### Meccaniche D&D 5e — Quick Reference Lv 1-3

#### Action Economy (cosa fa ogni tipo di azione)

| Tipo | Quando | Esempi |
|------|--------|---------|
| **Azione** | Il tuo turno | Attaccare, Lanciare incantesimo (t. 1 azione), Scattare, Disimpegnarsi, Nascondersi, Aiutare, Usare oggetto |
| **Azione bonus** | Il tuo turno, se hai una feature | Attacco secondario (Two-Weapon Fighting), Kupo (Monaco - Colpo di Mano), Bardic Inspiration (assegnare), Healing Word |
| **Reazione** | In qualsiasi momento (1/giro) | Attacco d'opportunità, Shield (Mago), Uncanny Dodge (Ladro), Hellish Rebuke (Warlock) |
| **Movimento** | Il tuo turno | Fino alla velocità (tipico: 9m). Può essere spezzato intorno alle azioni. |
| **Azione gratuita** | Il tuo turno, a discrezione DM | Parlare brevemente, lasciare cadere un oggetto, aprire una porta non chiusa |

#### Tiri comuni a Lv 1-3

| Situazione | Tiro consigliato | CD |
|-----------|-----------------|-----|
| Capire se un PNG mente | Saggezza (Intuizione) | 12-15 |
| Raccogliere informazioni in strada | Carisma (Persuasione) o Intelligenza (Indagare) | 12-14 |
| Seguire tracce in città | Saggezza (Sopravvivenza) | 13 |
| Forzare una porta / scalare muro | Forza (Atletica) | 12-15 |
| Muoversi in silenzio | Destrezza (Furtività) | 12 |
| Notare qualcosa di nascosto | Saggezza (Percezione) | 12-16 |
| Riconoscere un simbolo / setta | Intelligenza (Religione) o Arcana | 12-15 |
| Intimidire un bandito | Carisma (Intimidire) o Forza (Atletica) | 13 |
| Staccare una stirge (dal corpo) | Forza (Atletica) | 13 |
| Resistere al veleno (Midnight Tears) | Costituzione (Tiro Salvezza) | 16 |

#### Condizioni — Effetti rapidi

| Condizione | Effetto chiave |
|-----------|---------------|
| **Avvelenato** | Svantaggio ad attacchi e tiri caratteristica |
| **Prono** | Svantaggio agli attacchi a distanza ricevuti; vantaggio agli attacchi in mischia ricevuti; costo metà movimento per alzarsi |
| **Trattenuto** | Velocità 0; svantaggio a Destrezza; attacchi ricevuti con vantaggio |
| **Stordito** | Velocità 0; non può agire/reagire; attacchi ricevuti con vantaggio; fallisce automaticamente For/Des tiri salvezza |
| **Spaventato** | Svantaggio attacchi se la fonte è in vista; non può avvicinarsi alla fonte |
| **Charmed** | Non può attaccare chi ti ha incantato; vantaggio a chi ti ha incantato in tiri Carisma verso di te |
| **Incapacitato** | Non può compiere azioni o azioni bonus |

#### Morte e stabilizzazione

- A 0 PF: Incapacitato; inizio turno → Tiro Salvezza Morte (CD 10, Costituzione)
- 3 successi: stabilizzato; 3 fallure: morto
- Danni a 0 PF: 1 fallimento automatico; danno critico: 2 fallimenti automatici
- Stabilizzare (Medicina CD 10) come azione; Cure Wounds lo riporta in piedi

---

### Abbreviazioni missioni (uso rapido)

| Codice | Titolo completo | File MD |
|--------|----------------|---------|
| A-M1 | Arpisti M1 — Un Cavallo Donato | [Leggi](Missioni/Arpisti/M1-UnCavalloDonato.md) |
| A-M2 | Arpisti M2 — Disinfestazione | [Leggi](Missioni/Arpisti/M2-Disinfestazione.md) |
| A-M3 | Arpisti M3 — Benvenuti in Famiglia | [Leggi](Missioni/Arpisti/M3-BeneventutiInFamiglia.md) |
| A-M4 | Arpisti M4 — Velo Alzato | [Leggi](Missioni/Arpisti/M4-VeloAlzato.md) |
| FG-M1 | Force Grey M1 — Il Carico del Fondatore | [Leggi](Missioni/ForceGrey/M1-IlCaricoDelFondatore.md) |
| FG-M2 | Force Grey M2 — Non è Tutto Oro | [Leggi](Missioni/ForceGrey/M2-NonETuttoOro.md) |
| FG-M3 | Force Grey M3 — Crimini di Pensiero | [Leggi](Missioni/ForceGrey/M3-CriminiDiPensiero.md) |
| FG-M4 | Force Grey M4 — Cose Terribili | [Leggi](Missioni/ForceGrey/M4-CoseTerribili.md) |
| Z-M1 | Zentharim M1 — Un Brutto Momento | [Leggi](Missioni/Zentharim/M1-UnBruttoMomento.md) |
| Z-M2 | Zentharim M2 — Tieni il Resto | [Leggi](Missioni/Zentharim/M2-TieniIlResto.md) |
| Z-M3 | Zentharim M3 — Corri, Dasher! | [Leggi](Missioni/Zentharim/M3-CorriDasher.md) |
| Z-M4 | Zentharim M4 — Sangue del Patto | [Leggi](Missioni/Zentharim/M4-SangueDeiPatto.md) |

---

---

## §9 — Workflow Release Foundry VTT

Ogni modifica a file `.md` nella workspace (missioni, note campagna, background PG, ecc.) deve essere compilata e pubblicata come release GitHub perché Foundry VTT possa scaricarla tramite il modulo.

### Quando fare una release

| Situazione | Fai release? |
|-----------|:-----------:|
| Modifica singola e urgente (es. correzione errore prima della sessione) | ✅ Subito |
| Più modifiche in sequenza ravvicinata | ⏳ Accodale, poi release unica |
| Aggiornamento post-sessione (party.md, fazioni.md, sessioni/) | ✅ Dopo aver aggiornato tutti i file |
| Modifica minore a un file non ancora usato in gioco | ⏳ Aspetta |

### Comandi — Build + Release

```powershell
# 1. Build: converte .md → LevelDB (bumpa automaticamente module.json version)
npm run build

# 2. Aggiorna il download URL in module.json con la nuova versione
#    (es. v1.0.5 → v1.0.6)
#    Il Copilot lo fa automaticamente prima del commit.

# 3. Commit
git add Campagna/ Missioni/ PG-Background/ Lore/ packs/ src/ module.json build-foundry.mjs
git commit -m "feat/fix/chore: descrizione breve"
git push origin master

# 4. Retag sul commit attuale (il tag deve puntare al commit con il download URL aggiornato)
git tag -d vX.Y.Z
git push origin :refs/tags/vX.Y.Z
git tag vX.Y.Z -m "Messaggio release"
git push origin vX.Y.Z

# 5. Crea zip (solo module.json + packs/)
Compress-Archive -Path module.json, packs -DestinationPath dragon-heist-dm.zip -Force

# 6. Pubblica GitHub Release
gh release create vX.Y.Z dragon-heist-dm.zip module.json \
  --title "vX.Y.Z — Titolo breve" \
  --notes "## Novità`n`n- Punto 1`n- Punto 2"

# 7. Pulizia zip locale
Remove-Item dragon-heist-dm.zip
```

### Cosa include lo zip

- `module.json` — manifest del modulo (versione, URL download, definizione pack)
- `packs/` — LevelDB compilati (missioni-arpisti, missioni-forcegrey, missioni-zentharim, campagna, pg-backgrounds)

**Non includere:** `src/`, `Missioni/`, `Campagna/`, `Fonti-Originali/`, `*.md` — sono sorgenti, non servono a Foundry.

### Versioning

Lo script `build-foundry.mjs` bumpa automaticamente la patch version (`X.Y.Z+1`) a ogni `npm run build`. Il campo `download` in `module.json` deve essere aggiornato manualmente alla stessa versione prima del commit finale.

### Come Foundry trova la release

In Foundry VTT → **Add-on Modules → Check for Updates**: Foundry legge il campo `manifest` di `module.json`:
```
"manifest": "https://github.com/FabioC-88/dragon-heist-dm/releases/latest/download/module.json"
```
Quindi legge `download` dal `module.json` pubblicato nella release più recente e scarica lo zip lì indicato.

---

*Ultimo aggiornamento: Aprile 2026 — Pre-campagna. Aggiorna questo documento tramite conversazione con Copilot dopo sessioni significative.*
