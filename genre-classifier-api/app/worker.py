import io, os, librosa, joblib
import asyncio
import soundfile as sf
import numpy as np
from urllib.request import urlopen

from app.core.celery_app import celery_app
from app.crud import result_crud

from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

model = joblib.load(os.path.join(os.getcwd(), "app", "model.pkl"))
genres = [
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
]

# The following task is an intensive task that:
# 1. Downloads the audio file from the URL
# 2. Extracts the audio features
# 3. Classifies the audio file with the trained model
# 4. Updates the database with the classification results


def extract_audio_features(data) -> np.ndarray:
    # Extract audio features

    # chroma_stft_mean chroma_stft_var
    chroma_stft = librosa.feature.chroma_stft(y=data, sr=22050)
    chroma_stft_mean = chroma_stft.mean()
    chroma_stft_var = chroma_stft.var()

    # rms_mean rms_var
    rms = librosa.feature.rms(y=data)
    rms_mean = rms.mean()
    rms_var = rms.var()

    # spectral_centroid_mean spectral_centroid_var
    spectral_centroid = librosa.feature.spectral_centroid(y=data, sr=22050)
    spectral_centroid_mean = spectral_centroid.mean()
    spectral_centroid_var = spectral_centroid.var()

    # spectral_bandwidth_var
    spectral_bandwidth = librosa.feature.spectral_bandwidth(y=data, sr=22050)
    spectral_bandwidth_var = spectral_bandwidth.var()

    # zero_crossing_rate_var
    zero_crossing_rate = librosa.feature.zero_crossing_rate(y=data)
    zero_crossing_rate_var = zero_crossing_rate.var()

    # harmony_mean
    harmony = librosa.effects.harmonic(y=data)
    harmony_mean = harmony.mean()

    # perceptr_mean perceptr_var
    perceptr = librosa.effects.percussive(y=data)
    perceptr_mean = perceptr.mean()
    perceptr_var = perceptr.var()

    # tempo
    tempo = librosa.beat.tempo(y=data, sr=22050)
    tempo = tempo[0]

    # mfcc_mean mfcc_var
    mfcc = librosa.feature.mfcc(y=data, sr=22050)

    if len(mfcc.shape) == 3:
        mfcc = mfcc[0]
    mfcc_mean = mfcc.mean(axis=1)
    mfcc_var = mfcc.var(axis=1)

    # Create a list of audio features
    audio_features = [
        661504,
        chroma_stft_mean,
        chroma_stft_var,
        rms_mean,
        rms_var,
        spectral_centroid_mean,
        spectral_centroid_var,
        spectral_bandwidth_var,
        zero_crossing_rate_var,
        harmony_mean,
        perceptr_mean,
        perceptr_var,
        tempo,
    ]
    # Add mfcc features intercalated
    for i in range(0, 20):
        audio_features.append(mfcc_mean[i])
        audio_features.append(mfcc_var[i])
    # remove mfcc2_mean and mfcc20_var
    audio_features.pop()
    audio_features.pop(16)

    return np.array(audio_features).reshape(1, -1)


@celery_app.task(bind=True, name="classify_audio_file")
def classify_audio(self, result_id: str, request_file: dict) -> None:
    # Download the audio file from the URL
    data, samplerate = sf.read(io.BytesIO(urlopen(request_file["fileUrl"]).read()))
    data = data.T
    data = librosa.resample(data, samplerate, 22050)

    # Extract the audio features
    audio_features = extract_audio_features(data)

    # Classify the audio file with the trained model
    predictions = model.predict_proba(audio_features)
    logger.info(f"Predictions: {predictions}")

    # Find the top prediction and its probability
    prediction = np.argmax(predictions)
    probability = np.max(predictions)
    genre = genres[prediction]

    # Update the database with the classification results
    data = {
        "status": {
            "code": "SUCCESS",
            "message": "Audio file classified successfully",
        },
        "prediction": {
            "genre": genre,
            "probability": probability,
        },
    }
    loop = asyncio.get_event_loop()
    loop.run_until_complete(result_crud.update_result(result_id, data))
