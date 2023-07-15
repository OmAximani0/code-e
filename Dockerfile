FROM node:16-alpine

WORKDIR /app

RUN apk update && apk upgrade && apk add python3

COPY package*.json /app/

RUN npm install

ENV PORT=5000

EXPOSE 5000

COPY ./ /app/

CMD [ "npm", "start" ]
