FROM node:20.14.0-alpine

WORKDIR /app

COPY ./package*.json .

RUN npm install --global @nestjs/cli@10.3.1

#EXPOSE 5000
#
#RUN npm run start:dev