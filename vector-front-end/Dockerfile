#   СТАДИЯ 1: СБОРКА (BUILDER)  
# Полный образ для компиляции Next.js приложения и генерации статики
FROM node:20-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование манифестов зависимостей
# package*.json включает package.json и package-lock.json
COPY package*.json ./

# Установка всех зависимостей
# --legacy-peer-deps: разрешение конфликтов peer-зависимостей React 18+
RUN npm ci --legacy-peer-deps

# Копирование всех исходных файлов проекта
COPY . .

# Компиляция Next.js приложения
RUN npm run build

#   СТАДИЯ 2: ПРОДУКЦИОННЫЙ ОБРАЗ  
# Минимальный образ только для запуска скомпилированного приложения
FROM node:20-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование манифестов зависимостей для установки только production-пакетов
COPY package*.json ./

# Установка ТОЛЬКО production-зависимостей
RUN npm ci --only=production --legacy-peer-deps

# Копирование скомпилированной Next.js сборки из стадии builder
COPY --from=builder /app/.next ./.next

# Копирование статических активов
RUN if [ -d "/app/public" ]; then cp -r /app/public ./public; fi

# Копирование манифеста package.json
COPY --from=builder /app/package.json ./package.json

#   КОНФИГУРАЦИЯ ЗАПУСКА  

# Установка переменных окружения
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Декларация порта
EXPOSE 3000

# Команда запуска приложения
CMD ["npm", "run", "start"]