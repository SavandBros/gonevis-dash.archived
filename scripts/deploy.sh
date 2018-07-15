#!/usr/bin/env bash

if ! [ -x "$(command -v rsync)" ]; then
  echo 'Error: rsync is not installed.' >&2
  exit 1
fi

npm run build
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $DEPLOY_USER@$DEPLOY_HOST -p$DEPLOY_SSH_PORT 'rm -rf dash.gonevis.com/*'
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p$DEPLOY_SSH_PORT" --progress .htaccess dist/* $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH

# Notifying Rollbar of the deployment
ENVIRONMENT=production
LOCAL_USERNAME=`whoami`
REVISION=`git log -n 1 --pretty=format:"%H"`

curl https://api.rollbar.com/api/1/deploy/ \
  -F access_token=$ROLLBAR_ACCESS_TOKEN \
  -F environment=$ENVIRONMENT \
  -F revision=$REVISION \
  -F local_username=$LOCAL_USERNAME
  
