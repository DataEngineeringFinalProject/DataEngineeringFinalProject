### STAGE 1: Build ###
FROM node:latest as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install node-fetch@2.6.1

COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html

EXPOSE 80
