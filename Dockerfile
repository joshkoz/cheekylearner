FROM python:3.6-alpine

RUN pip install Flask gunicorn

ENV APP_HOME /app

WORKDIR $APP_HOME

COPY app.py .

COPY ./public ./public

CMD exec gunicorn --bind :$PORT --access-logfile - --error-logfile - --log-level debug --workers 1 --threads 8 app:app

