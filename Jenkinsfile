def branch_name = "${BRANCH_NAME}"
pipeline {
    agent any

    stages {

        stage('unit test') {
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
                sh 'pip install pytest'
                sh 'pip install --find-links https://download.pytorch.org/whl/torch_stable.html torch==1.9.0+cpu torchvision==0.10.0+cpu'
                sh 'pip3 install detoxify'
                sh 'dir'
                sh 'pytest api/test_unit_app.py'

                sh 'git fetch origin'
            }
        }
        stage('stress test and push to release') {
            when {
                branch 'develop'
            }
            agent { docker { image 'node:latest' } }
            steps {
                echo "stress testing"
                sh 'npm install -g loadtest --save-dev'
                /*sh """
                git fetch origin
                git checkout release
                gir add *
                gir commit -m "add to release"
                git merge develop
                """*/
            }
        }

        stage('integrationt tests'){
            when {
                expression {
                    return branch_name =~ /^features_.*/
                }
            }
            parallel{
                stage('api integration test'){
            
                    agent {
                        docker 'python:3.8'
                    }
                    steps {
                        
                        echo "integration testing api"

                        // since we are on agent we need ton install docker compose
                        sh 'pip3 install docker-compose'

                        // down if there are docker still running
                        sh 'docker-compose down'
                        // build the applications and detach
                        sh 'docker-compose up --build -d'

                        // install requirement for integration testing
                        sh 'pip install pytest'
                        sh 'pip install numpy'
                        sh 'pip install pandas'
                        sh 'pip install Flask==2.0.1'
                        sh 'pip install --find-links https://download.pytorch.org/whl/torch_stable.html torch==1.9.0+cpu torchvision==0.10.0+cpu'
                        sh 'pip3 install detoxify'

                        // run integration test                
                        sh 'pytest api/test_integration_app.py'
                    }
                }
                
                stage('backend integration test and push to main'){
                    agent {
                        docker 'node:latest'
                    }
                    steps {
                        echo "integration testing backend"

                        // since we are on agent we need ton install docker compose
                        sh 'pip3 install docker-compose'

                        // down if there are docker still running
                        sh 'docker-compose down'
                        // build the applications and detach
                        sh 'docker-compose up --build -d'

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