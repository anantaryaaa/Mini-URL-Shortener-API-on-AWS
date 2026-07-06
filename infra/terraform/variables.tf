variable "aws_region" {
  type        = string
  description = "AWS region for all resources"
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Project name prefix"
  default     = "mini-url-shortener"
}

variable "vpc_id" {
  type        = string
  description = "Existing VPC ID to deploy into"
}

variable "public_subnet_ids" {
  type        = list(string)
  description = "Public subnet IDs for ALB"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "Private subnet IDs for ECS tasks"
}

variable "container_image" {
  type        = string
  description = "Container image URI"
}

variable "container_port" {
  type        = number
  description = "Container port"
  default     = 3000
}

variable "desired_count" {
  type        = number
  description = "Desired ECS task count"
  default     = 1
}
