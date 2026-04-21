AI files: uso e organizzazione
===============================

Scopo
------
Questo file descrive i file "AI / agent / prompt" presenti nel repository, come usarli (manualmente o programmaticamente), e come validarli.

Stato attuale
--------------
- I file sotto la radice (`AGENTS.md`, `Master-Prompt-DM.md`, `.instructions.md`, `DnD5e2024-Expert-SystemPrompt.md`, `git-procedures.agent.md`) sono documenti di prompt e istruzioni destinati all'uso umano (copy/paste in Copilot/Chat UI) o a eventuali tool esterni.
- Non esiste un loader runtime che carichi automaticamente questi file in questo repository.

Obiettivo raccomandato
----------------------
1. Centralizzare i prompt/agent in `ai/` per chiarezza (opzionale, consigliato).
2. Usare `ai/manifest.json` come elenco canonico dei prompt/agent da validare/integrare.
3. Eseguire `node scripts/validate-prompts.mjs` per verificare che i file elencati esistano.

File rilevanti e raccomandazione d'uso
-------------------------------------
- `AGENTS.md` — Documentazione principale per l'assistente DM; tenerlo come reference umano.
- `Master-Prompt-DM.md` — Manuale operativo esteso; mantenere come documentazione estesa.
- `.instructions.md` — Slash-commands e comportamento operativo; utile per Copilot/assistant.
- `DnD5e2024-Expert-SystemPrompt.md` — System-prompt specialistico per regole D&D; utile come reference tecnico.
- `git-procedures.agent.md` — Agente per procedure Git/release; può essere spostato sotto `ai/agents/` per coerenza.
- `.github/prompts/` — Library di prompt; se usati da GitHub Actions, mantenerli qui; altrimenti consolidare in `ai/prompts/`.

Esempio di workflow (manuale)
----------------------------
1. Aprire il prompt desiderato (es. `AGENTS.md`) e copiare nel tuo Chat UI (Copilot Chat, ChatGPT, ecc.) come system prompt.
2. Usare i template sotto `.github/prompts/` come prompt predefiniti per task ripetuti.

Validazione locale
------------------
Esegui:

```powershell
npm run ai-validate
```

Questo script esegue `node scripts/validate-prompts.mjs` e verifica che i file elencati in `ai/manifest.json` esistano.

Note di migrazione
------------------
- Se si decide di spostare i file in `ai/`, aggiornare i riferimenti in `AGENTS.md`, `Master-Prompt-DM.md` e `.instructions.md`.
- Prima di spostare, confermare che eventuali workflow esterni (GitHub Actions, estensioni VSCode) non dipendano dai path correnti.

Contatti
--------
Se vuoi che esegua la migrazione o crei il manifest + script di integrazione, scegli una delle opzioni proposte nella conversazione: A) solo README; B) README + manifest + script (eseguito ora); C) tutto (incluso loader opzionale).
