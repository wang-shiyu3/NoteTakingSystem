#!/usr/bin/env bash

#Create CI-CD Stack
echo "Enter CICD Stack Name:"
read STACK_NAME
echo "Enter S3 bucket arn:"
read ARN
echo "Enter your s3 bucket's arn of storing note's attachemts [ENTER]: "
read S3Attachments

#ARN='arn:aws:s3:::code-deploy.csye6225-spring2019-wangshiyu3.me'
#S3Attachments='arn:aws:s3:::csye6225-spring2019-wangshiyu3.me.csye6225.com'

export ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
export REGION=us-east-1
export APPLICATION_NAME=csye6225-webapp
export RESOURCE1="arn:aws:codedeploy:"$REGION":"$ACCOUNT_ID":application:"$APPLICATION_NAME
export RESOURCE2="arn:aws:codedeploy:"$REGION":"$ACCOUNT_ID":deploymentconfig:CodeDeployDefault.OneAtATime"
export RESOURCE3="arn:aws:codedeploy:"$REGION":"$ACCOUNT_ID":deploymentconfig:CodeDeployDefault.HalfAtATime"
export RESOURCE4="arn:aws:codedeploy:"$REGION":"$ACCOUNT_ID":deploymentconfig:CodeDeployDefault.AllAtOnce"


aws cloudformation create-stack --stack-name $STACK_NAME --template-body file://../cloudformation/csye6225-cf-cicd.yaml --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=S3Attachments,ParameterValue=$S3Attachments ParameterKey=RESOURCE1,ParameterValue=$RESOURCE1 ParameterKey=RESOURCE2,ParameterValue=$RESOURCE2 ParameterKey=RESOURCE3,ParameterValue=$RESOURCE3 ParameterKey=RESOURCE4,ParameterValue=$RESOURCE4 ParameterKey=ARN,ParameterValue=$ARN

i=1
sp="/-\|"
while true
do
  printf "\b${sp:i++%${#sp}:1}"
done &
trap "kill $!" EXIT
aws cloudformation wait stack-create-complete --stack-name ${STACK_NAME}
if [ $? -eq 0 ];then
  echo "Stack ${STACK_NAME} was created successfully!"
else
  echo "Stack ${STACK_NAME} create failed!"
fi

kill $! && trap " " EXIT