#!/bin/bash
# create-aws-vpc

# variables used in script:

# echo "\nPlease select number to run task.
# 1: Create a Virtual Private Cloud (VPC)
# 2: Create subnets in your VPC.
# 3: Create Internet Gateway resource
# 4: Attach the Internet Gateway to the created VPC.
# 5: Create a public Route Table. Attach all subnets created above to the route table.
# "



echo "Enter vpc-cidr-block and press [ENTER]: "
read vpcCidrBlock

echo "Creating VPC..."
# create vpc with cidr block /16
aws_response=$(aws ec2 create-vpc \
 --cidr-block "$vpcCidrBlock" \
 --output json)
echo $aws_response

echo "Enter the vpc-id shown above to store it and press [ENTER]: "
read vpcID

# create subnet for vpc
# Show availability zones
aws ec2 describe-availability-zones

create_subnet () {
  echo "Enter availability-zone and press [ENTER]: "
  read availabilityZone
  echo "Enter sub-net-cidr-block and press [ENTER]: "
  read subNetCidrBlock
  aws ec2 create-subnet \
    --cidr-block "$subNetCidrBlock" \
    --availability-zone "$availabilityZone" \
    --vpc-id "$vpcID" \
    --output json
}

declare -a arr=("first" "second" "third")
for i in "${arr[@]}"
do
   echo "Create $i subnet"
   create_subnet
done

echo "Creating internet-gateway ..."
aws ec2 create-internet-gateway
echo "Enter the gateway-id shown above to store it and press [ENTER]: "
read internetGatewayId

aws ec2 attach-internet-gateway --vpc-id $vpcID --internet-gateway-id $internetGatewayId

echo "Creating route-table ..."
aws ec2 create-route-table --vpc-id $vpcID
echo "Enter the RouteTableId shown above to store it and press [ENTER]: "
read routeTableId

aws ec2 create-route --route-table-id $routeTableId --destination-cidr-block 0.0.0.0/0 --gateway-id $internetGatewayId


echo "\n"
echo "All set"
exit 0
