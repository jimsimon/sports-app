# sports-app

## Developing

### Linux and OSX (Docker For Mac)
* Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
* Install [Dory](https://github.com/FreedomBen/dory)
* Run `./bin/dev-setup.sh`
* Run `docker-compose up`
* Navigate to `http://sports-app.docker/api`

### OSX (Dinghy)
* Install [Dinghy](https://github.com/codekitchen/dinghy)
* Run `./bin/dev-setup.sh`
* Run `docker-compose up`
* Navigate to `http://sports-app.docker/api`

### Windows (Native)
* Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
* Set up [Dinghy HTTP Proxy](https://github.com/codekitchen/dinghy-http-proxy#windows)
* Run `./bin/dev-setup.sh`
* Run `docker-compose up`
* Navigate to `http://sports-app.docker/api`

### Windows (Windows Subsystem for Linux)
* Install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
* Follow the Linux setup instruction above for inside of a WSL terminal
