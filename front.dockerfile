FROM node:9.4.0-slim

LABEL mantainer: Maurice Domínguez <maurice.ronet.dominguez@gmail.com>

WORKDIR /app

ADD front .

RUN npm install

EXPOSE 9000

CMD [ "npm", "start" ]