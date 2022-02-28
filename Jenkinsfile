def branch_name = "${BRANCH_NAME}"
pipeline {
    agent any

    stages {
        stage('unit test and push to develop') {
            when {
                expression {
                    return branch_name =~ /^features_.*/
                }
            }
            agent {
                docker 'python:3.8'
            }
            steps {
                echo "running unit test"
                /*sh 'pip install pytest'
                sh 'pip install --find-links https://download.pytorch.org/whl/torch_stable.html torch==1.9.0+cpu torchvision==0.10.0+cpu'
                sh 'pip3 install detoxify'
                sh 'dir'
                sh 'pytest api/test_unit_app.py'

                sh 'git fetch origin'*/
                /*sh """
                git fetch origin
                git checkout develop
                git merge ${BRANCH_NAME}
                """*/
            }
        }
        stage('test integration and docker compose'){
            when {
                expression {
                    return branch_name =~ /^features_.*/
                }
            }
            agent {
                docker 'python:3.8'
            }
            steps {
                
                echo "integration testing api"
                //sh 'curl -L https://github.com/docker/compose/releases/download/2.2.3/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose'
                //sh 'chmod +x /usr/local/bin/docker-compose'

                sh 'pip3 install docker-compose'
                sh 'dir'
                sh 'docker-compose down'
                sh 'docker-compose up --build'
                sh 'pip install pytest'
                sh 'pip install --find-links https://download.pytorch.org/whl/torch_stable.html torch==1.9.0+cpu torchvision==0.10.0+cpu'
                sh 'pip3 install detoxify'
                sh 'dir'
                
                sh 'pytest api/test_integration_app.py'
                /*sh """
                git fetch origin
                git checkout develop
                git merge ${BRANCH_NAME}
                """*/
            }
        }
        stage('stress test and push to release') {
            when {
                branch 'develop'
            }
            agent { docker { image 'node:16.13.1-alpine' } }
            steps {
                echo "stress testing"

                /*sh """
                git fetch origin
                git checkout release
                gir add *
                gir commit -m "add to release"
                git merge develop
                """*/
            }
        }
        stage('api integration test') {
            when {
                branch 'release'
            }
            agent {
                docker 'python:3.8'
            }
            steps {
                echo "integration testing api"
                sh 'pip install pytest'
                sh 'pip install --find-links https://download.pytorch.org/whl/torch_stable.html torch==1.9.0+cpu torchvision==0.10.0+cpu'
                sh 'pip3 install detoxify'
                sh 'docker compose-up --build'
                sh 'pytest api/test_integration_app.py'
                /*sh """
                git fetch origin
                git checkout develop
                git merge ${BRANCH_NAME}
                """*/
            }
        }
        stage('backend integration test and push to main'){
            when {
                branch 'release'
            }
            agent {
                docker 'node:latest'
            }
            steps {
                echo "integration testing backend"
                sh 'docker-compose up --build'
                sh 'npm install mocha --save'
                sh 'npm install chai'
                sh 'npm run test'
                /*sh """
                git fetch origin
                git checkout main
                git merge release
                """*/
            }
        }
        stage('node integration test and push to main'){
            when {
                branch 'release'
            }
            steps {
                echo "integration testing backend"
                /*sh """
                git fetch origin
                git checkout main
                git merge release
                """*/
            }
        }
        stage('deploying') {
            when {
                branch 'main'
            }
            steps {
                echo "Building Artifact"

                echo "Deploying Code"
            }
        }
    }
}