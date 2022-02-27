def branch_name = "${BRANCH_NAME}"
pipeline {
    agent none

    stages {
        stage('unit test and push to develop') {
            when {
                expression {
                    return branch_name =~ /^features_.*/
                }
            }
            agent {
                docker 'python:3.10.1-alpine'
            }
            steps {
                echo "running unit test"
                sh 'pip install pytest'
                sh 'pip install torch==1.7.0'
                sh 'pip install detoxify'

                pytest test_unit_app.py
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
                git merge develop
                """*/
            }
        }
        stage('python integration test') {
            when {
                branch 'release'
            }
            steps {
                echo "integration testing"
                sh 'pip install pytest'
                sh 'pip install torch==1.7.0'
                sh 'pip install detoxify'

                pytest test_integraton_app.py
            }
        }
        stage('node integration test and push to main'){
            when {
                branch 'release'
            }
            steps {
                echo "integration testing"
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