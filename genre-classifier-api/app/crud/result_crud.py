from bson.objectid import ObjectId

from app.db.database import results_collection
from app.db.helper import result_helper


async def retrieve_results() -> list[dict]:
    results = []
    async for result in results_collection.find():
        results.append(result_helper(result))
    return results


async def retrieve_result(id: str) -> dict:
    object_id: ObjectId
    try:
        object_id = ObjectId(id)
    except:
        return None

    result = await results_collection.find_one({"_id": object_id})
    if result:
        return result_helper(result)


async def add_result(result_data: dict) -> dict:
    result = await results_collection.insert_one(result_data)
    new_result = await results_collection.find_one({"_id": result.inserted_id})
    return result_helper(new_result)


async def update_result(id: str, data: dict):
    object_id: ObjectId
    try:
        object_id = ObjectId(id)
    except:
        return False

    result = await results_collection.find_one({"_id": object_id})
    if result:
        updated_result = await results_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_result:
            return True
        return False


async def delete_result(id: str):
    object_id: ObjectId
    try:
        object_id = ObjectId(id)
    except:
        return False

    result = await results_collection.find_one({"_id": object_id})
    if result:
        await results_collection.delete_one({"_id": object_id})
        return True
