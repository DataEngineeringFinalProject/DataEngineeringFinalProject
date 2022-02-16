# syntax=docker/dockerfile:1

FROM python:3.8

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY docker_entrypoint.sh docker_entrypoint.sh
COPY . .

EXPOSE 5000
#CMD [ "python", "save_hf_model.py"]
#CMD [ "python", "app.py"]
CMD ["./docker_entrypoint.sh"]
