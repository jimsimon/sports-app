#!/usr/bin/env bash

set -e

echo 'Installing dependencies...'
docker-compose run --rm api npm install

echo 'Bootstrapping...'
docker-compose run --rm api npx lerna bootstrap

echo 'Generating prisma client...'
docker-compose run --rm api sh -c 'cd packages/api && npx prisma generate'

echo 'Building PMT...'
docker-compose run --rm api npx lerna run --scope=prisma-multi-tenant --scope=@prisma-multi-tenant/client build

echo 'Initializing PMT...'
docker-compose run --rm api sh -c 'cd packages/api && npx pmt init'

echo 'Creating ROOT tenant...'
docker-compose run --rm api sh -c 'cd packages/api && npx pmt new tenant ROOT local'

echo 'Migrating tenants...'
docker-compose run --rm api sh -c 'cd packages/api && npx pmt migrate deploy'

echo 'Setup complete!'
