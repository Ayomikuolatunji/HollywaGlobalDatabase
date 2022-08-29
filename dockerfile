FROM node:latest

WORKDIR /Desktop/EcommerceProjects/mysql-ecommerce-database

COPY package.json ./

RUN npm install 

COPY . .

EXPOSE 8080
CMD []
