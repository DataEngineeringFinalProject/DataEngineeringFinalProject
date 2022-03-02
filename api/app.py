from flask import Flask, request, jsonify, Response
import numpy as np
from detoxify import Detoxify
import torch
import time 
from prometheus_client import CollectorRegistry, Summary, Counter, Gauge, Histogram, multiprocess, generate_latest,CONTENT_TYPE_LATEST
from prometheus_flask_exporter import PrometheusMetrics

#REQUEST_TIME = Summary('request_processing_seconds', 'Time spent processing request')

REQUESTS = Counter('hello_worlds_total', 'Hello Worlds requested')

#EXCEPTIONS = Counter('hello_world_exceptions_total', 'Exceptions serving Hello World.')

#INPROGRESS = Gauge('hello_worlds_inprogress', 'Number of Hello Worlds in progress.')

#LAST = Gauge('hello_world_last_time_seconds', 'The last time a Hello World was served.')

#LATENCY = Histogram('hello_world_latency_seconds', 'Time for a request Hello World.', buckets=[0.0001, 0.0002, 0.0005, 0.001, 0.01, 0.1])
#METRICS_REQUESTS = {Summary('request_processing_seconds', 'Time spent processing request')

#,Counter('hello_worlds_total', 'Hello Worlds requested')

#, Counter('hello_world_exceptions_total', 'Exceptions serving Hello World.')

#,Gauge('hello_worlds_inprogress', 'Number of Hello Worlds in progress.')

#,Gauge('hello_world_last_time_seconds', 'The last time a Hello World was served.')

#, Histogram('hello_world_latency_seconds', 'Time for a request Hello World.', buckets=[0.0001, 0.0002, 0.0005, 0.001, 0.01, 0.1])}

def create_app():
    app = Flask(__name__)
    model = Detoxify('original')
    #metrics = PrometheusMetrics(app)

    @app.route('/', methods=['GET', 'POST'])
    def makecalc():
        if request.method=="POST":
            data = request.get_json()
            print("data ---- > ", data)
            
            results = model.predict(data)
            
            print("prediction ---- >",results)
            resultStringify = {label: f'{percentage:.4f}' for label, percentage in results.items()}
            return jsonify(resultStringify)
        
        return "Not a proper request method or data"
    
    @app.route('/metrics')
    def metrics():
        REQUESTS.inc()
        registry = CollectorRegistry()
        multiprocess.MultiProcessCollector(registry)
        return Response(generate_latest(registry), mimetype=CONTENT_TYPE_LATEST)
    return app


if __name__ == '__main__':
    model = Detoxify('original')

    app = create_app()
    app.run(debug=True, host='0.0.0.0')


