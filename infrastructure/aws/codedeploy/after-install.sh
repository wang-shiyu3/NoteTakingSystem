#!/bin/bash
pwd
cd /home/centos/www/webapp
sudo pm2 stop all
sudo pm2 delete all
sudo npm install
sudo mv /home/centos/env .env

