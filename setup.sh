#!/usr/bin/env bash

cp config.example.py config.py
virtualenv venv

venv/bin/pip install flask
venv/bin/pip install flask-sqlalchemy
venv/bin/pip install flask-marshmallow
venv/bin/pip install marshmallow-sqlalchemy

edit config.py
