# !/bin/bash

up () {
    echo Starting redis && docker-compose up -d cache &>/dev/null
    echo Installing dependencies && npm install &>/dev/null
    echo Installing back dependencies && npm --prefix back install &>/dev/null
    echo Installing front Dependencies && npm --prefix front install &>/dev/null
    npm --prefix back test
    npm --prefix front test
    pm2 start ecosystem.config.js
}

open_apps () {
    { 
        open http://localhost:9000/ &&
        open http://localhost:9000/ &&
        open http://localhost:3000/docs/
    } || { 
        echo The browser can not be opened.
    }
}

notify () {
    echo "##################################################################################\n"
    echo Client running on http://localhost:9000/
    echo API running on http://localhost:3000/ and see docs on http://localhost:3000/docs/
    echo Server coverage running on http://localhost:8080/
    echo Client coverage running on http://localhost:8081/
    echo "Enjoy ;)"
    echo "\n##################################################################################"
}

up
sleep 3
open_apps
notify