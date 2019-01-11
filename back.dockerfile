FROM node:9.4.0-slim

LABEL mantainer: Maurice Domínguez <maurice.ronet.dominguez@gmail.com>

WORKDIR /app

ADD back .

RUN npm install --production

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "npm", "start" ]