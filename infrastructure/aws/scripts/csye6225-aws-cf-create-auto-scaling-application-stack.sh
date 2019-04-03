#!/bin/bash

echo "Enter your stack name [ENTER]: "
read stack
echo "Enter your ami id [ENTER]: "
read ImageId
echo "Enter your network stack name [ENTER]: "
read ExportStackName
echo "Enter your s3 bucket's name of storing note's attachemts [ENTER]: "
read S3Attachments
echo "SNS arn: "
read SNSARN
echo "Enter DBUsername: "
read DBUsername
echo "Enter DBPassword: "
read DBPassword
echo "Enter DomainName: "
read DomainName
echo "Enter the ARN of Certificate: "
read CertARN


aws cloudformation create-stack --stack-name ${stack}\
 --template-body file://../cloudformation/csye6225-cf-auto-scaling-application.yaml\
 --parameters ParameterKey=SNSARN,ParameterValue=${SNSARN}\
  ParameterKey=S3Attachments,ParameterValue=${S3Attachments}\
  ParameterKey=image,ParameterValue=${ImageId}\
  ParameterKey=ExportStackName,ParameterValue=${ExportStackName}\
  ParameterKey=DBUsername,ParameterValue=${DBUsername}\
  ParameterKey=DBPassword,ParameterValue=${DBPassword}\
  ParameterKey=DomainName,ParameterValue=${DomainName}\
  ParameterKey=CertARN,ParameterValue=${CertARN}

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