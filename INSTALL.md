# Steps for Setup

## TODO Items
* Add database install and setup scripts
* Make the Apache setup instructions more automated/detailed

## Apache Setup
* I followed the documentation on DigitalOcean, [Deploy Flask to Apache](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps).
  * You must acquire and enable the apache mod wsgi
    * `sudo apt-get install libapache2-mod-wsgi python-dev`
    * `sudo a2enmod wsgi`
  * You must pip install all the modules listed in [requirements.txt](requirements.txt)
  * You must create and enable an apache conf file for your site to enable wsgi
  * Copy flaskapp.example.wsgi to flaskapp.wsgi
    * `cp flaskapp.example.wsgi flaskapp.wsgi`
  * Modify the flaskapp.wsgi file to show your installed /var/www/directory
  * Add a custom configuration file for your new site, or use the contents to modify your current
    * Files located in data/apache_files/

## Local Python Server Setup
* You can run `make serve`

## Make the Config Files
* Run `make copyconfig`
  * You can run the copy of these files manually by doing:
    * `cp config.example.py file config.py`
    * `cp app/static/mod_bible/config/config.example.json app/static/mod_bible/config/config.json`
    * `cp app/mod_bible/modconfig.example.py app/mod_bible/modconfig.py`
* Open config.py in the editor of your choice and modify the following settings
  * DEBUG -> Debugging State
  * DB -> Type of Datbase (mysql or sqlite)
  * SQLALCHEMY_DATABASE_URI -> Connection string for the database
  * CSRF_SESSION_KEY -> Key used to sign the data provided by the API
  * SECRET_KEY -> Key used for signing cookies
  * IP_ADDRESS -> IP Address for the service
  * PORT -> Port number for the service
* Open app/static/mod_bible/config/config.json in the editor of your choice and modify the following settings
  * mode.current -> Set this to development, staging, or production (these are configurable)
  * restUrl -> Set the development, staging, or production instance restUrl to your IP_ADDRESS & PORT from above

## Load Bower Components
  * Install bower components
    * Run `make loadbower`
    * From the root, you can run, `bower install`

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
* You can run `make venvsetup`
  * Manual command: `virtualenv venv`
* Install the requirements in your new venv or production instance
  * You can run `make venvrequire`
  * Manual venv command: `venv/bin/pip install -r requirements.txt`
  * Manual prod command: `pip install -r requirements.txt`
* The following libraries are installed with their dependencies
  * `venv/bin/pip install flask`
  * `venv/bin/pip install flask-sqlalchemy`
  * `venv/bin/pip install flask-marshmallow`
  * `venv/bin/pip install marshmallow-sqlalchemy`
