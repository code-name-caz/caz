# !/bin/bash
. ./envVar.sh

ssh -i ~/.ssh/sg-staging.pem ubuntu@${FABRIC_CA} docker-compose down
ssh -i ~/.ssh/sg-staging.pem ubuntu@${FABRIC_CA} docker system prune -f
ssh -i ~/.ssh/sg-staging.pem ubuntu@${FABRIC_CA} docker volume prune -f
ssh -i ~/.ssh/sg-staging.pem ubuntu@${FABRIC_CA} sudo rm fabric-ca/fabric-ca-server.db
ssh -i ~/.ssh/sg-staging.pem ubuntu@${FABRIC_CA} sudo rm fabric-ca/ca-cert.pem
ssh -i ~/.ssh/sg-staging.pem ubuntu@${FABRIC_CA} sudo rm -rf fabric-ca/msp
ssh -i ~/.ssh/sg-staging.pem ubuntu@${FABRIC_CA} sudo rm -rf fabric-ca/tls-cert.pem
ssh -i ~/.ssh/sg-staging.pem ubuntu@${FABRIC_CA} sudo rm -rf fabric-ca/IssuerPublicKey
ssh -i ~/.ssh/sg-staging.pem ubuntu@${FABRIC_CA} sudo rm -rf fabric-ca/IssuerRevocationPublicKey
ssh -i ~/.ssh/sg-staging.pem ubuntu@${FABRIC_CA} docker-compose up -d
