# Helper script for setting up your apps local instance
# Contributors:
# Roy Keyes <keyes.roy@gmail.com>

help:
	@echo "Available tasks :"
	@echo "\tcopyconfig - copy the available config files"
	@echo "\tloadbower - load bower_components for the angular app"
	@echo "\tvenvsetup - setup the venv for the application"
	@echo "\tvenvrequire - install requirements in venv"
	@echo "\tinstallrequire - install requirements for production server"
	@echo "\tserve - start the server instance"
	@echo "\ttestflask - run the basic testing suite for the flask app"

copyconfig:
	@bash scripts/copyconfigs.sh

loadbower:
	@bash scripts/loadbower.sh

venvsetup:
	@bash scripts/setupvenv.sh venv

venvrequire:
	@bash scripts/setupvenv.sh requirements

installrequire:
	@pip install -r requirements.txt

serve:
	@bash scripts/servelocal.sh

testflask:
	@bash scripts/testflask.sh
