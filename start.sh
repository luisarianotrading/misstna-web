#!/bin/bash
# Start script para desarrollo local de MissTNA Web

echo "🚀 Iniciando MissTNA Web Development Environment..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}┌─────────────────────────────────────┐${NC}"
echo -e "${GREEN}│  MissTNA Web Platform - Dev Setup   │${NC}"
echo -e "${GREEN}└─────────────────────────────────────┘${NC}"
echo ""

# Check Node.js
echo -e "${BLUE}Verificando Node.js...${NC}"
node_version=$(node --version)
echo -e "${GREEN}✓ Node.js $node_version${NC}"
echo ""

# Check npm
echo -e "${BLUE}Verificando npm...${NC}"
npm_version=$(npm --version)
echo -e "${GREEN}✓ npm $npm_version${NC}"
echo ""

# Check Python
echo -e "${BLUE}Verificando Python...${NC}"
if command -v python &> /dev/null; then
    python_version=$(python --version)
    echo -e "${GREEN}✓ $python_version${NC}"
else
    echo -e "${YELLOW}⚠ Python no encontrado. La API local no funcionará.${NC}"
fi
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}Instalando dependencias de npm...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencias instaladas${NC}"
    echo ""
fi

# Start dev server
echo -e "${BLUE}Iniciando Next.js dev server en puerto 3000...${NC}"
echo -e "${YELLOW}http://localhost:3000${NC}"
echo ""

npm run dev
