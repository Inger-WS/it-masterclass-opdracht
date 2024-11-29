provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "ssh" {
  name        = "ssh"
  description = "Allow SSH inbound traffic"

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
  key_name      = "WebKey"  # Vervang dit met de naam van je key pair
  security_groups = [aws_security_group.ssh.name]
  
  #vpc_security_group_ids = [aws_security_group.ssh.id]

  tags = {
    Name = "frontend-instance"
  }
}

resource "aws_instance" "backend" {
  ami           = "ami-0866a3c8686eaeeba"
  instance_type = "t3.medium"
  key_name      = "WebKey"  # Vervang dit met de naam van je key pair
  security_groups = [aws_security_group.ssh.name]
  
  #vpc_security_group_ids = [aws_security_group.ssh.id]

  tags = {
    Name = "backend-instance"
  }
}

resource "aws_instance" "database" {
  ami           = "ami-0866a3c8686eaeeba"
  instance_type = "t3.medium"
  key_name      = "WebKey"  # Vervang dit met de naam van je key pair
  security_groups = [aws_security_group.ssh.name]
  
  #vpc_security_group_ids = [aws_security_group.ssh.id]

  tags = {
    Name = "database-instance"
  }
}

output "frontend_public_ip" {
  value = aws_instance.frontend.public_ip
}

output "backend_public_ip" {
  value = aws_instance.backend.public_ip
}

output "database_public_ip" {
  value = aws_instance.database.public_ip
}