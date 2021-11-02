FROM nodejs-hexagonal-v2 as BASE

FROM node:16-alpine

RUN mkdir /app
WORKDIR /app

COPY --from=BASE /app/dist/apps/http-api .

RUN yarn install --prod

EXPOSE 3000

CMD ["node", "main.js"]
