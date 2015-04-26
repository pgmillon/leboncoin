FROM python:2.7

WORKDIR /docker

ADD . /docker

RUN pip install -e /docker

CMD python /docker/api/app.py
