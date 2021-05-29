FROM node

ENV NODE_ENV=production

WORKDIR /tprinter

COPY . .

RUN npm install --production

CMD [ "node index.js" ]