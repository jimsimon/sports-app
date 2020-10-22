FROM node:15

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./tsconfig.json ./
COPY ./packages/api ./packages/api

RUN npm install -g npm@7
RUN npm install

ENV NODE_ENV=production

EXPOSE 3000

CMD npm run start:api
