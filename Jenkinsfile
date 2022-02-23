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
            steps {
                sh """
                echo "running unit test"
                """
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
            steps {
                sh """
                echo "stress testing"
                """
                /*sh """
                git fetch origin
                git checkout release
                git merge develop
                """*/
            }
        }
        stage('integration test and push to main') {
            when {
                branch 'release'
            }
            steps {
                sh """
                echo "integration testing"
                """
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
                sh """
                echo "Building Artifact"
                """

                sh """
                echo "Deploying Code"
                """
            }
        }
    }
}