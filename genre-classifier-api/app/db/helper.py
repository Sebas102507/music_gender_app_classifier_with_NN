def result_helper(result) -> dict:
    return {
        "id": str(result["_id"]),
        "status": result["status"],
        "file": result["file"],
        "prediction": result["prediction"],
    }
