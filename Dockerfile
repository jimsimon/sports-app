FROM node:14-alpine

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./tsconfig.json ./lerna.json ./
COPY ./packages ./packages

RUN npm ci
RUN npx lerna bootstrap

ENV NODE_ENV=production

EXPOSE 3000

CMD npm run start:api
