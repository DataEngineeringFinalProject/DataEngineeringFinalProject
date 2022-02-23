def branch_name = "${BRANCH_NAME}"
pipeline {
    agent none

    stages {
        stage('unit test') {
            when {
                expression {
                    return branch_name =~ /^features_.*/
                }
            }
            steps {
                sh """
                echo "running unit test"
                """
            }
        }
        stage('stress test') {
            when {
                branch 'develop'
            }
            steps {
                sh """
                echo "stress testing"
                """
            }
        }
    }
}