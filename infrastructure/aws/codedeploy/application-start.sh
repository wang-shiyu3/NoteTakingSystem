#!/bin/bash
pwd
cd /home/centos/www/webapp
sudo npm install pm2 -g
sudo pm2 start index.js -f
sudo systemctl start amazon-cloudwatch-agent