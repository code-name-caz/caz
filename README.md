# README

## Setting up the environment

Installing Ansible:

```
$ brew install ansible
```

Installing Hiperledger Fabric binaries:

```
$ curl -sSL https://bit.ly/2ysbOFE | bash -s
```


## Configuration

- Setting up the connection settings in the files inventory.yml and network/envVar.sh
- Specify passwords for the CA in host_vars/ca.example.com.yml фтв network/envVar.sh
- Configuring crypto materials for the network in the file network/configtx/configtx.yaml, you must specify IP addresses

## Install Fabric CA

```
$ ansible-playbook fabric-ca.yml -i inventory.yml
```

## Check Fabric CA

```
$ cd network && ./check_ca.sh && cd ..
```


## Add all addresses to trusted hosts

```
$ cd network && ./add_known_hosts.sh && cd ..
```

## Configuring Orders servers

```
$ ansible-playbook orderers.yml -i inventory.yml
```

## Configuring Peers servers

```
$ ansible-playbook peers.yml -i inventory.yml
```

## Go to the network folder

```
$ cd network
```

## Registering and obtaining certificates for administrators and hosts

All crypto materials will be located in the folder network/organizations

```
$ ./enroll.sh
```

## Start a network

```
$ ./up.sh
```

## Check Peers

```
$ ./check_peers.sh
```


## Smart contract deployment

Copy the project with the chaincode to the folder network/chaincode and run

```
$ ./deploy.sh
```