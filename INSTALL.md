# Steps for Setup

## Make a Config File
* Copy the config.example.py file to config.py
* Open config.py in the editor of your choice and modify the following settings
  * DEBUG -> Debugging State
  * DB -> Type of Datbase (mysql or sqlite)
  * SQLALCHEMY_DATABASE_URI -> Connection string for the database
  * CSRF_SESSION_KEY -> Key used to sign the data provided by the API
  * SECRET_KEY -> Key used for signing cookies
  * IP_ADDRESS -> IP Address for the service
  * PORT -> Port number for the service

## MySQL Database Setup
* Install MySQL Server or load database file into a running instance
* Create a database on your host called 'mlt_bible'
* Import the data from data/kjv-pce-v2.sql
* Set DB='mysql' in config.py

## SQLite Database Setup
* No setup is required for SQLite, just set DB='sqlite' in config.py

## Flask Application Setup
* `virtualenv venv`
* `venv/bin/pip install flask`
* `venv/bin/pip install flask-sqlalchemy`
* `venv/bin/pip install flask-marshmallow`
* `venv/bin/pip install marshmallow-sqlalchemy`

## TODO Items
* Add database install and setup scripts
