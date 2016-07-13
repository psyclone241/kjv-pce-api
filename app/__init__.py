#!/usr/bin/env python
# Import flask and template operators
from flask import Flask, render_template
import flask.views

# Import SQLAlchemy
from flask.ext.sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from werkzeug.utils import import_string

# Define the WSGI application object
app = Flask(__name__)

# Configurations
app.config.from_object('config')

import config as config

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Setup the MLTTools library for use by this and controllers
from tools.utilities import MLTTools
tools = MLTTools()
# Define the default methods for the routes
default_methods = ['GET', 'POST']

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return tools.makeResponse(results=None, errors=True, message='Invalid Route')

@app.errorhandler(500)
def internal_error(error):
    return tools.makeResponse(results=None, errors=True, message='Internal Error')

@app.route('/', methods=default_methods)
def root():
    return render_template('root/main.html'), 200

@app.route('/readme', methods=default_methods)
def readMe():
    return render_template('root/readme.html'), 200

# Register the modules that will be loaded as plugins
for plugin in config.PLUGINS:
    this_plugin = import_string(plugin)
    app.register_blueprint(this_plugin)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:9000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

if __name__ == "__main__":
    app.run()
