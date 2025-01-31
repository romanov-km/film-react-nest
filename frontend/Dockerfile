# Используем базовый образ для Node.js для сборки
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json
COPY package.json ./

# Очистка кеша npm и повторная установка зависимостей
RUN npm cache clean --force && rm -rf node_modules package-lock.json && npm install --force

COPY . .

RUN npm run build

#FROM nginx:alpine

# Копируем статические файлы фронтенда в Nginx
#COPY --from=build /app/dist /var/www/frontend