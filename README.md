# Music Genre Classifier

This project is a music genre classifier that uses machine learning models to determine the genre of a 30 second clip song. It was trained with a dataset of 1000 songs and their respective genres. The dataset is from [Kaggle](https://www.kaggle.com/andradaolteanu/gtzan-dataset-music-genre-classification) and contains 10 genres: blues, classical, country, disco, hiphop, jazz, metal, pop, reggae, rock. The dataset contains 100 songs - 30 seconds long per genre. 

<div style>
    <img src="https://raw.githubusercontent.com/amoralesc/music-genre-classifier/main/screenshots/screenshot_1.png" width="400">
    <img src="https://raw.githubusercontent.com/amoralesc/music-genre-classifier/main/screenshots/screenshot_2.png" width="400">
    <img src="https://raw.githubusercontent.com/amoralesc/music-genre-classifier/main/screenshots/screenshot_3.png" width="400">
</div>

## Features

- Upload an audio .wav file by drag and dropping it or by clicking the upload area
- Play/pause the audio file in the browser
- Remove the audio file
- Upload the audio file to classify it
- See the classification results (genre and probability)

## Technologies

- **Frontend**: ReactJS + Vite
- **Backend**:
    - FastAPI for the Web API
    - Celery to process the audio files (workers)
    - MongoDB as the database to store the results
    - RabbitMQ as the message broker
    - Google Cloud Storage to store the audio files
- **Machine Learning**: scikit-learn

## Project Structure

The project is structured as follows:
- [Frontend](genre-classifier-app/)
- [Backend](genre-classifier-api/)
- [Python notebook](model-training/)

Each directory has its own README.md file with more information about the project (how to build it, how to run it, etc).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
