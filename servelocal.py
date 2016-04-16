#!/usr/bin/env python
import os
import sys

import config
from app import app

app.run(host=config.IP_ADDRESS, port=config.PORT, debug=config.DEBUG)
