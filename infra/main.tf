provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "allow_http_https_ssh" {
  name        = "allow_http_https_ssh"
  description = "Allow HTTP, HTTPS, and SSH inbound traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
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

resource "aws_instance" "frontendAK" {
  ami           = "ami-0866a3c8686eaeeba"
  instance_type = "t3.medium"
  key_name      = "WebKey2"  # Vervang dit met de naam van je key pair
  security_groups = [aws_security_group.allow_http_https_ssh.name]

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y git
              cd /var/www/html
              git clone --branch front-end https://github.com/Inger-WS/it-masterclass-opdracht.git .
              EOF

  tags = {
    Name = "frontend-instanceAK"
  }
}

resource "aws_instance" "backendAK" {
  ami           = "ami-0866a3c8686eaeeba"
  instance_type = "t3.medium"
  key_name      = "WebKey2"  # Vervang dit met de naam van je key pair
  security_groups = [aws_security_group.allow_http_https_ssh.name]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y nodejs npm git nginx
              cd /home/ubuntu
              git clone --branch back-end https://github.com/Inger-WS/it-masterclass-opdracht.git
              cd it-masterclass-opdracht
              npm install
              npm install express  # Zorg ervoor dat express wordt geïnstalleerd
              # Controleer of express correct is geïnstalleerd
              if [ -d "node_modules/express" ]; then
                echo "Express is geïnstalleerd"
              else
                echo "Express installatie is mislukt"
                exit 1
              fi
              # Configureer Nginx als reverse proxy
              cat <<EOT > /etc/nginx/sites-available/default
              server {
                  listen 80;
                  server_name localhost;

                  location / {
                      proxy_pass http://127.0.0.1:3000;
                      proxy_http_version 1.1;
                      proxy_set_header Upgrade \$http_upgrade;
                      proxy_set_header Connection 'upgrade';
                      proxy_set_header Host \$host;
                      proxy_cache_bypass \$http_upgrade;
                  }
              }
              EOT
              systemctl restart nginx
              npm start
              EOF

  tags = {
    Name = "backend-instanceAK"
  }
}

# resource "aws_instance" "databaseAK" {
#   ami           = "ami-0866a3c8686eaeeba"
#   instance_type = "t3.medium"
#   key_name      = "WebKey2"  # Vervang dit met de naam van je key pair
#   security_groups = [aws_security_group.allow_http_https_ssh.name]

#   user_data = <<-EOF
#               #!/bin/bash
#               apt-get update
#               apt-get install -y mysql-server
#               # Plaats hier je database dump handmatig of via een andere methode
#               EOF

#   tags = {
#     Name = "database-instanceAK"
#   }
# }

output "frontend_public_ip" {
  value = aws_instance.frontendAK.public_ip
}

output "backend_public_ip" {
  value = aws_instance.backendAK.public_ip
}

# output "database_public_ip" {
#   value = aws_instance.databaseAK.public_ip
# }