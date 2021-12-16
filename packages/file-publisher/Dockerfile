# Install dependencies
FROM node:14.2-slim as deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install


# Build
FROM node:14.2-slim as builder

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Run the app
FROM node:14.2-slim as runner

WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/build ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY ./config/production.ts ./config/production.js

EXPOSE 4001

CMD ["node", "app.js"]

