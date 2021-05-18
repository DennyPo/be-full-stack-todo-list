FROM node:12-alpine

EXPOSE 3001

WORKDIR /backend

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

CMD ["yarn", "start:dev"]
