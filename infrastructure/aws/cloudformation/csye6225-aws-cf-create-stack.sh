#!/bin/bash

aws cloudformation create-stack --stack-name csye6225-vpc --template-body file://csye6225-cf-networking.yaml