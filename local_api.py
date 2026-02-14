"""
Local API para sincronizar datos de los 3 bots con MissTNA Web Platform
Corre en tu máquina Windows en puerto 5000

Instalación:
pip install fastapi uvicorn python-dotenv pydantic

Ejecución:
uvicorn local_api:app --port 5000 --host 0.0.0.0
"""

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import json
import os
from typing import Optional
from datetime import datetime
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="MissTNA Local API",
    description="API para sincronizar datos de bots con MissTNA Web Platform",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://misstna.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Configuration
API_KEY = os.getenv("LOCAL_API_KEY", "your-local-api-key")
ETFS_BOT_PATH = r"C:\Users\Owner\OneDrive\Escritorio\MissTNA_Bot"
SPY_BOT_PATH = r"C:\Users\Owner\MissTNA_Options_Scalping"
STOCKS_BOT_PATH = r"C:\Users\Owner\MissTNA Stocks\src"

# Models
class HealthResponse(BaseModel):
    status: str
    message: str
    timestamp: str

class DataResponse(BaseModel):
    data: dict
    timestamp: str
    source: str

# Auth middleware
def verify_api_key(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization format")
    
    token = authorization.replace("Bearer ", "")
    if token != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")

# Routes
@app.get("/health")
async def health_check():
    """Verificar que la API está funcionando"""
    return {
        "status": "online",
        "timestamp": datetime.now().isoformat(),
        "bots": {
            "etfs": "checking",
            "spy": "checking",
            "stocks": "checking"
        }
    }

@app.get("/data/etfs")
async def get_etfs_data(authorization: Optional[str] = Header(None)):
    """Obtener datos del bot ETFs"""
    try:
        verify_api_key(authorization)
        
        data_file = Path(ETFS_BOT_PATH) / "dashboard_data.json"
        if not data_file.exists():
            raise HTTPException(status_code=404, detail="ETFs data file not found")
        
        with open(data_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        logger.info(f"ETFs data fetched successfully at {datetime.now()}")
        return {
            "data": data,
            "timestamp": datetime.now().isoformat(),
            "source": "ETFs Bot"
        }
    except Exception as e:
        logger.error(f"Error fetching ETFs data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/data/spy")
async def get_spy_data(authorization: Optional[str] = Header(None)):
    """Obtener datos del bot SPY"""
    try:
        verify_api_key(authorization)
        
        # Intentar leer archivos de runtime del bot SPY
        runtime_dir = Path(SPY_BOT_PATH) / "data" / "runtime"
        
        data = {
            "health": None,
            "last_signal": None,
            "cycle_metrics": None,
            "timestamp": datetime.now().isoformat()
        }
        
        # Health
        health_file = runtime_dir / "health.json"
        if health_file.exists():
            with open(health_file, 'r', encoding='utf-8') as f:
                data["health"] = json.load(f)
        
        # Last Signal
        last_signal_file = runtime_dir / "last_signal.json"
        if last_signal_file.exists():
            with open(last_signal_file, 'r', encoding='utf-8') as f:
                data["last_signal"] = json.load(f)
        
        # Cycle Metrics
        cycle_metrics_file = runtime_dir / "cycle_metrics.csv"
        if cycle_metrics_file.exists():
            data["cycle_metrics"] = "See CSV file"
        
        logger.info(f"SPY data fetched successfully at {datetime.now()}")
        return {
            "data": data,
            "timestamp": datetime.now().isoformat(),
            "source": "SPY Bot"
        }
    except Exception as e:
        logger.error(f"Error fetching SPY data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/data/stocks")
async def get_stocks_data(authorization: Optional[str] = Header(None)):
    """Obtener datos del bot Stocks"""
    try:
        verify_api_key(authorization)
        
        # Intentar leer datos del bot Stocks
        last_signal_file = Path(STOCKS_BOT_PATH) / "TSLA_last_signal.json"
        
        data = {
            "last_signal": None,
            "timestamp": datetime.now().isoformat()
        }
        
        if last_signal_file.exists():
            with open(last_signal_file, 'r', encoding='utf-8') as f:
                data["last_signal"] = json.load(f)
        
        logger.info(f"Stocks data fetched successfully at {datetime.now()}")
        return {
            "data": data,
            "timestamp": datetime.now().isoformat(),
            "source": "Stocks Bot"
        }
    except Exception as e:
        logger.error(f"Error fetching Stocks data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/sync")
async def sync_all_bots(authorization: Optional[str] = Header(None)):
    """Sincronizar todos los bots"""
    try:
        verify_api_key(authorization)
        
        etfs = await get_etfs_data(authorization)
        spy = await get_spy_data(authorization)
        stocks = await get_stocks_data(authorization)
        
        return {
            "status": "synced",
            "timestamp": datetime.now().isoformat(),
            "bots": {
                "etfs": etfs,
                "spy": spy,
                "stocks": stocks
            }
        }
    except Exception as e:
        logger.error(f"Error syncing bots: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/metrics")
async def get_metrics(authorization: Optional[str] = Header(None)):
    """Obtener métricas consolidadas de todos los bots"""
    try:
        verify_api_key(authorization)
        
        etfs_response = await get_etfs_data(authorization)
        etfs_data = etfs_response.get("data", {})
        
        metrics = {
            "total_trades": etfs_data.get("metricas", {}).get("total_trades", 0),
            "total_pnl": etfs_data.get("metricas", {}).get("pnl_total", 0),
            "winrate": etfs_data.get("metricas", {}).get("winrate", 0),
            "active_routes": len(etfs_data.get("rutas_activas", [])),
            "timestamp": datetime.now().isoformat()
        }
        
        return metrics
    except Exception as e:
        logger.error(f"Error fetching metrics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000, log_level="info")
