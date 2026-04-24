AI files: uso e organizzazione
===============================

Scopo
------
Questo file descrive i file "AI / agent / prompt" presenti nel repository, come usarli e come è organizzato il sistema.

Struttura file AI
------------------
Tutti gli agenti e le istruzioni si trovano sotto `ai/agents/`:

```
ai/agents/
  AGENTS.md                        ← Documentazione framework agenti (pipeline, mappa cartelle)
  instructions.md                  ← Slash commands per VS Code Copilot Chat
  00-campaign-setup.agent.md       ← Bootstrap nuova campagna da fonti grezze
  00-recap-updater.agent.md        ← Aggiorna note sessione dopo il gioco
  01-session-extractor.agent.md    ← Estrae chunk narrativo da fonti/campagna/
  02-session-translator.agent.md   ← Traduce e adatta in italiano
  03-session-pc-integrator.agent.md ← Integra hook PG e atteggiamenti PNG
  04-session-missions-integrator.agent.md ← Integra hook missioni secondarie
  06-session-reviewer.agent.md     ← QC finale e validazione
  git-procedures.agent.md          ← Procedure Git/release
```

Struttura campagna
-------------------
I file di contenuto della campagna attiva sono in:

```
campagna/
  contesto.md              ← Party, PNG, villain, fazioni, tabella missioni (DH-specifico)
  party.md                 ← Livello, XP, stato attuale PG
  fazioni.md               ← Posizione fazioni + folder_path/fonti_path per ogni fazione
  missioni-secondarie.md   ← Stato missioni (Pianificata/In corso/Completata)
  png-incontrati.md        ← Registro PNG incontrati con attitudini
  rapporti.md              ← Note qualitative PG-PNG
  sessioni/                ← Note per sessione (dm-notes-sessione-NN.md)

fonti/
  campagna/                ← Fonte narrativa principale (libro/modulo)
  missioni/                ← Testi grezzi missioni secondarie per fazione
  personaggi/              ← File BG dei PG (BG NomeGiocatore.txt)
  lore/                    ← Guide ambientazione e materiale di supporto

missioni/{fazione}/        ← File .md strutturati per ogni missione (path da fazioni.md)
personaggi/                ← Background strutturati dei PG
```

Uso con VS Code Copilot
------------------------
Gli agenti sono file `.agent.md` usabili in VS Code Copilot Chat in modalità agent.
Le istruzioni in `instructions.md` definiscono gli slash commands disponibili:

- `/setup-campagna`   — Bootstrap nuova campagna da zero
- `/prep-sessione`    — Prepara la sessione successiva (pipeline 7 agenti)
- `/aggiorna-sessione` — Aggiorna note sessione dopo il gioco
- `/aggiorna-campagna` — Aggiorna stato campagna dopo una sessione
- `/espandi-missione` — Espandi dettagli di una missione
- `/png-stat`         — Genera stat block per un PNG
- `/indizio`          — Genera un indizio narrativo

Avviare una nuova campagna
---------------------------
1. Metti i materiali grezzi in `fonti/campagna/`, `fonti/missioni/`, `fonti/personaggi/`
2. Usa `/setup-campagna` in Copilot Chat → invoca `00-campaign-setup.agent.md`
3. L'agente intervista il DM e genera tutti i file strutturati

Per la campagna corrente (Dragon Heist), i file sono già presenti.
