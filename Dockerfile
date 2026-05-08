FROM node:18-alpine AS build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM nginx:alpine
COPY --from=build-deps /usr/src/app/build /etc/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
