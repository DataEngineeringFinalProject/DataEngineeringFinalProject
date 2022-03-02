# syntax=docker/dockerfile:1

FROM python:3.8

WORKDIR /app
ENV PROMETHEUS_MULTIPROC_DIR=/tmp

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install detoxify

# COPY docker_entrypoint.sh docker_entrypoint.sh
COPY . .

# to have smaller docker container
VOLUME /app/models

EXPOSE 5000

#CMD ["ls", "/app/models/transformers"]

#CMD [ "python", "save_hf_model.py"]
CMD [ "python", "app.py"]
#CMD ["./docker_entrypoint.sh"]
# docker build --tag mlapp .
# docker run -i -p 9000:5000 -v C:\Users\maudg\Desktop\EFREI\M2\dataEngineering\project2\project\DataEngineeringFinalProject\api\models:/app/models mlapp