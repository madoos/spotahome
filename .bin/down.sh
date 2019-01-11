# !/bin/bash

down () {
    docker-compose down
    pm2 stop all
    pm2 delete all
}

down