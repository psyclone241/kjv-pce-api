# Helper script for setting up your apps local instance
# Contributors:
# Roy Keyes <keyes.roy@gmail.com>

help:
	@echo "Available tasks :"
	@echo "\tcopyconfig - copy the available config files"
	@echo "\tloadbower - load bower_components for the angular app"
	@echo "\tvenv - setup the venv for the application"
	@echo "\tvenvrequire - install requirements in venv"
	@echo "\tinstallrequire - install requirements for production server"
	@echo "\tserve - start the server instance"
	@echo "\ttestflask - run the basic testing suite for the flask app"

copyconfig:
	@bash copy_configs.sh

loadbower:
	@bower install

venv:
	@bash setup_venv.sh venv

venvrequire:
	@bash setup_venv.sh require

installrequire:
	@pip install -r requirements.txt

serve:
	@venv/bin/python serve_local.py

testflask:
	@venv/bin/python run_python_tests.py
