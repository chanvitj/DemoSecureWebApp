FROM node:21.6-alpine3.19
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY app .
RUN npm install
EXPOSE 8000
CMD [ "npm", "start"]
