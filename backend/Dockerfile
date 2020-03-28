FROM python:3.7.7-buster

COPY requirements.txt /

RUN pip install -r requirements.txt

RUN mkdir /server
WORKDIR /server
COPY . /server

EXPOSE 8000

CMD ["/bin/bash", "-c", "python manage.py runserver 0:8000"]