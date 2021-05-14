FROM node:15.11.0-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn --only=development

COPY . .

EXPOSE 3000

RUN yarn run build
