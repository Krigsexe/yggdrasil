#!/bin/bash
# =============================================================================
# YGGDRASIL - One-Click Start Script (Linux/Mac)
# =============================================================================
# Usage: ./start.sh
# =============================================================================

set -e

echo ""
echo "========================================"
echo "   YGGDRASIL - L'Arbre-Monde de l'IA   "
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}[ERROR] Docker n'est pas lance. Demarrez Docker.${NC}"
    exit 1
fi

echo -e "${GREEN}[OK] Docker est actif${NC}"

# Check Supabase is running
echo ""
echo -e "${YELLOW}[INFO] Verification de Supabase (PostgreSQL)...${NC}"
if ! docker ps --filter "name=supabase_db_bifrost" --format "{{.Names}}" | grep -q "supabase_db_bifrost"; then
    echo -e "${YELLOW}[WARN] Supabase n'est pas lance. Demarrage...${NC}"
    cd packages/bifrost && supabase start && cd ../..
else
    echo -e "${GREEN}[OK] Supabase est actif sur port 54322${NC}"
fi

# Stop existing YGGDRASIL containers (not Supabase)
echo ""
echo -e "${YELLOW}[INFO] Arret des containers YGGDRASIL existants...${NC}"
docker compose down 2>/dev/null || true

# Build and start all services
echo ""
echo -e "${YELLOW}[INFO] Construction et demarrage des services...${NC}"
echo "       (premiere fois peut prendre 5-10 minutes)"
echo ""

docker compose up -d --build

# Wait for services to be healthy
echo ""
echo -e "${YELLOW}[INFO] Attente des services...${NC}"

MAX_WAIT=120
WAITED=0

while [ $WAITED -lt $MAX_WAIT ]; do
    HEALTH=$(curl -s http://localhost:3000/api/v1/health 2>/dev/null || echo '{}')
    STATUS=$(echo $HEALTH | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

    if [ "$STATUS" = "healthy" ]; then
        break
    fi

    sleep 5
    WAITED=$((WAITED + 5))
    echo "       Attente... (${WAITED}s)"
done

# Final status
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   YGGDRASIL EST PRET!                 ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Services disponibles:"
echo -e "  - Bifrost (UI)     : ${CYAN}http://localhost:3001${NC}"
echo -e "  - Heimdall (API)   : ${CYAN}http://localhost:3000${NC}"
echo "  - PostgreSQL       : localhost:54322"
echo "  - Redis            : localhost:6379"
echo ""
echo "Commandes utiles:"
echo "  docker compose logs -f      # Voir les logs"
echo "  docker compose down         # Arreter"
echo "  docker compose restart      # Redemarrer"
echo ""

# Open browser (Linux/Mac)
if command -v xdg-open &> /dev/null; then
    xdg-open "http://localhost:3001" &
elif command -v open &> /dev/null; then
    open "http://localhost:3001" &
fi
