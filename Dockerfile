FROM node:10
WORKDIR /usr/src/app
COPY amistee-fe/ ./my-app/
RUN cd my-app && npm install @angular/cli && npm install && npm run build

FROM nginx:1.13.9-alpine
COPY ./my-app/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
