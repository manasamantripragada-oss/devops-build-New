#!/bin/bash

IMAGE_NAME=manasadevi09/dev
TAG=latest

docker build -t $IMAGE_NAME:$TAG .
docker push $IMAGE_NAME:$TAG
