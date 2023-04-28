from fastapi import APIRouter

from app.api.routes import results, predict

api_router = APIRouter()
api_router.include_router(results.router, prefix="/results", tags=["results"])
api_router.include_router(predict.router, prefix="/predict", tags=["predict"])
