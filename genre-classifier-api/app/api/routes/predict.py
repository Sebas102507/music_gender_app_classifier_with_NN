from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder

from app import crud, schemas
from app.worker import classify_audio

router = APIRouter()


@router.post("/")
async def predict(request_file: schemas.FileRequestSchema) -> dict:
    status = schemas.ResultSchema.Status(
        code="PROCESSING", message="The request is being processed"
    )
    result = schemas.ResultSchema(status=status, file=request_file)

    # Create a new result in the database
    result = await crud.result_crud.add_result(jsonable_encoder(result))

    # Send the file to the worker
    classify_audio.delay(result["id"], jsonable_encoder(request_file))

    return result
