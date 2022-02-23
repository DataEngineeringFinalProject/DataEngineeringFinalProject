import pytest
import requests
import sched, time
import http
import json

def send_request(url, data):
    j_data = json.dumps(data)
    print(j_data)
    headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
    r = requests.post(url, data=j_data, headers=headers)
    return r

def test_responseIs200():
    url = "http://localhost:9000"
    data = "I love you"
    response = send_request(url, data)
    print(response, response.text)
    
    assert response.status_code == 200

def test_correctAnswer_forToxicMessage():
    url = "http://localhost:9000"
    data = "I hate you"
    response = send_request(url, data)
    responseList = json.loads(response.text)
    toxicityScore = float(responseList["toxicity"])
    assert(toxicityScore > 0.9)
    
def test_correctAnswer_forNonToxicMessage():
    url = "http://localhost:9000"
    data = "You are beautiful"
    response = send_request(url, data)
    print(response.text)
    responseList = json.loads(response.text)
    assert(float(responseList["toxicity"]) < 0.02)

def test_correctAnswer_forNeutralMessage():
    url = "http://localhost:9000"
    data = "I am okay"
    response = send_request(url, data)
    print(response.text)
    responseList = json.loads(response.text)
    toxicityScore = float(responseList["toxicity"])
    assert(toxicityScore < 0.1)

def test_correctAnswer_forIdentityAttackMessage():
    url = "http://localhost:9000"
    data = "You fucking Asian"
    response = send_request(url, data)
    print(response.text)
    responseList = json.loads(response.text)
    assert(float(responseList["toxicity"]) > 0.9)
    assert(float(responseList["identity_attack"]) > 0.9)


def test_correctAnswer_forInsultMessage():
    url = "http://localhost:9000"
    data = "Bastard"
    response = send_request(url, data)
    print(response.text)
    responseList = json.loads(response.text)
    assert(float(responseList["toxicity"]) > 0.9)
    assert(float(responseList["insult"]) > 0.8)

def test_correctAnswer_forObsceneMessage():
    url = "http://localhost:9000"
    data = "go fuck yourself"
    response = send_request(url, data)
    print(response.text)
    responseList = json.loads(response.text)
    assert(float(responseList["toxicity"]) > 0.9)
    assert(float(responseList["obscene"]) > 0.8)

def test_correctAnswer_forThreatMessage():
    url = "http://localhost:9000"
    data = "I am going to kill you"
    response = send_request(url, data)
    print(response.text)
    responseList = json.loads(response.text)
    assert(float(responseList["toxicity"]) > 0.9)
    assert(float(responseList["threat"]) > 0.8)

def test_stressTest():
    total_elapsed_time = 0
    url = "http://localhost:9000"
    data = "I love you"
    for i in range(0, 100):
        response = send_request(url, data)
        total_elapsed_time += response.elapsed.total_seconds()    
    assert(total_elapsed_time < 60)
    
