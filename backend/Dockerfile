FROM node:latest
WORKDIR /backend
COPY * ./
RUN npm install 
RUN $ npm install node-fetch@2.0
EXPOSE 3000
CMD ["node", "backend.js"]