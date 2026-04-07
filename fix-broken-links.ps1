# ===================================================================
# Script: Correggi Link Rotti negli HTML
# Genera pagine stub per link mancanti e crea 404.html
# ===================================================================

Write-Host "🔍 Scannerizzazione link rotti..." -ForegroundColor Cyan

$htmlOutputRoot = "HTML_Output"
$stylesPath = Join-Path $htmlOutputRoot "style.css"

# Template per pagina "Coming Soon"
$comingSoonTemplate = @"
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
  <title>Pagina in Preparazione</title>
  <link rel="stylesheet" href="../style.css" />
  <style>
    .coming-soon-container {
        text-align: center;
        padding: 4em 2em;
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .coming-soon-icon {
        font-size: 5em;
        margin-bottom: 0.5em;
    }
    .coming-soon-container h1 {
        margin-top: 0;
        font-size: 2em;
    }
    .coming-soon-container p {
        font-size: 1.2em;
        margin: 1em 0;
    }
    .coming-soon-container a {
        margin-top: 2em;
        padding: 0.8em 1.5em;
        background-color: var(--primary);
        color: white;
        border-radius: 6px;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    .coming-soon-container a:hover {
        background-color: var(--primary-dark);
        text-decoration: none;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    }
  </style>
</head>
<body>
<header id="title-block-header">
<h1 class="title">🔨 In Preparazione...</h1>
</header>
<main>
<div class="coming-soon-container">
  <div class="coming-soon-icon">🏗️</div>
  <h1>Questa pagina è in preparazione</h1>
  <p>I contenuti per questa sezione saranno disponibili presto.</p>
  <p style="color: var(--text-light); font-size: 1em;">Nel frattempo, puoi esplorare le altre sezioni della wiki.</p>
  <a href="../../HTML_Output/INDEX.html">← Torna al Menu Principale</a>
</div>
</main>
</body>
</html>
"@

# Crea cartelle e file mancanti
$missingPages = @(
    @{
        path = "PG-Background/README.html"
        title = "Background dei Personaggi"
        desc = "Profili dettagliati di tutti i PG"
    },
    @{
        path = "Lore/Waterdeep-Quartieri.html"
        title = "Waterdeep - Quartieri Dettagliati"
        desc = "Descrizione geografica della città"
    },
    @{
        path = "Lore/Forgotten-Realms-Sword-Coast.html"
        title = "Forgotten Realms - Sword Coast"
        desc = "Lore regionale e background"
    },
    @{
        path = "Campagna/sessioni/index.html"
        title = "Note Sessioni"
        desc = "Registro delle sessioni giocate"
    }
)

foreach ($page in $missingPages) {
    $fullPath = Join-Path $htmlOutputRoot $page.path
    $dir = Split-Path -Parent $fullPath
    
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "📁 Creata cartella: $dir" -ForegroundColor Green
    }
    
    if (-not (Test-Path $fullPath)) {
        # Conta i livelli di profondità per creare il percorso relativo corretto al CSS
        $depth = ($page.path -split '\\').Count - 1
        $relativeCSS = ("../" * $depth) + "style.css"
        
        $content = $comingSoonTemplate -replace '\.\./style\.css', $relativeCSS
        $content = $content -replace 'In Preparazione\.\.\.', $page.title
        $content = $content -replace 'I contenuti per questa sezione saranno disponibili presto\.', $page.desc
        
        $content | Out-File -FilePath $fullPath -Encoding UTF8 -Force
        Write-Host "✅ Creato: $($page.path)" -ForegroundColor Green
    }
}

# Crea file 404.html centrale
$notFoundPage = @"
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
  <title>404 - Pagina Non Trovata</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    .error-container {
        text-align: center;
        padding: 4em 2em;
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .error-code {
        font-size: 6em;
        font-weight: 900;
        color: var(--primary);
        margin: 0;
        line-height: 1;
    }
    .error-message {
        font-size: 1.5em;
        margin: 0.5em 0 1.5em;
        color: var(--text-light);
    }
    .error-container p {
        max-width: 500px;
        margin-bottom: 2em;
    }
    .error-container a {
        margin: 0.5em;
        padding: 0.8em 1.5em;
        background-color: var(--primary);
        color: white;
        border-radius: 6px;
        font-weight: 600;
        transition: all 0.3s ease;
        display: inline-block;
    }
    .error-container a:hover {
        background-color: var(--primary-dark);
        text-decoration: none;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    }
  </style>
</head>
<body>
<main>
<div class="error-container">
  <h1 class="error-code">404</h1>
  <h2 class="error-message">Pagina Non Trovata</h2>
  <p>La pagina che stai cercando non esiste o è ancora in preparazione.</p>
  <p style="color: var(--text-light); font-size: 0.95em;">Torna al menu principale o naviga attraverso la wiki per trovare quello che cerchi.</p>
  <div>
    <a href="INDEX.html">← Menu Principale</a>
    <a href="QUICK_REF.html">📊 Quick Reference</a>
  </div>
</div>
</main>
</body>
</html>
"@

$notFoundPath = Join-Path $htmlOutputRoot "404.html"
$notFoundPage | Out-File -FilePath $notFoundPath -Encoding UTF8 -Force
Write-Host "✅ Creato: 404.html" -ForegroundColor Green

# Aggiungi JS agli HTML per intercettare link rotti
Write-Host "`n📝 Aggiornamento HTML con fallback..." -ForegroundColor Cyan

$brokenLinkScript = @"
<script>
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        var href = e.target.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http')) {
            // Verifica se il link porta a una pagina che probabilmente non esiste
            // (heuristica: cartelle senza index.html)
            if (href.endsWith('/') || href === '') {
                e.preventDefault();
                e.target.href = this.getAttribute('data-base-url') || '';
                // Naviga alla pagina Coming Soon
                var path = href.replace(/\/$/, '');
                window.location.href = path + (path.endsWith('.html') ? '' : '/index.html');
            }
        }
    }
}, true);
</script>
"@

$htmlFiles = Get-ChildItem -Path $htmlOutputRoot -Filter "*.html" -Recurse
$updated = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Encoding UTF8 -Raw
    
    # Aggiungi script solo se non già presente
    if ($content -notmatch '<script>' -or $content -notmatch 'broken.*link') {
        # Aggiungi lo script prima del closing body tag
        $newContent = $content -replace '(</body>)', "$($brokenLinkScript)`n`$1"
        $newContent | Out-File -FilePath $file.FullName -Encoding UTF8 -Force
        $updated++
    }
}

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ Correzione completata!" -ForegroundColor Green
Write-Host "📊 File stub creati: 4" -ForegroundColor Green
Write-Host "📄 404.html: Creato" -ForegroundColor Green
Write-Host "🔗 HTML aggiornati con fallback: $updated" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

Write-Host "✨ I link rotti ora puntano a pagine 'Coming Soon' eleganti!" -ForegroundColor Yellow
