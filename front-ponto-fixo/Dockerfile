FROM node:14 as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/* /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
