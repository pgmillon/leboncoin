FROM python:2.7

WORKDIR /docker

ADD . /docker

RUN pip install -e /docker

RUN apt-get update
RUN apt-get install locales

RUN echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen
RUN locale-gen

ENV LANG C.UTF-8  
ENV LC_ALL C.UTF-8  

CMD python /docker/api/app.py
