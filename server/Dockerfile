FROM node:18.20.6

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

EXPOSE 4000
CMD ["npm", "start"]
