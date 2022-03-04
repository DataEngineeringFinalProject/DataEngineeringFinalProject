from flask import Flask, request, jsonify, Response
import numpy as np
from detoxify import Detoxify
import torch
import time 
from prometheus_client import CollectorRegistry, Summary, Counter, Gauge, Histogram, multiprocess, generate_latest,CONTENT_TYPE_LATEST
from prometheus_flask_exporter import PrometheusMetrics

REQUEST_TIME = Summary('request_processing_seconds', 'Time spent processing request')

REQUESTS = Counter('toxic_predict_total', 'Prediction requested')

EXCEPTIONS = Counter('toxic_predict_exceptions_total', 'Exceptions serving toxic predictions.')

INPROGRESS = Gauge('prediction_inprogress', 'Number of prediction in progress.')

LAST = Gauge('api_last_time_seconds', 'The last time api was served.')

LATENCY = Histogram('api_latency_seconds', 'Time for a request predictions.', buckets=[0.0001, 0.0002, 0.0005, 0.001, 0.01, 0.1])
#METRICS_REQUESTS = }

start = time.time()
def create_app():
    app = Flask(__name__)
    model = Detoxify('original')
    #metrics = PrometheusMetrics(app)

    @app.before_request
    def before_each_request():
        if request.path == '/':
            REQUESTS.inc()
            INPROGRESS.inc()
            
    @REQUEST_TIME.time()
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

    @app.after_request
    def after_each_request(response):
        with EXCEPTIONS.count_exceptions():
            if start < 50000:
                raise Exception
        LAST.set(time.time())
        INPROGRESS.dec()
        LATENCY.observe(time.time() - start)
        return response

    @app.route('/metrics')
    def metrics():
        #with EXCEPTIONS.count_exceptions():
            #if start < 50000:
                #raise Exception
        #LAST.set(time.time())
        #INPROGRESS.dec()
        #LATENCY.observe(time.time() - start)
        registry = CollectorRegistry()
        multiprocess.MultiProcessCollector(registry)
        return Response(generate_latest(registry), mimetype=CONTENT_TYPE_LATEST)
    
    #@app.after_request
    return app


if __name__ == '__main__':
    model = Detoxify('original')

    app = create_app()
    app.run(debug=True, host='0.0.0.0')


