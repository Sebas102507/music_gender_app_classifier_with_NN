from pydantic import BaseModel, Field


class FileRequestSchema(BaseModel):
    file_name: str = Field(
        ...,
        description="File name of the audio file",
        example="audio_file.wav",
        title="File name",
        alias="fileName",
    )
    file_url: str = Field(
        ...,
        description="URL of the audio file",
        example="https://example.com/audio_file.wav",
        title="File URL",
        alias="fileUrl",
    )
    storage_path: str = Field(
        ...,
        description="Path of the audio file compatible with Firebase Storage",
        example="audio/audio_file.wav",
        title="Firebase Storage path",
        alias="storagePath",
    )
