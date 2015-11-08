#!/bin/bash

#$incrontab -e
#/var/www/scripts/urlshortner/location_configs IN_CREATE,IN_DELETE,IN_MODIFY /var/www/scripts/urlshortner/syncNreload.sh
#sudo systemctl start incrond

SRCLOC="$HOME/mnts/codearea/urlshortner/backend/location_configs/"
TARGET="$HOME/tmp/dir/t/"
FRONTENDTARGET="$HOME/mnts/codearea/urlshortner/frontend/src/files/"

#rsync to ngix dir
rsync -a --force --no-compress --inplace --delete --include='*.loc' --exclude='*' $SRCLOC $TARGET

if [ "$?" -eq "0" ]
then
#  service nginx reload
  #rsync data to frontend dir
  rsync -a --force --no-compress --inplace --delete --include='data.json' --exclude='*' $SRCLOC $FRONTENDTARGET
else
  echo "Error while running rsync"
fi