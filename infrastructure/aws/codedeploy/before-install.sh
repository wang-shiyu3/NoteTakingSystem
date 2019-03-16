#!/bin/bash

# update the permission and ownership of WAR file in the tomcat webapps
pwd
cd /home/centos/
rm -rf www
mkdir www
npm cache clean -f