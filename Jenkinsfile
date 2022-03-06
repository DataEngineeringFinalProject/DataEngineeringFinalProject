def branch_name = "${BRANCH_NAME}"
pipeline {
    agent any

    stages {
        stage('stress test and push to release') {
            when {
                branch 'develop_jen'
            }
            agent { 
                docker 'node:latest' 
                //docker 'python:3.8'
            }
            steps {
                //git([url:'git@github.com:maudg94/DataEngineeringFinalProject/DataEngineeringFinalProject.git', branch:"develop_test"])
                echo "stress testing"
                sh 'curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                sh 'chmod +x /usr/local/bin/docker-compose'
                
                // down if there are docker still running
                sh 'docker-compose down'
                sh 'docker ps'
                // build the applications and detach
                sh 'docker-compose up --build -d'

                sh 'cd backend && npm install'
                sh 'cd backend && npm test test/stressTest.test.js'

                sh 'docker-compose down'
                //sh 'pip install pytest'
                //sh 'pip install requests'
                //sh 'pytest api/test_stressTest_app.py'
                
                sh """
                git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
                git fetch --all
                """             
                sh "git config user.email \"maud.glacee@gmail.com\""
                sh "git config user.name \"maudg94\""

                //sh 'git fetch'
                sh 'git branch -a'
                sh 'git merge -s ours release_jen'
                sh 'git checkout release_jen'
                sh 'git merge develop_jen'
                withCredentials([gitUsernamePassword(credentialsId: 'github', gitToolName: 'git-tool')]) {
					sh 'git push -u origin release_jen --force'
				}
                
            }
        }

        stage('integrationt tests and push to main'){
            when {
                /*expression {
                    return branch_name =~ /^features_./
                }*/
                branch 'release_jen'
                //branch 'fausseBranche'
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
                        sh 'pip install prometheus_client==0.13.1'
                        sh 'pip install --find-links https://download.pytorch.org/whl/torch_stable.html torch==1.9.0+cpu torchvision==0.10.0+cpu'
                        sh 'pip3 install detoxify'

                        // run integration test                
                        sh 'pytest api/test_integration_app.py'

                        sh 'docker-compose down'
                    }
                }
                
                stage('backend integration test'){
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
                        sh 'cd backend && npm install'
                        sh 'cd backend && npm install mocha --save'
                        sh 'cd backend && npm install chai --save'
                        script {
                            timeout(125) {
                                waitUntil {
                                    try {
                                        sh script: 'curl http://192.168.1.35:5000 --header "Content-Type: application/json" --request GET', returnStdout: true
                                        return true
                                    } catch (exception) {
                                        return false
                                    }
                                }
                            }
                        }
                        sh 'cd backend && npm test test/firstIntegration.test.js'
                        sh 'docker-compose down'
                    }
                }
                stage('front integration test'){
                    agent {
                        docker 'cypress/base:latest'
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
                        sh 'cd frontend && npm install'
                        sh 'cd frontend && npm install cypress'
                        sh 'cd frontend && npx browserslist@latest --update-db'
                        sh 'cd frontend && apt-get install -y libgbm-dev'
                        script {
                            timeout(125) {
                                waitUntil {
                                    try {
                                        sh script: 'curl http://192.168.1.35:5000 --header "Content-Type: application/json" --request GET', returnStdout: true
                                        return true
                                    } catch (exception) {
                                        return false
                                    }
                                }
                            }
                        }
                        //sh 'curl --header "Content-Type: application/json" --request POST --data \'{"sent":"sentence test"}\' http://localhost:3002'

                        //sh 'cd frontend && apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb'
                        sh 'cd frontend && npx cypress run --spec cypress/integration/title.spec.js'
                        sh 'cd frontend && npx cypress run --spec cypress/integration/submit.spec.js'
                        sh 'docker-compose down'
                    }
                }
            }
        }

        stage('push to main'){
            when {
                branch 'release_jen'
            }
            steps {
                sh """
                git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
                git fetch --all
                """             
                sh "git config user.email \"maud.glacee@gmail.com\""
                sh "git config user.name \"maudg94\""

                //sh 'git fetch'
                sh 'git branch -a'
                sh 'git merge -s ours main_jen'
                sh 'git checkout main_jen'
                sh 'git merge release_jen'
                withCredentials([gitUsernamePassword(credentialsId: 'github', gitToolName: 'git-tool')]) {
                    sh 'git push -u origin main_jen --force'
                }
            }
        }
        
        stage('deploying') {
            when {
                branch 'main'
            }
            steps {
                echo "Deploying ..."
            }
        }
    }
    
    post { 
        always { 
            sh 'curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
            sh 'chmod +x /usr/local/bin/docker-compose'
            sh 'docker-compose down'
        }
    }
    
}