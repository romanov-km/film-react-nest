# Используем базовый образ Node.js
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Компилируем TypeScript
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package-lock.json /app/
COPY --from=build /app/public /app/public

RUN npm install --only=production

# Указываем порт, который будет слушать приложение
EXPOSE 3000

# Запускаем приложение
CMD ["node", "dist/main"]
