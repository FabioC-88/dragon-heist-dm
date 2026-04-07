# ===================================================================
# Script Pandoc v2: Converti Markdown → HTML (Percorsi Corti)
# Risolve problemi con spazi nei percorsi
# ===================================================================

Write-Host "🔄 Inizio conversione markdown → html (v2)..." -ForegroundColor Cyan

# Controlla Pandoc
$pandocPath = Get-Command pandoc -ErrorAction SilentlyContinue
if (-not $pandocPath) {
    Write-Host "❌ Pandoc non trovato!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Pandoc: $($pandocPath.Source)`n" -ForegroundColor Green

# Set percorso root (converti a formato breve se necessario)
$rootPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$htmlOutputRoot = Join-Path $rootPath "HTML_Output"

# Crea cartella output
if (-not (Test-Path $htmlOutputRoot)) {
    New-Item -ItemType Directory -Path $htmlOutputRoot -Force | Out-Null
}

Write-Host "📂 Root: $rootPath" -ForegroundColor Cyan
Write-Host "📂 Output: $htmlOutputRoot`n" -ForegroundColor Cyan

# Trova tutti i file .md (esclude cartelle di origine)
$mdFiles = @(
    Get-ChildItem -Path $rootPath -Filter "*.md" -Recurse | 
    Where-Object { $_.FullName -notmatch "(\.git|node_modules|Fonti-Originali)" }
)

Write-Host "📋 Trovati $($mdFiles.Count) file markdown`n" -ForegroundColor Cyan

$successCount = 0
$errorDetails = @()

foreach ($file in $mdFiles) {
    $mdFilePath = $file.FullName
    $relativePath = $mdFilePath -replace ([regex]::Escape($rootPath)), "" | 
                     ForEach-Object { $_.TrimStart("\") }
    
    # Determina cartella output
    $fileDir = Split-Path -Parent $mdFilePath
    $relativeDir = $fileDir -replace ([regex]::Escape($rootPath)), "" | 
                   ForEach-Object { $_.TrimStart("\") }
    
    $outputDir = Join-Path $htmlOutputRoot $relativeDir
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }
    
    # Converti nome file
    $htmlFilename = ($file.BaseName) + ".html"
    $htmlFilePath = Join-Path $outputDir $htmlFilename
    
    # Esegui Pandoc con gestione errori migliorata
    try {
        # Determina il percorso del template (relativo alla root)
        $templatePath = Join-Path $rootPath "custom-template.html"
        
        $output = & pandoc "$mdFilePath" `
                           -o "$htmlFilePath" `
                           --template "$templatePath" `
                           --css "style.css" `
                           --toc `
                           --metadata "title=$($file.BaseName)" `
                           --metadata "date=$(Get-Date -Format 'dd/MM/yyyy')" `
                           2>&1
        
        if ($LASTEXITCODE -eq 0) {
            # ✨ NUOVO: Post-processamento — sostituisci .md → .html nei link
            if (Test-Path $htmlFilePath) {
                $htmlContent = Get-Content -Path $htmlFilePath -Encoding UTF8 -Raw
                
                # Sostituisci .md → .html
                $htmlContent = $htmlContent -replace '\.md">', '.html">'
                
                # 🎨 Aggiusta il percorso CSS per sottocartelle
                $cssDepth = ($relativeDir -split '\\').Count - 1
                
                if ($cssDepth -gt 0) {
                    $cssPath = ("../" * $cssDepth) + "style.css"
                    $indexPath = ("../" * $cssDepth) + "INDEX.html"
                    
                    # Usa stringhe semplici per il replace
                    $htmlContent = $htmlContent -replace 'href="style\.css"', "href=""$cssPath"""
                    $htmlContent = $htmlContent -replace 'href="INDEX\.html"', "href=""$indexPath"""
                } elseif ($cssDepth -eq 0 -and $relativeDir -ne "") {
                    # Primo livello di profondità (Campagna/, Missioni/, ecc.)
                    $htmlContent = $htmlContent -replace 'href="INDEX\.html"', 'href="../INDEX.html"'
                    $htmlContent = $htmlContent -replace 'href="style\.css"', 'href="../style.css"'
                }
                
                $htmlContent | Out-File -FilePath $htmlFilePath -Encoding UTF8 -Force
            }
            
            Write-Host "✅ $relativePath" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "❌ $relativePath (Exit: $LASTEXITCODE)" -ForegroundColor Red
            $errorDetails += @{
                file = $relativePath
                error = $output
                exitCode = $LASTEXITCODE
            }
        }
    } catch {
        Write-Host "❌ $relativePath`: Exception" -ForegroundColor Red
        $errorDetails += @{
            file = $relativePath
            error = $_.Exception.Message
            exitCode = -1
        }
    }
}

# Copia CSS (Tema Elegante Dragon Heist)
$cssContent = @"
/* Dragon Heist Wiki - Elegant Fantasy Theme */

:root {
    --primary: #8b5cf6;
    --primary-dark: #7c3aed;
    --primary-light: #a78bfa;
    --secondary: #06b6d4;
    --accent: #f59e0b;
    --dark-bg: #0f172a;
    --light-bg: #f8fafc;
    --card-bg: #ffffff;
    --text-dark: #1e293b;
    --text-light: #475569;
    --border: #e2e8f0;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Segoe UI', 'Trebuchet MS', 'Lucida Grande', sans-serif;
    line-height: 1.7;
    background: linear-gradient(135deg, var(--light-bg) 0%, #f1f5f9 100%);
    color: var(--text-dark);
    min-height: 100vh;
}

main, nav, header {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

h1 {
    color: var(--primary-dark);
    font-size: 2.5em;
    margin: 1.2em 0 0.5em;
    font-weight: 700;
    letter-spacing: -0.5px;
    border-bottom: 3px solid var(--primary);
    padding-bottom: 15px;
}

h2 {
    color: var(--primary);
    font-size: 1.8em;
    margin: 1.5em 0 0.6em;
    font-weight: 600;
    letter-spacing: -0.3px;
}

h3 {
    color: var(--primary-dark);
    font-size: 1.4em;
    margin: 1.2em 0 0.5em;
    font-weight: 600;
}

h4, h5, h6 {
    color: var(--text-dark);
    margin: 1em 0 0.4em;
    font-weight: 600;
}

p {
    margin-bottom: 1em;
    color: var(--text-light);
    font-size: 1.05em;
}

a {
    color: var(--primary);
    text-decoration: none;
    transition: all 0.3s ease;
    font-weight: 500;
}

a:hover {
    color: var(--primary-dark);
    text-decoration: underline;
    text-decoration-thickness: 2px;
}

code {
    background-color: rgba(139, 92, 246, 0.1);
    color: var(--primary-dark);
    padding: 4px 8px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.9em;
    border: 1px solid rgba(139, 92, 246, 0.2);
}

pre {
    background-color: var(--dark-bg);
    color: #e0e7ff;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    line-height: 1.5;
    margin: 1.5em 0;
    border-left: 4px solid var(--primary);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.1);
}

pre code {
    background: transparent;
    color: #e0e7ff;
    padding: 0;
    border: none;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
    background: var(--card-bg);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--border);
}

table thead {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
}

table th {
    color: white;
    padding: 16px;
    text-align: left;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-size: 0.95em;
    text-transform: uppercase;
}

table td {
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
    color: var(--text-light);
}

table tbody tr {
    transition: all 0.2s ease;
}

table tbody tr:hover {
    background-color: rgba(139, 92, 246, 0.05);
    transform: translateX(2px);
}

table tbody tr:last-child td {
    border-bottom: none;
}

ul, ol {
    margin: 1em 0 1em 1.5em;
    color: var(--text-light);
}

li {
    margin: 0.5em 0;
}

dt {
    font-weight: 700;
    color: var(--primary-dark);
    margin-top: 1.2em;
    margin-bottom: 0.3em;
}

dd {
    margin-left: 2em;
    margin-bottom: 0.8em;
    color: var(--text-light);
}

blockquote {
    border-left: 5px solid var(--primary);
    margin: 1.5em 0;
    padding: 1em 1.5em;
    background-color: rgba(139, 92, 246, 0.05);
    border-radius: 4px;
    color: var(--text-light);
    font-style: italic;
    font-size: 1.05em;
}

nav#TOC {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.5em;
    margin: 2em 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

nav#TOC h2 {
    margin-top: 0;
}

.toc {
    background: rgba(139, 92, 246, 0.05);
    border-left: 4px solid var(--primary);
    padding: 1.5em;
    border-radius: 6px;
    margin: 1.5em 0;
}

.toc ul {
    list-style: none;
    margin: 0;
}

.toc li {
    margin: 0.5em 0 0.5em 1.5em;
    position: relative;
}

.toc li:before {
    content: "▸";
    position: absolute;
    left: -1.2em;
    color: var(--primary);
    font-weight: bold;
}

.toc a {
    color: var(--primary);
    font-weight: 500;
}

.toc a:hover {
    color: var(--primary-dark);
}

hr {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    margin: 2.5em 0;
}

header#title-block-header {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    padding: 2.5em 1.5em;
    border-radius: 8px;
    margin-bottom: 2em;
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
}

header#title-block-header h1 {
    color: white;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    margin: 0;
    padding-bottom: 10px;
}

@media (max-width: 768px) {
    h1 { font-size: 1.8em; }
    h2 { font-size: 1.3em; }
    h3 { font-size: 1.1em; }
}
"@

$cssPath = Join-Path $htmlOutputRoot "style.css"
$cssContent | Out-File -FilePath $cssPath -Encoding UTF8 -Force

# Risultati
Write-Host "`n" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ Conversione completata!" -ForegroundColor Green
Write-Host "📊 File convertiti: $successCount / $($mdFiles.Count)" -ForegroundColor Green

if ($errorDetails.Count -gt 0) {
    Write-Host "`n⚠️  Errori rilevati:" -ForegroundColor Yellow
    foreach ($err in $errorDetails) {
        Write-Host "   • $($err.file)" -ForegroundColor Yellow
    }
}

Write-Host "`n📂 Output in: HTML_Output/" -ForegroundColor Cyan
Write-Host "🌐 Apri: HTML_Output/index.html" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan
