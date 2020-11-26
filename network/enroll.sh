# !/bin/bash

rm -rf ${PWD}/organizations
mkdir  ${PWD}/organizations

. ./envVar.sh

echo
echo "Download tls cert"
scp -i ~/.ssh/sg-staging.pem ubuntu@${FABRIC_CA}:fabric-ca/tls-cert.pem organizations/tls-cert.pem
echo

echo
echo "Enroll the CA client for Peers"
echo
mkdir -p organizations/peerOrganizations/example.com

export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/example.com

set -x
fabric-ca-client enroll -u https://${FABRIC_CA_USERNAME}:${FABRIC_CA_SECRET}@${FABRIC_CA}:7054 --caname ca-main --tls.certfiles ${PWD}/organizations/tls-cert.pem
{ set +x; } 2>/dev/null

echo "NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/${FABRIC_CA_CERT}-ca-main.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/${FABRIC_CA_CERT}-ca-main.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/${FABRIC_CA_CERT}-ca-main.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/${FABRIC_CA_CERT}-ca-main.pem
    OrganizationalUnitIdentifier: orderer" >${PWD}/organizations/peerOrganizations/example.com/msp/config.yaml

echo
echo "Enroll the CA client for Orderers"
echo
mkdir -p organizations/ordererOrganizations/example.com

export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/example.com

set -x
fabric-ca-client enroll -u https://${FABRIC_CA_USERNAME}:${FABRIC_CA_SECRET}@${FABRIC_CA}:7054 --caname ca-main --tls.certfiles ${PWD}/organizations/tls-cert.pem
{ set +x; } 2>/dev/null

echo "NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/${FABRIC_CA_CERT}-ca-main.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/${FABRIC_CA_CERT}-ca-main.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/${FABRIC_CA_CERT}-ca-main.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/${FABRIC_CA_CERT}-ca-main.pem
    OrganizationalUnitIdentifier: orderer" >${PWD}/organizations/ordererOrganizations/example.com/msp/config.yaml

echo
echo "Register orderer"
echo
set -x
fabric-ca-client register --caname ca-main --id.name orderer --id.secret ${FABRIC_CA_SECRET} --id.type orderer --tls.certfiles ${PWD}/organizations/tls-cert.pem
{ set +x; } 2>/dev/null

echo
echo "Register the orderer admin"
echo
set -x
fabric-ca-client register --caname ca-main --id.name admin --id.secret ${FABRIC_CA_SECRET} --id.type admin --tls.certfiles ${PWD}/organizations/tls-cert.pem
{ set +x; } 2>/dev/null

mkdir -p organizations/ordererOrganizations/example.com/orderers
mkdir -p organizations/ordererOrganizations/example.com/orderers/example.com

for i in ${!orderers[*]}; do
  mkdir -p organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com

  echo
  echo "## Generate the orderer${i} msp"
  echo
  set -x
  fabric-ca-client enroll -u https://orderer:${FABRIC_CA_SECRET}@${FABRIC_CA}:7054 --caname ca-main -M ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/msp --csr.hosts ${orderers[$i]} --csr.hosts orderer${i}.example.com --csr.hosts localhost --csr.hosts 127.0.0.1 --tls.certfiles ${PWD}/organizations/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/ordererOrganizations/example.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/msp/config.yaml

  echo
  echo "## Generate the orderer${i}-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://orderer:${FABRIC_CA_SECRET}@${FABRIC_CA}:7054 --caname ca-main -M ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/tls --enrollment.profile tls --csr.hosts ${orderers[$i]} --csr.hosts orderer${i}.example.com --csr.hosts localhost --csr.hosts 127.0.0.1 --tls.certfiles ${PWD}/organizations/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/tls/ca.crt
  cp ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/tls/signcerts/* ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/tls/server.crt
  cp ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/tls/keystore/* ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/tls/server.key

  mkdir -p ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/msp/tlscacerts
  cp ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

  mkdir -p ${PWD}/organizations/ordererOrganizations/example.com/msp/tlscacerts
  cp ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer${i}.example.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/example.com/msp/tlscacerts/tlsca.example.com-cert.pem
done

mkdir -p organizations/ordererOrganizations/example.com/users
mkdir -p organizations/ordererOrganizations/example.com/users/Admin@example.com

echo
echo "## Generate the admin msp"
echo
set -x
fabric-ca-client enroll -u https://admin:${FABRIC_CA_SECRET}@${FABRIC_CA}:7054 --caname ca-main -M ${PWD}/organizations/ordererOrganizations/example.com/users/Admin@example.com/msp --tls.certfiles ${PWD}/organizations/tls-cert.pem
{ set +x; } 2>/dev/null

cp ${PWD}/organizations/ordererOrganizations/example.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/example.com/users/Admin@example.com/msp/config.yaml

echo
echo "Register peer"
echo
set -x
fabric-ca-client register --caname ca-main --id.name peer --id.secret ${FABRIC_CA_SECRET} --id.type peer --tls.certfiles ${PWD}/organizations/tls-cert.pem
{ set +x; } 2>/dev/null

mkdir -p organizations/peerOrganizations/example.com/peers

for i in ${!peers[*]}; do
  mkdir -p organizations/peerOrganizations/example.com/peers/peer${i}.example.com

  echo
  echo "## Generate the peer${i} msp"
  echo
  set -x
  fabric-ca-client enroll -u https://peer:${FABRIC_CA_SECRET}@${FABRIC_CA}:7054 --caname ca-main -M ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/msp --csr.hosts ${peers[$i]} --csr.hosts 127.0.0.1  --csr.hosts localhost --tls.certfiles ${PWD}/organizations/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/msp/config.yaml

  echo
  echo "## Generate the peer${i}-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://peer:${FABRIC_CA_SECRET}@${FABRIC_CA}:7054 --caname ca-main -M ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/tls --enrollment.profile tls --csr.hosts ${peers[$i]} --csr.hosts 127.0.0.1  --csr.hosts localhost --tls.certfiles ${PWD}/organizations/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/tls/server.key

  mkdir -p ${PWD}/organizations/peerOrganizations/example.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/example.com/msp/tlscacerts/ca.crt

  mkdir -p ${PWD}/organizations/peerOrganizations/example.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/example.com/tlsca/tlsca.example.com-cert.pem

  mkdir -p ${PWD}/organizations/peerOrganizations/example.com/ca
  cp ${PWD}/organizations/peerOrganizations/example.com/peers/peer${i}.example.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/example.com/ca/ca.example.com-cert.pem
done

echo
echo "## Generate the admin msp"
echo
set -x
fabric-ca-client enroll -u https://admin:${FABRIC_CA_SECRET}@${FABRIC_CA}:7054 --caname ca-main -M ${PWD}/organizations/peerOrganizations/example.com/users/Admin@example.com/msp --tls.certfiles ${PWD}/organizations/tls-cert.pem
{ set +x; } 2>/dev/null

cp ${PWD}/organizations/peerOrganizations/example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/example.com/users/Admin@example.com/msp/config.yaml

