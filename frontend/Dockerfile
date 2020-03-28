FROM node:10.19.0-alpine3.9

RUN mkdir /client
WORKDIR /client
COPY . /client

RUN npm install
EXPOSE 3000

CMD npm start
