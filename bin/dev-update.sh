#!/usr/bin/env bash

set -e

docker-compose build --pull
docker-compose run --rm api npm install --ignore-scripts
docker-compose run --rm api bash -c 'cd packages/api && node ../../node_modules/.bin/prisma-multi-tenant generate'
docker-compose run --rm api bash -c 'cd packages/api && node ../../node_modules/.bin/prisma-multi-tenant migrate up'
