FROM --platform=$BUILDPLATFORM python:3.12-bookworm AS builder

WORKDIR /app

COPY requirements.txt /app
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . /app

ENV FLASK_RUN_PORT=${FLASK_RUN_POR}

CMD ["flask", "run", "--host=0.0.0.0"]
