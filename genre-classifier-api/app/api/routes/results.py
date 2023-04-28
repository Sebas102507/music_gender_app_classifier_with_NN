from fastapi import APIRouter, HTTPException

from app import crud, schemas

router = APIRouter()


@router.get("/")
async def read_results() -> list[dict]:
    results = await crud.result_crud.retrieve_results()
    return results


@router.get("/{id}")
async def read_result(id: str) -> dict:
    result = await crud.result_crud.retrieve_result(id)
    if result is None:
        raise HTTPException(status_code=404, detail="Result not found")
    return result


@router.delete("/{id}", status_code=204)
async def delete_result(id: str) -> None:
    await crud.result_crud.delete_result(id)
    return None
