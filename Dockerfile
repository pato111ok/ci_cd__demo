FROM node:18.5.0

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g @nestjs/cli@9.3.0

RUN npm install --legacy-peer-deps

COPY .. .

RUN npm run build
CMD ["npm", "run", "start:prod"]
# CMD ["npm", "run", "start:dev"]
