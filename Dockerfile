#########################
## nodejs-hexagonal-v2 ##
##   BASE CONTAINER    ##
#########################
FROM node:16-alpine

RUN mkdir /app
WORKDIR /app

ADD package.json /app
ADD yarn.lock /app
RUN yarn install --dev

ADD . /app

RUN yarn nx affected:build --all --skip-nx-cache --prod
RUN cp yarn.lock ./dist/apps/http-api
RUN cp yarn.lock ./dist/apps/todo-lambda
