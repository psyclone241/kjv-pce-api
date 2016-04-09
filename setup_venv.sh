#!/usr/bin/env bash
if [ "${1}" == "venv" ];
then
  virtualenv venv
elif [ "${1}" == "requirements" ];
  venv/bin/pip install -r requirements.txt
fi
