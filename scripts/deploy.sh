#!/usr/bin/env bash

grunt release
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $DEPLOY_USER@$DEPLOY_HOST 'rm -rf $DEPLOY_PATH*'
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p$DEPLOY_SSH_PORT" --progress dist/* $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
