#!/usr/bin/env bash
echo "Enter your stack name [ENTER]: "
read stack
echo "Enter your s3 bucket's name of CodeDeploy [ENTER]: "
read S3bucketName
echo "Enter Domain name [ENTER]: "
read DomainName

aws cloudformation create-stack --stack-name ${stack} --template-body file://../cloudformation/csye6225-cf-lambda.yaml  --parameters ParameterKey=Email,ParameterValue=${Email} ParameterKey=S3bucketName,ParameterValue=${S3bucketName} ParameterKey=DomainName,ParameterValue=${DomainName} --capabilities CAPABILITY_NAMED_IAM

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