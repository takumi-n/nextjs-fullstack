FROM node:16.13.2-slim

WORKDIR /app
COPY . /app
RUN apt-get update\
 && apt-get install -y libssl-dev git openssl
RUN yarn install
RUN yarn run prisma generate

CMD [ "yarn", "run", "dev"]