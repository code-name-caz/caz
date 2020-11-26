# !/bin/bash

. ./envVar.sh

for i in ${!peers[*]}; do
  echo "Check peer: ${peers[$i]}"
  curl --location --request GET ${peers[$i]}:9443/healthz
  echo
done


