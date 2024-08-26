FROM node:22-alpine AS build-fe
# FROM node:22-alpine as build-fe
ENV NODE_ENV=production
WORKDIR /build

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


FROM alpine:latest AS pocketbase

ARG PB_VERSION=0.22.10

RUN apk add --no-cache unzip ca-certificates
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# uncomment to copy the local pb_migrations dir into the image
# COPY ./pb_migrations /pb/pb_migrations

# uncomment to copy the local pb_hooks dir into the image


# EXPOSE 8080

# start PocketBase
# CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]

FROM alpine:latest
WORKDIR /app

COPY --from=pocketbase /pb/pocketbase .
COPY --from=build-fe /build/dist ./pb_public

COPY ./pocketbase/pb_migrations .
# COPY ./pocketbase/pb_hooks /pb/pb_hooks

EXPOSE 8080
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8080"]