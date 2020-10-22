#!/usr/bin/env bash

set -e

docker-compose build --pull
docker-compose run --rm api npm install --ignore-scripts
docker-compose run --rm api bash -c 'npx prisma-multi-tenant generate --schema=packages/api/prisma/schema.prisma'
docker-compose run --rm api bash -c 'npx prisma-multi-tenant new management --url="postgresql://postgres@db:5432/sportsapp?schema=public" --schema=packages/api/prisma/schema.prisma'
docker-compose run --rm api bash -c 'npx prisma-multi-tenant new --name="ROOT" --url="postgresql://postgres@db:5432/sportsapp?schema=ROOT" --schema=packages/api/prisma/schema.prisma'
