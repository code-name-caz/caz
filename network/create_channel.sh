#!/bin/bash

. ./envVar.sh

configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/${CHANNEL_NAME}.tx -channelID $CHANNEL_NAME

## Create channel
setPeerGlobals 0
peer channel create -o $ORDERER_HOST -c $CHANNEL_NAME --ordererTLSHostnameOverride $ORDERER_NAME -f ./channel-artifacts/${CHANNEL_NAME}.tx --outputBlock ./channel-artifacts/${CHANNEL_NAME}.block --tls --cafile $ORDERER_CA

# Join channel
for i in ${!peers[*]}; do
  setPeerGlobals ${i}

  peer channel join -b ./channel-artifacts/$CHANNEL_NAME.block
done
