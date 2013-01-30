#!/bin/bash
cp config/parameters.yml.dist config/parameters.yml
./console doctrine:database:create
./console doctrine:phpcr:init:dbal
./console doctrine:phpcr:register-system-node-types
