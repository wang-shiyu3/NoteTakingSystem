#!/bin/bash

cd /home/centos/www
sudo npm install pm2 -g
sudo pm2 start index.js -f
