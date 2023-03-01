FROM node:latest

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 8081

CMD ["http-server", "-p", "8081", "-a", "0.0.0.0", "dist"] && tail -f /dev/null
