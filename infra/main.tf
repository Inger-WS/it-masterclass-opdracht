provider "aws" {
  region = "us-east-1"
}

# Setup VPC


resource "aws_vpc" "main" {

  cidr_block = "10.0.0.0/16"

}

# Setup Subnet


resource "aws_subnet" "public" {

  vpc_id     = aws_vpc.main.id

  cidr_block = "10.0.1.0/24"

}


resource "aws_security_group" "ssh" {
  name        = "ssh"
  description = "Allow SSH inbound traffic"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "frontend" {
  ami           = "ami-0866a3c8686eaeeba"
  instance_type = "t3.medium"
  key_name      = "WebKey2"  # Vervang dit met de naam van je key pair
  # security_groups = [aws_security_group.ssh.id]
  associate_public_ip_address = true
  subnet_id              = aws_subnet.public.id
  
  
  #vpc_security_group_ids = [aws_security_group.ssh.id]

  tags = {
    Name = "frontend-instance"
  }
}

resource "aws_instance" "backend" {
  ami           = "ami-0866a3c8686eaeeba"
  instance_type = "t3.medium"
  key_name      = "WebKey2"  # Vervang dit met de naam van je key pair
  # security_groups = [aws_security_group.ssh.id]
  subnet_id              = aws_subnet.public.id
  
  #vpc_security_group_ids = [aws_security_group.ssh.id]

  tags = {
    Name = "backend-instance"
  }
}

resource "aws_instance" "database" {
  ami           = "ami-0866a3c8686eaeeba"
  instance_type = "t3.medium"
  key_name      = "WebKey2"  # Vervang dit met de naam van je key pair
  # security_groups = [aws_security_group.ssh.id]
  subnet_id              = aws_subnet.public.id
  
  #vpc_security_group_ids = [aws_security_group.ssh.id]

  tags = {
    Name = "database-instance"
  }
}

# Setup cloudwatch log group for EC2 


resource "aws_cloudwatch_log_group" "ec2_log_group" {

  name = "/aws/ec2/instances"

}


output "frontend_public_ip" {
  value = aws_instance.frontend.public_ip
}

output "frontend_private_ip" {
  value = aws_instance.frontend.private_ip  
}

output "backend_public_ip" {
  value = aws_instance.backend.public_ip
}

output "database_public_ip" {
  value = aws_instance.database.public_ip
}

output "backend_private_ip" {
  value = aws_instance.backend.private_ip
}

output "database_private_ip" {
  value = aws_instance.database.private_ip
}