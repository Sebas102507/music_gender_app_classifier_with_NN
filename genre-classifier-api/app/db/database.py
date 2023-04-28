import motor.motor_asyncio

from app.core.config import settings

client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGODB_URI)

database = client[settings.MONGODB_DATABASE]

results_collection = database.get_collection("results")
