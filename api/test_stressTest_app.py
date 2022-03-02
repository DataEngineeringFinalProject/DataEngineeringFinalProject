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

def test_stressTest():
    total_elapsed_time = 0
    url = "http://localhost:5000"
    data = "I love you"
    for i in range(0, 100):
        response = send_request(url, data)
        total_elapsed_time += response.elapsed.total_seconds()    
    assert(total_elapsed_time < 60)