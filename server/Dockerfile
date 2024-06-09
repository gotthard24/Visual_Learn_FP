FROM node:20.12.1

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD node index.js