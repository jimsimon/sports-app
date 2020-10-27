#!/usr/bin/env bash

set -e

docker-compose build --pull
docker-compose run --rm api npm install
docker-compose run --rm api npx lerna bootstrap
docker-compose run --rm api bash -c 'cd packages/api && npx prisma-multi-tenant generate'
docker-compose run --rm api bash -c 'cd packages/api && npx prisma-multi-tenant migrate up'
