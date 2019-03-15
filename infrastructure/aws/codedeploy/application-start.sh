#!/bin/bash

cd /home/centos/ec2-user/webapp
sudo npm install pm2 -g
sudo npm i -f
sudo pm2 delete index

cd /home/centos/ec2-user/webapp/
# echo -e "$hostname\nprofile=dev\n$aws_bucket_name" > .env
sudo pm2 start index.js -f
