FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./ 
COPY . .

RUN npm install

ENTRYPOINT  npm run start 