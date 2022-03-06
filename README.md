 DATA ENGINEERING:  FINAL PROJECT

## ABOUT THE PROJECT
This project was built by Maud GELLEE, Louise BOUQUE, Cassandra LOUPEC

Our project is a "Toxicity Monitor" and allows us to determine if a sentence is toxic, in different subdomains: Identity Attack, Insult, Obscene, Severe Toxicity, Threat and Toxicity. To realize this project we used the following model: https://huggingface.co/unitary/toxic-bert

The frontend run with Angular, the backend run in nodejs et the api run with Python

## TO BEGIN
In order to build, you need this logiciel installed on your machine

Docker 

Docker-compose 



## TO RUN THE PROJECT
You need to clone the repository : 

    git clone https://github.com/DataEngineeringFinalProject/DataEngineeringFinalProject.git

then, you need to build the project using docker compose:

 	docker-compose up --build
  

  
## TO ACCESS THE DIFFERENT ENVIRONMENT OF THE APPLICATION

  Frontend : http://localhost:9080

  Backend: http://localhost:3002

  API : http://localhost:5000

  Jenkins:

  Prometheus: http://localhost:9090

  Grafana: http://localhost:9000


## TO RUN THE TESTS : 
### UNITS TESTS
In order to run units tests in the backend, you have to run this command:

    cd api
	pytest test_unit_app.py

### INTEGRATION TESTS
In order to run  integration tests in the backend, you have to run this command:

	cd backend
	npm test test/firstIntegration.test.js
	npm test test/stressTest.test.js

In order to run  integration tests in the api, you have to run this command:

	cd api
	pytest test_integration_app.py


### E2E TESTS :
In order to run the tests manually, you need to install Cypress with :

    npm install cypress

Then go the the “frontend” folder and do :

    npx cypress run --spec cypress/integration/submit.spec.js
    npx cypress run --spec cypress/integration/title.spec.js
	   
## DIFFICULTIES ENCOUNTERED

Louise had a lot of issues with Docker and Docker Desktop while working on this project. In order to solve them, she had to reinstall Docker Desktop several times due to many different errors during the build stage of this project. Several errors appeared but even after many searches on the internet to find the cause, it did not solve the problem. So we had to organize ourselves to test Louise's code at certain points in the project.

Cassandra was not able to work on the jenkins because she was not able to connect the git repository to Jenkins. She tried many things in order to, but it’s does not work.

Since we decided to use a remote server for jenkins (because of poor internet access or configuration issues), we had an issue regarding its configuration and had to change the way the container communicate in the pipeline and how to reach them in the test. We sadly did not manage to create files that could work both for the jenkins pipeline AND a local run. This is why we have to branch that are needed. The branch develop_demo is the branch that you should use if you want to run the app on your local machine (containing only localhost). If you want to see the configuration used to run the jenkins you should report to the develop_jen, release_jen, main_jen branched that are triggering the remote pipeline on a push. The only difference is the use of the server address containing jenkins in the different files instead of localhost. 
Normally, if we had run jenkins on our local machine we should have probably left the localhost.