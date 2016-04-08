#!/usr/bin/env bash

VENV=$1

cp config.example.py config.py
cp app/static/mod_bible/config.example.js app/static/mod_bible/config.js

if [ ! -z "${VENV}"];
then
  virtualenv venv
  
  venv/bin/pip install flask
  venv/bin/pip install flask-sqlalchemy
  venv/bin/pip install flask-marshmallow
  venv/bin/pip install marshmallow-sqlalchemy
fi

edit config.py

cd app/static/resources/
bower install
cd ../mod_bible/
edit config.js
