# =============================================================================
# YGGDRASIL - One-Click Start Script (Windows)
# =============================================================================
# Usage: .\start.ps1
# =============================================================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   YGGDRASIL - L'Arbre-Monde de l'IA   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Docker is running
$dockerRunning = docker info 2>$null
if (-not $?) {
    Write-Host "[ERROR] Docker n'est pas lance. Demarrez Docker Desktop." -ForegroundColor Red
    exit 1
}

Write-Host "[OK] Docker est actif" -ForegroundColor Green

# Check Supabase is running
Write-Host ""
Write-Host "[INFO] Verification de Supabase (PostgreSQL)..." -ForegroundColor Yellow
$supabaseRunning = docker ps --filter "name=supabase_db_bifrost" --format "{{.Names}}" 2>$null
if (-not $supabaseRunning) {
    Write-Host "[WARN] Supabase n'est pas lance. Demarrage..." -ForegroundColor Yellow
    Push-Location packages/bifrost
    supabase start
    Pop-Location
} else {
    Write-Host "[OK] Supabase est actif sur port 54322" -ForegroundColor Green
}

# Stop existing YGGDRASIL containers (not Supabase)
Write-Host ""
Write-Host "[INFO] Arret des containers YGGDRASIL existants..." -ForegroundColor Yellow
docker compose down 2>$null

# Build and start all services
Write-Host ""
Write-Host "[INFO] Construction et demarrage des services..." -ForegroundColor Yellow
Write-Host "       (premiere fois peut prendre 5-10 minutes)" -ForegroundColor Gray
Write-Host ""

docker compose up -d --build

if (-not $?) {
    Write-Host ""
    Write-Host "[ERROR] Echec du demarrage. Voir logs:" -ForegroundColor Red
    Write-Host "        docker compose logs" -ForegroundColor Gray
    exit 1
}

# Wait for services to be healthy
Write-Host ""
Write-Host "[INFO] Attente des services..." -ForegroundColor Yellow

$maxWait = 120
$waited = 0

while ($waited -lt $maxWait) {
    $health = docker compose ps --format json 2>$null | ConvertFrom-Json
    $allHealthy = $true

    foreach ($service in $health) {
        if ($service.Health -eq "unhealthy") {
            $allHealthy = $false
            break
        }
    }

    # Check Heimdall specifically
    $heimdallHealth = curl -s http://localhost:3000/api/v1/health 2>$null | ConvertFrom-Json -ErrorAction SilentlyContinue
    if ($heimdallHealth.status -eq "healthy") {
        break
    }

    Start-Sleep -Seconds 5
    $waited += 5
    Write-Host "       Attente... ($waited s)" -ForegroundColor Gray
}

# Final status
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   YGGDRASIL EST PRET!                 " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Services disponibles:" -ForegroundColor White
Write-Host "  - Bifrost (UI)     : http://localhost:3001" -ForegroundColor Cyan
Write-Host "  - Heimdall (API)   : http://localhost:3000" -ForegroundColor Cyan
Write-Host "  - PostgreSQL       : localhost:54322" -ForegroundColor Gray
Write-Host "  - Redis            : localhost:6379" -ForegroundColor Gray
Write-Host ""
Write-Host "Commandes utiles:" -ForegroundColor White
Write-Host "  docker compose logs -f      # Voir les logs" -ForegroundColor Gray
Write-Host "  docker compose down         # Arreter" -ForegroundColor Gray
Write-Host "  docker compose restart      # Redemarrer" -ForegroundColor Gray
Write-Host ""

# Open browser
Write-Host "[INFO] Ouverture du navigateur..." -ForegroundColor Yellow
Start-Process "http://localhost:3001"
