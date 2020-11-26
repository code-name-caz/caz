# !/bin/bash

. ./envVar.sh


for i in ${!peers[*]}; do
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} docker-compose down
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} docker-compose up -d
done

for i in ${!orderers[*]}; do
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} docker-compose down
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} docker-compose up -d
done
