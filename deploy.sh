#!/bin/bash

docker pull manasadevi09/dev:latest
docker-compose down
docker-compose up -d
