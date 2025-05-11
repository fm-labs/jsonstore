FROM node:22-alpine3.21 AS build-stage

WORKDIR /app

COPY ./package.json ./yarn.lock ./lerna.json ./
COPY ./packages ./packages/

RUN --mount=type=cache,target=/root/.cache \
    yarn config set cache-folder /root/.cache/yarn \
    && mkdir -p /root/.cache/yarn \
    && yarn install --frozen-lockfile --network-timeout 600000 \
    && yarn run build

#RUN yarn install --no-dev --frozen-lockfile --network-timeout 600000 && \
#    yarn run build

FROM node:22-alpine3.21 AS final-stage

COPY --from=build-stage /app/node_modules/ /app/node_modules/
COPY --from=build-stage /app/packages/server/dist/ /app/server/dist/
COPY --from=build-stage /app/packages/server/node_modules/ /app/server/node_modules/

# Setup non-root user
RUN addgroup -S app && adduser -S app -G app \
    && chown -R app:app /app

WORKDIR /app/
ENV NODE_ENV=production
ENV DATA_DIR=/app/data
ENV SERVER_PORT=3030
CMD ["node", "/app/server/dist/index.js"]
EXPOSE 3030
