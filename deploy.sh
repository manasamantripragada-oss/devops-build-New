#!/bin/bash
IMAGE=$1

docker pull $IMAGE
docker stop react-app || true
docker rm react-app || true

docker run -d \
--name react-app \
-p 80:80 \
$IMAGE
