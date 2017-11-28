FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./src/api/package.json /usr/src/app/
RUN npm install --production
COPY ./dist /usr/src/app
CMD [ "node", "server.js"]
