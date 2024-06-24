FROM node:21.6-alpine3.19
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN mkdir public
COPY app .
RUN npm install
VOLUME /opt/app/public
EXPOSE 8000
CMD [ "npm", "start"]
