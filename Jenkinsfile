def branch_name = "${BRANCH_NAME}"
pipeline {
    agent any

    stages {

        /*stage('unit test') {
            when {
                expression {
                    return branch_name =~ /^features_./
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
        }*/
        /*stage('stress test and push to release') {
            /*when {
                branch 'develop'
            }
            when {
                expression {
                    return branch_name =~ /^features_./
                }
            }
            agent { 
                //docker 'node:latest' 
                docker 'python:3.8'
            }
            steps {
                echo "stress testing"
                sh 'curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                sh 'chmod +x /usr/local/bin/docker-compose'
                
                // down if there are docker still running
                sh 'docker-compose down'
                // build the applications and detach
                sh 'docker-compose up --build -d'

                //sh 'cd backend && npm install'
                //sh 'cd backend && npm test test/stressTest.test.js'
                sh 'pip install pytest'
                sh 'pip install requests'
                sh 'pytest api/test_stressTest_app.py'
                /*sh """
                git fetch origin
                git checkout release
                gir add *
                gir commit -m "add to release"
                git merge develop
                """/
            }
        }*/

        stage('integrationt tests'){
            when {
                expression {
                    return branch_name =~ /^features_.*/
                }
                //branch 'develop'
            }
            parallel{
                /*stage('api integration test'){
            
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
                }*/
                
                /*stage('backend integration test'){
                    agent {
                        docker 'node:latest'
                    }
                    steps {
                        echo "integration testing backend"

                        sh 'curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                        sh 'chmod +x /usr/local/bin/docker-compose'

                        // down if there are docker still running
                        sh 'docker-compose down'
                        // build the applications and detach
                        sh 'docker-compose up --build -d'
                        //sh 'curl --header "Content-Type: application/json" --request POST --data \'{"sent":"sentence test"}\' http://localhost:3002'
                        sh 'cd backend && npm install'
                        sh 'cd backend && npm install mocha --save'
                        sh 'cd backend && npm install chai --save'
                        sh 'cd backend && npm test test/firstIntegration.test.js'
                        /*sh """
                        git fetch origin
                        git checkout main
                        git merge release
                        """
                    }
                }*/
                stage('front integration test'){
                    agent {
                        docker 'node:latest'
                    }
                    /*when {
                        branch 'release'
                    }*/
                    steps {
                        echo "e2e testing"
                        sh 'curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                        sh 'chmod +x /usr/local/bin/docker-compose'

                        // down if there are docker still running
                        sh 'docker-compose down'
                        // build the applications and detach
                        sh 'docker-compose up --build -d'

                        sh 'npm install cypress'
                        sh 'cd frontend && npx cypress run --spec cypress/integration/submit.spec.js'
                        sh 'cd frontend && npx cypress run --spec cypress/integration/title.spec.js'
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