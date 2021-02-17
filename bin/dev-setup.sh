#!/usr/bin/env bash

set -e

docker-compose run --rm api npm install
docker-compose run --rm api npx lerna bootstrap
docker-compose run --rm api bash -c 'cd packages/api && npx pmt init'
docker-compose run --rm api bash -c 'cd packages/api && npx pmt new tenant ROOT local'
