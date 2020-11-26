# !/bin/bash

. ./envVar.sh

rm -rf ${PWD}/orderers
mkdir ${PWD}/orderers

ROOT = ${PWD}

for i in ${!orderers[*]}
do
  mkdir ${PWD}/orderers/orderer${i}
  cp -R ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/msp ${PWD}/orderers/orderer${i}
  cp -R ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/tls ${PWD}/orderers/orderer${i}
  cp -R ${PWD}/system-genesis-block ${PWD}/orderers/orderer${i}/system-genesis-block

  pushd ${PWD}/orderers/orderer${i}

  tar -czvf orderer.tar.gz .

  pushd ${ROOT}

  scp -i ~/.ssh/sg-staging.pem ${PWD}/orderers/orderer${i}/orderer.tar.gz ubuntu@${orderers[$i]}:orderer.tar.gz

  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} rm -rf msp
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} rm -rf tls
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} rm -rf system-genesis-block

  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} tar -xvf orderer.tar.gz

  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} rm -rf orderer.tar.gz

  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} docker-compose down
  # ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} docker system prune -f
  # ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} docker volume prune -f
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${orderers[$i]} docker-compose up -d
done

rm -rf ${PWD}/orderers