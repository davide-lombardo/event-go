FROM node:18.20.6

WORKDIR /app

COPY . .

RUN npm --version

RUN npm ci

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
