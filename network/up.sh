#!/bin/bash

./consortium.sh
./up_orderers.sh
./up_peers.sh
./create_channel.sh
./update_anchors.sh