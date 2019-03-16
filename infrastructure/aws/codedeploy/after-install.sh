#!/bin/bash
pwd
cd /home/centos/www/webapp
sudo pm2 stop
sudo npm install
sudo mv /home/centos/env .env

