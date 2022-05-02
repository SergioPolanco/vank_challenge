FROM node:16.15.0-alpine3.15 AS dev

WORKDIR /usr/src/app

RUN apk add --no-cache bash

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

COPY init.sh ./
RUN chmod +x ./init.sh

CMD ["bash", "init.sh"]