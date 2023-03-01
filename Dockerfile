FROM node:latest

RUN mkdir -p /app
ENV PORT 3000

WORKDIR /app

COPY . /app

RUN npm install


EXPOSE 3000

# RUN npm test and check if the tests are passing

RUN npx jest

ENTRYPOINT ["npx", "http-server","./" ,"-p", "3000"]
