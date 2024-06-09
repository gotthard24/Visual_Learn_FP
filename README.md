# Docker

## Images creation
- client
```shell
docker build -t gotthard24/client:latest ./client
```
- server
```
docker build -t gotthard24/server:latest ./server
```

## Image upload registry
- client
```shell
docker push gotthard24/client:latest
```
- server
```shell
docker push gotthard24/server:latest
```

## termius vm aws push

cd /home/ubuntu/app 

docker-compose pull

docker-compose up -d