FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install && npm install -g @quasar/cli
COPY . .
RUN quasar build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
