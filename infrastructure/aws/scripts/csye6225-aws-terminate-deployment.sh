#!/usr/bin/env bash
echo "Enter deploymentId and press [ENTER]: "
read deploymentId

aws deploy stop-deployment --deployment-id "$deploymentId"


