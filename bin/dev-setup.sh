#!/usr/bin/env bash

set -e

docker-compose run --rm api npm install --ignore-scripts
docker-compose run --rm api npm run bootstrap
docker-compose run --rm api bash -c 'cd packages/api && npx prisma-multi-tenant generate'
docker-compose run --rm api bash -c 'cd packages/api && npx prisma-multi-tenant new management --url="postgresql://postgres@db:5432/sportsapp?schema=public"'
docker-compose run --rm api bash -c 'cd packages/api && npx prisma-multi-tenant new --name="ROOT" --url="postgresql://postgres@db:5432/sportsapp?schema=ROOT"'
