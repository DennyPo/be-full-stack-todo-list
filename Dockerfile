FROM node:12-alpine

EXPOSE 3001

WORKDIR /backend

ENV DB_NAME=mydb
ENV DB_HOST=db
ENV DB_USER=admin
ENV DB_PASSWORD="111"


ENV SALT_ROUNDS=10
ENV ACCESS_TOKEN_SECRET_KEY=accessSecretKey
ENV REFRESH_TOKEN_SECRET_KEY=refreshSecretKey

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

CMD ["yarn", "start:dev"]
