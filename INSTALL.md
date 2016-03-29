# Steps for Setup

## TODO Items
* Add database install and setup scripts
* Make the Apache setup instructions more automated/detailed

## Apache Setup
* I followed the documentation on DigitalOcean, [Deploy Flask to Apache](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps).
  * You must acquire and enable the apache mod wsgi
    * `sudo apt-get install libapache2-mod-wsgi python-dev`
    * `sudo a2enmod wsgi`
  * You must pip install all the modules listed in [setup.sh](setup.sh)
  * You must create and enable an apache conf file for your site to enable wsgi
  * Modify the flaskapp.wsgi file to show your installed /var/www/directory

## Local Development Server Auto Setup
* Run the automatic setup script
  * `make setup` or
  * `bash setup.sh`

## Make a Config File
* Copy the example config
  * `cp config.example.py file config.py`
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
* If you are using the MySQL setup, `pip install mysql-python`
* You may need this for mysql-python, `sudo apt-get install python-dev libmysqlclient-dev`

## SQLite Database Setup
* No setup is required for SQLite, just set DB='sqlite' in config.py

## Flask Application Setup
* `virtualenv venv`
* `venv/bin/pip install flask`
* `venv/bin/pip install flask-sqlalchemy`
* `venv/bin/pip install flask-marshmallow`
* `venv/bin/pip install marshmallow-sqlalchemy`
