#!/usr/bin/env python
# Import flask and template operators
from flask import Flask, render_template

# Import SQLAlchemy
from flask.ext.sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# Define the WSGI application object
app = Flask(__name__)

# Configurations
app.config.from_object('config')
import config as config

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)
ma = Marshmallow(app)

from tools.utilities import MLTTools
tools = MLTTools()

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return tools.makeResponse(results=None, errors=True, message='Invalid Route')

@app.errorhandler(500)
def internal_error(error):
    return tools.makeResponse(results=None, errors=True, message='Internal Error')

# Import a module / component using its blueprint handler variable
from app.mod_bible.controllers import mod_bible as bible_module

@app.route('/', methods=['GET', 'POST'])
def root():
    return render_template('ReadMe.html'), 200

# Register blueprint(s)
app.register_blueprint(bible_module)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:9000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

# Build the database:
# This will create the database file using SQLAlchemy
# TODO: This needs to be added to a manage.py script for MySQL installs
# db.create_all()
if __name__ == "__main__":
    app.run()
