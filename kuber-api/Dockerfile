# Development stage
FROM node:20-alpine AS development

WORKDIR /app

RUN npm i -D nodemon

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]


# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm i --only=production

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
