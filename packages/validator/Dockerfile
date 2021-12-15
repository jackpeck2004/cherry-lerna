# Install dependencies
FROM node:14.2-slim as deps

WORKDIR /app
ARG TOKEN
COPY package.json package-lock.json ./
# COPY /node_modules/@jackpeck2004 ./node_modules
COPY .npmrc .npmrc
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
COPY ./src/dataSet/src ./dataSet

EXPOSE 4000

ENV KAFKA_USERNAME NFTXX3EPFQEB2FXD
ENV KAFKA_PASSWORD OUAiBN61uTD+auJLxH7C8b+EB+bCn1Vp4qI2GUQy4bYUdbql3yKiH3z6tCrUtaXm
ENV KAFKA_SERVER pkc-4r297.europe-west1.gcp.confluent.cloud:9092
ENV KAFKA_NAME file-publisher
ENV KAFKA_TOPIC challenge_topic
ENV DB_NAME cherry-challenge
ENV MONGO_URI mongodb://mongo:27017/cherry-challenge


CMD ["node", "app.js"]

