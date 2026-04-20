FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --legacy-peer-deps
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# Копируем полную папку @prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000
RUN npx prisma generate --schema=./prisma/schema.prisma
CMD ["node", "dist/main"]