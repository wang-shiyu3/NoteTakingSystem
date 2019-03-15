#!/bin/bash

cd /home/centos/www/webapp
sudo npm install pm2 -g
cd /home/centos/www/webapp
sudo pm2 start index.js -f
