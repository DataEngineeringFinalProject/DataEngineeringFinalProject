import pytest
import requests
import sched, time
import http
import json
from app import create_app

@pytest.fixture()
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })

    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()

    
def test_responseIs200(client):
    url = "/"
    data = "I love you"
    response = send_request(url, data, client)
    print(response, response.data)
    assert response.status_code == 200

def send_request(url, data, client):
    j_data = json.dumps(data)
    print(j_data)
    headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
    r = client.post(url, data=j_data, headers=headers)
    return r

def test_correctAnswer_forToxicMessage(client):
    url = "/"
    data = "I hate you"
    response = send_request(url, data, client)
    responseList = json.loads(response.data)
    toxicityScore = float(responseList["toxicity"])
    assert(toxicityScore > 0.9)
    
"""
def test_stressTest():
    total_elapsed_time = 0
    url = "http://localhost:9000"
    data = "I love you"
    for i in range(0, 100):
        response = send_request(url, data)
        total_elapsed_time += response.elapsed.total_seconds()    
    assert(total_elapsed_time < 60)"""
    
