from pydantic import BaseModel, Field
from typing import Literal

from .file_request import FileRequestSchema


class ResultSchema(BaseModel):
    class Status(BaseModel):
        code: Literal["SUCCESS", "PROCESSING", "ERROR"] = Field(
            ...,
            description="Status code of the result",
            example="SUCCESS",
            title="Status code",
        )
        message: str = Field(
            ...,
            description="Status message of the result",
            example="The model has classified the audio file",
            title="Status message",
        )

    class Prediction(BaseModel):
        genre: Literal[
            "blues",
            "classical",
            "country",
            "disco",
            "hiphop",
            "jazz",
            "metal",
            "pop",
            "reggae",
            "rock",
        ] = Field(
            ...,
            description="Predicted genre of the audio file",
            example="rock",
            title="Genre",
        )
        probability: float = Field(
            ...,
            description="Probability of the prediction",
            example=0.999,
            title="Probability",
            ge=0.0,
            le=1.0,
        )

    status: Status = Field(
        ...,
        description="Status of the result",
        example={
            "code": "SUCCESS",
            "message": "The model has classified the audio file",
        },
        title="Status",
    )
    file: FileRequestSchema = Field(
        ...,
        description="File requested for classification",
        example={
            "fileName": "audio_file.wav",
            "fileUrl": "https://example.com/audio_file.wav",
            "storagePath": "audio/audio_file.wav",
        },
        title="File request",
    )
    prediction: Prediction = Field(
        description="Prediction generated by the model",
        title="Prediction",
        default=None,
    )


class UpdateResultModel(ResultSchema):
    status: ResultSchema.Status = Field(
        ...,
        description="Status of the result",
        example={
            "code": "SUCCESS",
            "message": "The model has classified the audio file",
        },
        title="Status",
    )
    prediction: ResultSchema.Prediction = Field(
        description="Prediction generated by the model",
        title="Prediction",
        default=None,
    )