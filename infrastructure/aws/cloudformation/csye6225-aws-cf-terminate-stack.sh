#!/bin/bash

echo "Enter your stack name [ENTER]: "
read stack
aws cloudformation delete-stack --stack-name ${stack}