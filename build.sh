#!/bin/bash

docker build -t gotthard24/client ./client
docker build -t gotthard24/server ./server

docker push gotthard24/client
docker push gotthard24/server