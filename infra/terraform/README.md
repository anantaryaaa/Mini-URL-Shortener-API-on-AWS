# Terraform

This stack is designed for AWS ECS Fargate + ECR + ALB and assumes you already have:

- a VPC
- public subnets for the ALB
- private subnets for ECS tasks

## Inputs

- `aws_region`
- `project_name`
- `vpc_id`
- `public_subnet_ids`
- `private_subnet_ids`
- `container_image`

## Typical flow

1. Build and push image to ECR.
2. Pass the image URI into Terraform as `container_image`.
3. Run `terraform init`, `terraform fmt`, `terraform validate`, `terraform plan`.
4. Apply only after review/approval.
