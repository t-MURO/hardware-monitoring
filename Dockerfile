FROM node:20-alpine AS build

WORKDIR /app

COPY client/package.json ./client/
COPY server/package.json ./server/
COPY shared ./shared

RUN npm --prefix client install
RUN npm --prefix server install

COPY client ./client
COPY server ./server

RUN npm --prefix client run build
RUN npm --prefix server run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/client/dist ./client/dist
COPY --from=build /app/server/package.json ./server/package.json
COPY --from=build /app/server/package-lock.json ./server/package-lock.json

RUN npm --prefix server ci --omit=dev

EXPOSE 12332

CMD ["npm", "--prefix", "server", "run", "start"]
