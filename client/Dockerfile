# FROM node:20.12.1 as builder

# ARG VITE_API_URL=/api
# ENV VITE_API_URL=${VITE_API_URL}

# WORKDIR /app
# COPY package*.json .

# RUN npm ci
# COPY . .

# RUN npm run build

# FROM nginx:alpine as runtime

# WORKDIR /usr/share/nginx/html

# RUN rm -rf ./*

# COPY nginx.conf /default.conf

# COPY --from=builder /app/dist .

# CMD ["/bin/sh" , "-c" , "envsubst '$VITE_API_URL' < /default.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

FROM node:20.12.1 as builder

ENV VITE_API_URL=/api

WORKDIR /app
COPY package*.json .

RUN npm ci
COPY . .

RUN npm run build

FROM nginx:alpine as runtime

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY nginx.conf /default.conf

COPY --from=builder /app/dist .

CMD ["/bin/sh" , "-c" , "envsubst '$API_URL' < /default.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]