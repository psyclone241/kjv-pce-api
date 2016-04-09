#!/usr/bin/env python

from app import app
import config

app.run(host=config.IP_ADDRESS, port=config.PORT, debug=config.DEBUG)
