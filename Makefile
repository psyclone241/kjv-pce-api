# Helper script for setting up your apps local instance
# Contributors:
# Roy Keyes <keyes.roy@gmail.com>

help:
	@echo "Available tasks :"
	@echo "\tsetup - setup the application"
	@echo "\tserve - start the server instance"

setup:
	@bash setup.sh
	
serve:
	@venv/bin/python run.py
