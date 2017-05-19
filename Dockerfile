FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g serve

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

#ENV REACT_APP_BOOKIE_SERVER_URL /api

RUN npm run build

EXPOSE 3001

CMD [ "serve", "-s", "build", "-p", "3001" ]
