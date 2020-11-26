# !/bin/bash

. ./envVar.sh

for i in ${!orderers[*]}; do
  echo "Add orderer: ${orderers[$i]}"
  ssh-keyscan -H ${orderers[$i]} >> ~/.ssh/known_hosts
  echo
done

for i in ${!peers[*]}; do
  echo "Add peer: ${peers[$i]}"
  ssh-keyscan -H ${peers[$i]} >> ~/.ssh/known_hosts
  echo
done
