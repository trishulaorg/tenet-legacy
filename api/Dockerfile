FROM node:14

MAINTAINER minamorl

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "api" ]
