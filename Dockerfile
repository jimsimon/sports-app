FROM node:latest

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./tsconfig.json ./
COPY ./packages/api ./packages/api

RUN npm ci

ENV NODE_ENV=production

EXPOSE 3000

CMD npm run start:api
