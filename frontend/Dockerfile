# Этап сборки
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Этап раздачи
FROM nginx:alpine

# Сначала копируем сборку
COPY --from=build /app/dist/public /usr/share/nginx/html

# Потом перезаписываем дефолтный конфиг
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80