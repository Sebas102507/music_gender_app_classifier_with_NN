# Genre Classifier API

This project is the backend part of the music genre classifier. It's a simple API that uses a pre-trained model to determine the genre of a 30 second clip song. It was developed with Python + FastAPI.

## Tech Stack

- **Python 3.10:** programming language
- **FastAPI:** web framework used to build the API
- **scikit-learn:** machine learning library used to host the pre-trained model
- **librosa:** audio processing library used to extract the features from the audio files
- **uvicorn:** ASGI server used to run the server

## Running the project locally

### Prerequisites

- [Python ^3.10](https://www.python.org/downloads/) installed and the `python` / `py` commands available in the terminal
- [Poetry](https://python-poetry.org/docs/#installation) installed and the `poetry` command available in the terminal. Follow the instructions in the link to install it.
- [RabbitMQ](https://www.rabbitmq.com/download.html) installed and running.

### Running the project in dev mode

1. Copy the `.env.example` file and rename it to `.env`.

```bash
cp .env.example .env
```

The following variables need to be set:

- `MONGODB_URI` with the URI of your MongoDB Atlas cluster.
- `CELERY_BROKER_URL` with the URL of your RabbitMQ server.

2. Install the dependencies:

```bash
poetry install
```

3. Activate the virtual environment:

```bash
poetry shell
```

The following commands need to be executed in their own terminal window, while the virtual environment (step 3) is activated.

4. Start the celery worker:

```bash
celery -A app.worker worker -l info -Q celery -c 10 -P solo
```

5. Run the API in development mode:

```bash
uvicorn app.main:app --reload
```

6. (Optional) Run the flower dashboard to monitor the celery tasks:

```bash
celery -A app.worker flower --port=5555
```

The project will be running at http://localhost:8000. You are now ready to send requests to the API. 

## API documentation

Thanks to FastAPI, the API documentation is automatically generated and available at http://localhost:8000/docs. You can also use the interactive API docs at http://localhost:8000/redoc. (Note: the API docs are only available in dev mode)
