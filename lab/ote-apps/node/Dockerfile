FROM node:20

WORKDIR /app

COPY package*.json ./
COPY *.ts ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

ENV HOST=0.0.0.0 PORT=8080

CMD ["npx", "tsx", "--import", "./instrumentation.ts", "app.ts"]