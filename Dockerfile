FROM node:13-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json /app/


RUN apk --no-cache add --virtual builds-deps build-base python3

RUN npm install

COPY ./src /app

EXPOSE 3000

CMD ["npm", "run", "start"]
