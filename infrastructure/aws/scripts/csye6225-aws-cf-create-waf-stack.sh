#!/bin/bash

# echo "Enter your stack name [ENTER]: "
# read stack
# echo "Enter your auto scaling application name [ENTER]: "
# read ExportStackName
echo "Enter your stack name [ENTER]: "
read stack
echo "Enter your application stack name [ENTER]: "
read ExportStackName
echo "Enter the IP address you want to put into blacklist [ENTER]: "
read IPV4

aws cloudformation create-stack --stack-name ${stack}\
  --template-body file://../cloudformation/csye6225-cf-waf.yaml\
  --parameters ParameterKey=ExportStackName,ParameterValue=${ExportStackName}\
               ParameterKey=IPV4,ParameterValue=${IPV4}\



i=1
sp="/-\|"
while true
do
  printf "\b${sp:i++%${#sp}:1}"
done &
trap "kill $!" EXIT
aws cloudformation wait stack-create-complete --stack-name ${stack}
if [ $? -eq 0 ];then
  echo "Stack ${stack} was created successfully!"
else
  echo "Stack ${stack} create failed!"
fi

kill $! && trap " " EXIT