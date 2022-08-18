FROM node

WORKDIR /usr/src/app

COPY . .
RUN npm i
RUN npx prisma generate
