#!/bin/bash

echo "Enter your stack name [ENTER]: "
read stack
aws cloudformation create-stack --stack-name ${stack} --template-body file://csye6225-cf-networking.yaml