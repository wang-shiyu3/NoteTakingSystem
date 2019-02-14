sh #!/bin/bash
# delete-aws-vpc

aws ec2 describe-vpcs

echo "Enter your vpc-id and press [ENTER]: "
read vpcId

# rmove vpc with cidr block /16

# Delete subnets
for i in `aws ec2 describe-subnets --filters Name=vpc-id,Values="${vpcId}" | grep subnet- | sed -E 's/^.*(subnet-[a-z0-9]+).*$/\1/'`; do aws ec2 delete-subnet --subnet-id=$i; done

# Detach internet gateways
for i in `aws ec2 describe-internet-gateways --filters Name=attachment.vpc-id,Values="${vpcId}" | grep igw- | sed -E 's/^.*(igw-[a-z0-9]+).*$/\1/'`; do aws ec2 detach-internet-gateway --internet-gateway-id=$i --vpc-id=$vpcId; done

# Delete internet gateways
aws ec2 delete-internet-gateway --internet-gateway-id=$i

# Delete security groups (ignore message about being unable to delete default security group)
#for i in `aws ec2 describe-security-groups --filters Name=vpc-id,Values="${vpcId}" | grep sg- | sed -E 's/^.*(sg-[a-z0-9]+).*$/\1/' | sort | uniq`; do aws ec2 delete-security-group --group-id $i || true; done

# Delete route tables
for i in `aws ec2 describe-route-tables --filters Name=vpc-id,Values="${vpcId}" | grep rtb- | sed -E 's/^.*(rtb-[a-z0-9]+).*$/\1/'`; do aws ec2 delete-route-table --route-table-id=$i; done

# Delete the VPC
aws ec2 delete-vpc --vpc-id ${vpcId}


