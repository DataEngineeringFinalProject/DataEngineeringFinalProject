FROM node:latest
WORKDIR /backend
COPY * ./
RUN npm install 
RUN npm install node-fetch@2.6.1
RUN npm i body-parser --save

EXPOSE 3000
CMD ["node", "backend.js"]