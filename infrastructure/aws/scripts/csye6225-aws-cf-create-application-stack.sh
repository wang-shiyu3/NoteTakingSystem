#!/bin/bash

echo "Enter your stack name [ENTER]: "
read stack
echo "Enter your ami id [ENTER]: "
read ImageId
# ami-0d2709b2db7a71faa

aws cloudformation create-stack --stack-name ${stack} --template-body file://../cloudformation/csye6225-cf-application.yaml  --parameters ParameterKey=image,ParameterValue=${ImageId}
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