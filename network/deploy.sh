#!/bin/bash

CHANNEL_NAME=transfers
CC_NAME='casion_token'
CC_VERSION="1.0"
CC_SEQUENCE="1"
CC_END_POLICY="NA"
CC_COLL_CONFIG="NA"
CC_RUNTIME_LANGUAGE="node"
CC_SRC_PATH="./chaincode"

if [ "$CC_END_POLICY" = "NA" ]; then
	CC_END_POLICY=""
else
	CC_END_POLICY="--signature-policy $CC_END_POLICY"
fi

if [ "$CC_COLL_CONFIG" = "NA" ]; then
	CC_COLL_CONFIG=""
else
	CC_COLL_CONFIG="--collections-config $CC_COLL_CONFIG"
fi

. ./envVar.sh

installChaincode() {
  echo "Installing chaincode on peer$1"

	setPeerGlobals $1

	set -x
	peer lifecycle chaincode install ${CC_NAME}.tar.gz >&log.txt
	res=$?
	{ set +x; } 2>/dev/null
	cat log.txt
	verifyResult $res "Chaincode installation on peer$1 has failed"
	echo "===================== Chaincode is installed on peer$1 ===================== "
	echo
}

queryInstalled() {
  echo "Query installed chaincode on peer$1"

	setPeerGlobals $1
	set -x
	peer lifecycle chaincode queryinstalled >&log.txt
	res=$?
	{ set +x; } 2>/dev/null
	cat log.txt
	PACKAGE_ID=$(sed -n "/${CC_NAME}_${CC_VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
	verifyResult $res "Query installed on peer$1 has failed"
	echo "===================== Query installed successful on peer$1 on channel ===================== "
	echo
}

approveForMyOrg() {

  setPeerGlobals $1

	set -x
	peer lifecycle chaincode approveformyorg -o $ORDERER_HOST --ordererTLSHostnameOverride $ORDERER_NAME --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --package-id ${PACKAGE_ID} --sequence ${CC_SEQUENCE} ${CC_END_POLICY} ${CC_COLL_CONFIG} >&log.txt
	res=$?
	{ set +x; } 2>/dev/null
	cat log.txt
	verifyResult $res "Chaincode definition approved on peer0.org${ORG} on channel '$CHANNEL_NAME' failed"
	echo "===================== Chaincode definition approved on peer0.org${ORG} on channel '$CHANNEL_NAME' ===================== "
	echo
}

checkCommitReadiness() {
	setPeerGlobals $1
	echo "===================== Checking the commit readiness of the chaincode definition on peer$1 on channel '$CHANNEL_NAME'... ===================== "

  peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --sequence ${CC_SEQUENCE} ${CC_END_POLICY} ${CC_COLL_CONFIG} --output json
}

# commitChaincodeDefinition VERSION PEER ORG (PEER ORG)...
commitChaincodeDefinition() {
  setPeerGlobals $1

	echo "Commit chaincode definition"
	set -x
	peer lifecycle chaincode commit -o $ORDERER_HOST --ordererTLSHostnameOverride $ORDERER_NAME --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} $PEER_CONN_PARMS --version ${CC_VERSION} --sequence ${CC_SEQUENCE} ${CC_END_POLICY} ${CC_COLL_CONFIG} >&log.txt
	res=$?
	{ set +x; } 2>/dev/null
	cat log.txt
	verifyResult $res "Chaincode definition commit failed on peer$1 on channel '$CHANNEL_NAME' failed"
	echo "===================== Chaincode definition committed on channel '$CHANNEL_NAME' ===================== "
	echo
}

queryCommitted() {
	setPeerGlobals $1

  peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}
}

packageChaincode() {
	setPeerGlobals $1

	peer lifecycle chaincode package ${CC_NAME}.tar.gz --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} --label ${CC_NAME}_${CC_VERSION}
}

packageChaincode 0

for i in ${!peers[*]}; do
  installChaincode ${i}
done

for i in ${!peers[*]}; do
  queryInstalled ${i}
done

approveForMyOrg 0

for i in ${!peers[*]}; do
  checkCommitReadiness ${i}
done

commitChaincodeDefinition 0

for i in ${!peers[*]}; do
  queryCommitted ${i}
done
