#!/usr/bin/env bash

FILES=( "config.py" "app/static/mod_bible/config/config.json" "flaskapp.wsgi" "app/mod_bible/modconfig.py" )
EXAMPLES=( "config.example.py" "app/static/mod_bible/config/config.example.json" "flaskapp.example.wsgi" "app/mod_bible/modconfig.example.py" )

function processConfig {
  if [ -z "${1}" ];
  then
    echo "No file passed to processConfig function"
    exit
  else
    if [ -z "${2}" ];
    then
      echo "No example file passed to processConfig function"
      exit
    else
      THIS_FILE=${1}
      EXAMPLE_FILE=${2}
      echo -e "Processing: ${THIS_FILE}"

      if [ -f "${THIS_FILE}" ];
      then
        echo -e "Copying old file (${THIS_FILE}) to (${THIS_FILE}.old)"
        cp ${THIS_FILE} ${THIS_FILE}.old
      fi

      echo -e "Copying: ${EXAMPLE_FILE} to ${THIS_FILE}"
      cp ${EXAMPLE_FILE} ${THIS_FILE}
    fi
  fi
}

INDEX=0
for FILE in "${FILES[@]}"
do
  processConfig "${FILE}" "${EXAMPLES[$INDEX]}"

  let "INDEX+=1"
done
