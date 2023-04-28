import os
from celery import Celery

celery_app = Celery(
    "worker",
    broker=os.environ.get("CELERY_BROKER_URL"),
)

celery_app.conf.task_routes = {
    "app.tasks.*": {"queue": "celery"},
}

celery_app.conf.task_default_queue = "celery"
