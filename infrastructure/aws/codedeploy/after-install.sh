#!/bin/bash
pwd
cd /home/centos/www/webapp
sudo mv ~/env .env
sudo pm2 stop
sudo npm install
