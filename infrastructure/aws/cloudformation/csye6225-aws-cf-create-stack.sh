#!/bin/bash

echo "Enter your stack name [ENTER]: "
read stack
aws cloudformation create-stack --stack-name ${stack} --template-body file://csye6225-cf-networking.yaml

#spin[0]="Loading."
#spin[1]="Loading.."
#spin[2]="Loading..."
#spin[3]="Loading"
#while :;do
#          for i in "${spin[@]}"
#          do
#                echo -ne "\b$i"
#                sleep 0.1
#          done
#        done &
#trap "kill $!" EXIT  #Die with parent if we die prematurely
i=1
sp="/-\|"
while true
do
  printf "\b${sp:i++%${#sp}:1}"
done &
trap "kill $!" EXIT
aws cloudformation wait stack-create-complete --stack-name ${stack}
kill $! && trap " " EXIT
echo ' '
echo "Stack ${stack} was created successfully!"
