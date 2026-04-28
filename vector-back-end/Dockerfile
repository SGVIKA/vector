#   СТАДИЯ 1: СБОРКА (BUILDER)  
# Используется полный образ для компиляции TypeScript и генерации Prisma Client
FROM node:20-alpine AS builder

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование манифестов зависимостей для кэширования слоёв Docker
# package*.json включает package.json и package-lock.json
COPY package*.json ./

# Копирование схемы Prisma для последующей генерации клиента
COPY prisma ./prisma/

# Установка всех зависимостей (включая devDependencies)
# --legacy-peer-deps: разрешение конфликтов peer-зависимостей (устаревшая логика npm v7)
RUN npm ci --legacy-peer-deps

# Копирование всех исходных файлов проекта
COPY . .

# Генерация Prisma Client на основе схемы в ./prisma/schema.prisma
# Создаёт типизированный ORM-клиент для взаимодействия с БД
RUN npx prisma generate

# Компиляция TypeScript в JavaScript (результат в папку dist)
# Выполняется скрипт "build" из package.json
RUN npm run build

#   СТАДИЯ 2: ПРОДУКЦИОННЫЙ ОБРАЗ  
# Минимальный образ без dev-зависимостей и исходного кода TS
FROM node:20-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование только производственных манифестов зависимостей
COPY package*.json ./

# Установка ТОЛЬКО production-зависимостей
# --only=production: исключает devDependencies (TypeScript, тесты, линтеры)
RUN npm ci --only=production --legacy-peer-deps

# Копирование скомпилированного JavaScript-кода из стадии builder
# /app/dist содержит результат транспиляции TypeScript
COPY --from=builder /app/dist ./dist

# Копирование схемы Prisma (необходима для генерации клиента в runtime)
COPY --from=builder /app/prisma ./prisma

# Копирование сгенерированного Prisma Client (базовый путь)
# .prisma содержит скомпилированную версию ORM-клиента
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Копирование полной директории @prisma (необходимые зависимости ORM)
# Содержит утилиты и рантайм-компоненты Prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

#   КОНФИГУРАЦИЯ ЗАПУСКА  

# Установка переменных окружения
ENV NODE_ENV=production    
ENV PORT=4000              

# Декларация порта, документирующая, реальный проброс через -p или docker-compose
EXPOSE 4000

# Генерация Prisma Client в production-окружении
# Необходимо повторно выполнить, т.к. клиент мог быть собран под другую платформу
RUN npx prisma generate --schema=./prisma/schema.prisma

# Команда запуска приложения
# node dist/main - запуск скомпилированного entry-файла (обычно main.js)
CMD ["node", "dist/main"]