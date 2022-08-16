FROM node:14

MAINTAINER minamorl

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 8080 3000
