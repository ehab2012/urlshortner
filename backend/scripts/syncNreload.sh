#!/bin/bash

#$incrontab -e
#/var/www/scripts/urlshortner/location_configs IN_CREATE,IN_DELETE,IN_MODIFY /var/www/scripts/urlshortner/syncNreload.sh
#sudo systemctl start incrond

SRCLOC="/var/www/scripts/urlshortner/location_configs/"
TARGET="/var/www/sites-available/urlshorter_location_config/"

rsync -a --force --no-compress --inplace --delete $SRCLOC $TARGET

if [ "$?" -eq "0" ]
then
#  service nginx reload
  
  # should ui data update be here
  # /var/www/hmi-cloud-ui/portal/urlshortner/data
else
  #echo "Error while running rsync"
fi