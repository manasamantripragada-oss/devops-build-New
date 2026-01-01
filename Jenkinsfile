pipeline {
    agent any

    environment {
        APP_NAME   = "react-ecommerce"
        IMAGE_NAME = "react-ecommerce"

        DEV_REPO  = "manasadevi09/react-ecommerce-dev"
        PROD_REPO = "manasadevi09/react-ecommerce-prod"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh '''
                  echo "Building Docker image..."
                  docker build -t ${IMAGE_NAME}:latest .
                '''
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                      echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                sh '''
                  if [ "$BRANCH_NAME" = "dev" ]; then
                      echo "DEV branch detected"
                      docker tag ${IMAGE_NAME}:latest ${DEV_REPO}:latest
                      docker push ${DEV_REPO}:latest
                  fi

                  if [ "$BRANCH_NAME" = "main" ]; then
                      echo "MAIN branch detected"
                      docker tag ${IMAGE_NAME}:latest ${PROD_REPO}:latest
                      docker push ${PROD_REPO}:latest
                  fi
                '''
            }
        }

        stage('Deploy to AWS EC2') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'main'
                }
            }
            steps {
                sh '''
                  chmod +x scripts/deploy.sh

                  if [ "$BRANCH_NAME" = "dev" ]; then
                      ./scripts/deploy.sh ${DEV_REPO}:latest
                  fi

                  if [ "$BRANCH_NAME" = "main" ]; then
                      ./scripts/deploy.sh ${PROD_REPO}:latest
                  fi
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Jenkins pipeline completed successfully"
        }
        failure {
            echo "❌ Jenkins pipeline failed – check logs"
        }
        always {
            sh 'docker system prune -f'
        }
    }
}
