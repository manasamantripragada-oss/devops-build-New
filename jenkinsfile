pipeline {
    agent any

    environment {
        APP_NAME   = "react-ecommerce"
        IMAGE_NAME = "react-app"

        DEV_REPO  = "manasadevi09/react-ecommerce-dev"
        PROD_REPO = "manasadevi09/react-ecommerce-prod"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                git branch: env.BRANCH_NAME,
                    credentialsId: 'github-creds',
                    url: 'https://github.com/manasamantripragada-oss/devops-build-New.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                  echo "Building Docker image..."
                  docker build -t react-ecommerce-prod:latest .
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
                      echo "DEV branch detected – pushing to DEV repo"
                      docker tag ${IMAGE_NAME}:latest ${DEV_REPO}:latest
                      docker push ${DEV_REPO}:latest
                  fi

                  if [ "$BRANCH_NAME" = "main" ]; then
                      echo "MAIN branch detected – pushing to PROD repo"
                      docker tag ${IMAGE_NAME}:latest ${PROD_REPO}:latest
                      docker push ${PROD_REPO}:latest
                  fi
                '''
            }
        }

        stage('Deploy to AWS EC2 (Production Only)') {
            when {
                branch 'main'
                branch 'dev'
            }
            steps {
                sh '''
                  echo "Deploying production image to AWS EC2..."
                  chmod +x scripts/deploy.sh
                  ./scripts/deploy.sh manasadevi09/react-ecommerce-prod:latest
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
    }
}
