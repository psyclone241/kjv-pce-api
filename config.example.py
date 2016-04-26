#!/usr/bin/env python

# Statement for enabling the development environment
DEBUG = True

# Define the application directory
import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Define the database - we are working with
DB = 'sqlite'
# DB = 'mysql'
SQLALCHEMY_DATABASE_URI = DB + ':///' + os.path.join(BASE_DIR, 'data/mod_bible/kjv-pce-v2.db')
# SQLALCHEMY_DATABASE_URI = DB + '://user:password@localhost/mlt_bible'
SQLALCHEMY_TRACK_MODIFICATIONS = False
DATABASE_CONNECT_OPTIONS = {}

# Application threads. A common general assumption is
# using 2 per available processor cores - to handle
# incoming requests using one and performing background
# operations using the other.
THREADS_PER_PAGE = 2

# Enable protection agains *Cross-site Request Forgery (CSRF)*
CSRF_ENABLED = True

# Use a secure, unique and absolutely secret key for
# signing the data.
CSRF_SESSION_KEY = "secret1"

# Secret key for signing cookies
SECRET_KEY = "secret2"

IP_ADDRESS = "127.0.0.1"
PORT = 9100

plugins = ['app.mod_bible.controllers.mod_bible']
