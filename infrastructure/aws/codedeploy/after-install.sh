#!/bin/bash
cd /home/centos/www/webapp
sudo mv ~/env .env
sudo pm2 stop
sudo npm install
