#!/bin/bash
export PATH=${PWD}/../fabric-samples/bin:$PATH

export FABRIC_CA=13.250.172.50
export FABRIC_CA_USERNAME=client
export FABRIC_CA_SECRET=password123!
export FABRIC_CA_CERT=13-250-172-50-7054 # IP address and port

export FABRIC_CFG_PATH=${PWD}/configtx
export ORDERER_NAME=13.229.156.133
export ORDERER_HOST=13.229.156.133:7050
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer0.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export CHANNEL_NAME=transfers


orderers=("13.229.156.133" "13.229.136.134" "	18.138.240.29")
peers=("13.212.163.183" "3.1.64.39")

setPeerGlobals() {
  export CORE_PEER_LOCALMSPID="Org1MSP"
  export FABRIC_CFG_PATH=${PWD}/config
  export CORE_PEER_TLS_ENABLED=true
  export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/example.com/peers/peer$1.example.com/tls/ca.crt
  export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/example.com/users/Admin@example.com/msp
  export CORE_PEER_ADDRESS=${peers[$1]}:7051
}

verifyResult() {
  if [ $1 -ne 0 ]; then
    echo $'\e[1;31m'!!!!!!!!!!!!!!! $2 !!!!!!!!!!!!!!!!$'\e[0m'
    echo
    exit 1
  fi
}