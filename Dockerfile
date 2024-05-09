FROM node:latest
LABEL authors="nergan"

RUN apt-get update
RUN apt-get install -y npm

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

WORKDIR /app/client
RUN npm install .
RUN npm run build

ENV NODE_ENV=production
WORKDIR /app
EXPOSE 8000
CMD ["node", "dist/index.js"]