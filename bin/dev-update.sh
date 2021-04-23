#!/usr/bin/env bash

set -e

docker-compose build --pull
docker-compose run --rm api npm install
docker-compose run --rm api npx lerna bootstrap
docker-compose run --rm api sh -c 'cd packages/api && npx prisma generate'
docker-compose run --rm api sh -c 'cd packages/api && npx pmt migrate deploy'
