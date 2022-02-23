from detoxify import Detoxify
import pytest

@pytest.fixture()
def model():
    model = Detoxify('original') 
    yield model

def test_correctAnswer_forNonToxicMessage(model):
    data = "You are beautiful"
    response = model.predict(data)
    assert(float(response["toxicity"]) < 0.02)

def test_correctAnswer_forNeutralMessage(model):
    data = "I am okay"
    response = model.predict(data)
    assert(float(response["toxicity"]) < 0.1)

def test_correctAnswer_forIdentityAttackMessage(model):
    data = "You fucking Asian"
    response = model.predict(data)
    assert(float(response["toxicity"]) > 0.9)
    assert(float(response["identity_attack"]) > 0.9)


def test_correctAnswer_forInsultMessage(model):
    data = "Bastard"
    response = model.predict(data)
    assert(float(response["toxicity"]) > 0.9)
    assert(float(response["insult"]) > 0.8)

def test_correctAnswer_forObsceneMessage(model):
    data = "go fuck yourself"
    response = model.predict(data)
    assert(float(response["toxicity"]) > 0.9)
    assert(float(response["obscene"]) > 0.8)

def test_correctAnswer_forThreatMessage(model):
    data = "I am going to kill you"
    response = model.predict(data)
    assert(float(response["toxicity"]) > 0.9)
    assert(float(response["threat"]) > 0.8)