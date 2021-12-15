FROM node:lts as dependencies
WORKDIR /challenge-platform
COPY package.json package-lock.json ./
RUN npm install 

FROM node:lts as builder
WORKDIR /challenge-platform
COPY . .
COPY --from=dependencies /challenge-platform/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /challenge-platform
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /challenge-platform/next.config.js ./
COPY --from=builder /challenge-platform/public ./public
COPY --from=builder /challenge-platform/.next ./.next
COPY --from=builder /challenge-platform/node_modules ./node_modules
COPY --from=builder /challenge-platform/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
