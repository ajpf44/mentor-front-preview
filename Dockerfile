FROM node:22.14-alpine3.21

WORKDIR /front

COPY package.json ./

RUN npm install

COPY public ./public
COPY src ./src
COPY index.html ./

CMD ["npm", "run", "dev"]


