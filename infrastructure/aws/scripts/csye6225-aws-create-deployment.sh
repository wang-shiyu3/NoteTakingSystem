#!/usr/bin/env bash
echo "Enter S3 bucket name and press [ENTER]:"
read NAME
echo "All revisions in the bucket you inputted:"
aws s3 ls s3://"$NAME"
echo "Enter selected Revision and press [ENTER]:"
read FNAME
echo "Enter bundle type (zip, tar or tgz) of selected Revision and press [ENTER]:"
read BTYPE

aws deploy create-deployment\
  --auto-rollback-configuration enabled=true,events=DEPLOYMENT_FAILURE\
  --application-name csye6225-webapp\
  --deployment-config-name CodeDeployDefault.OneAtATime\
  --deployment-group-name csye6225-webapp-deployment\
  --s3-location bucket="$NAME",bundleType="$BTYPE",key="$FNAME"

echo "Enter deploymentId and press [ENTER]: "
read deploymentId
echo "Creating deployment ${deploymentId} ......"

i=1
sp="/-\|"
while true
do
  printf "\b${sp:i++%${#sp}:1}"
done &
trap "kill $!" EXIT
aws deploy wait deployment-successful --deployment-id "$deploymentId"
if [ $? -eq 0 ];then
  echo "Deployment ${deploymentId} was created successfully!"
else
  echo "Deployment ${deploymentId} create failed!"
fi

kill $! && trap " " EXIT