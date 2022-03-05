from flask import Flask, request, jsonify
import numpy as np
from detoxify import Detoxify
import torch


def create_app():
    app = Flask(__name__)
    model = Detoxify('original')

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
    return app



if __name__ == '__main__':
    model = Detoxify('original')

    app = create_app()
    app.run(debug=True, host='0.0.0.0')


