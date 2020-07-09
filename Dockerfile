# Install Stage
FROM node:12-alpine AS installer
WORKDIR /srv

COPY package.json yarn.lock ./

RUN yarn --production

COPY . .

# Builder Stage
FROM node:12-alpine AS builder
WORKDIR /srv

COPY --from=installer /srv/. .

RUN yarn && yarn build:server && yarn build:client

# Run Stage
# use node server to host both ssr and statics
FROM  node:12-alpine

WORKDIR /srv

# Copy server side code without dev dependencies from installer stage
COPY --from=installer /srv/. .
# Copy static files from builder stage to be service by node server
COPY --from=builder /srv/client/.next ./client/.next
COPY --from=builder /srv/server/dist ./server/dist

# nextjs requires `NODE_HODGEPODGE_ENV=production` for backend
ENV PORT=3000 \
    PM2_SCRIPT=/srv/server/dist/index.js \
    NODE_HODGEPODGE_ENV=production

ENTRYPOINT ["/base/scripts/start.sh"]
