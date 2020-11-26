# !/bin/bash

. ./envVar.sh

rm -rf ${PWD}/peers
mkdir ${PWD}/peers

ROOT = ${PWD}

for i in ${!peers[*]}; do
  mkdir ${PWD}/peers/peer${i}
  cp -R ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/msp ${PWD}/peers/peer${i}
  cp -R ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/tls ${PWD}/peers/peer${i}

  pushd ${PWD}/peers/peer${i}

  tar -czvf peer.tar.gz .

  pushd ${ROOT}

  scp -i ~/.ssh/sg-staging.pem ${PWD}/peers/peer${i}/peer.tar.gz ubuntu@${peers[$i]}:peer.tar.gz

  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} sudo rm -rf msp
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} sudo rm -rf tls

  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} tar -xvf peer.tar.gz

  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} rm -rf peer.tar.gz

  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} docker-compose down
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} docker system prune -f
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} docker volume prune -f
  ssh -i ~/.ssh/sg-staging.pem ubuntu@${peers[$i]} docker-compose up -d
done

rm -rf ${PWD}/peers
