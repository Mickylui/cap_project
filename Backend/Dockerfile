FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD yarn install && \ 
    yarn knex migrate:latest &&\
    yarn knex seed:run --specific=01-create-users-and-admin.ts &&\
    yarn knex seed:run --specific=02-create-ecom-related.ts &&\
    yarn knex seed:run --specific=03-create-socialplatform.ts &&\
    node index.js 