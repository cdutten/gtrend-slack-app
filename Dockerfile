# specify the node base image with your desired version node:<version>
FROM node:12.4
# replace this with your application's default port
EXPOSE 8888

RUN npm install -g serverless
