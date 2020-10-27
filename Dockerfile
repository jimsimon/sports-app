FROM node:14

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./tsconfig.json ./lerna.json ./
COPY ./packages/api ./packages/api

RUN npm ci
RUN npx lerna bootstrap

ENV NODE_ENV=production

EXPOSE 3000

CMD npm run start:api
