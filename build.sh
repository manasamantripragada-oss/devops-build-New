#!/bin/bash
IMAGE=$1
TAG=$2

docker build -t $IMAGE:$TAG .
docker push $IMAGE:$TAG
