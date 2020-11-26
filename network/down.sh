#!/bin/bash

. ./envVar.sh

for i in ${!peers[*]}; do
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} docker-compose down
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} docker system prune -f
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} docker volume prune -f
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} sudo rm -rf msp
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} sudo rm -rf tls
done

for i in ${!orderers[*]}; do
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} docker-compose down
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} docker system prune -f
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} docker volume prune -f
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} sudo rm -rf msp
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} sudo rm -rf tls
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} sudo rm -rf system-genesis-block
done

rm -rf ${PWD}/peers
rm -rf ${PWD}/orderers
rm -rf ${PWD}/system-genesis-block
rm -rf ${PWD}/channel-artifacts
