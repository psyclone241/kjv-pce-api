#!/usr/bin/env python
import json
from flask import Response

class MLTTools:
    def __init__(self):
        self.structure = ''

    def getRouteDetails(self, class_name, request, part):
        if part == 'rule':
            which_rule = str(request.url_rule)
            which_rule = which_rule.replace("/" + class_name + "/", '')
            return which_rule

    def makeResponse(self, results=None, errors=None, message=None, count=None, is_json=True):
        response = { 'message': message, 'results': results, 'errors': errors, 'count': None  }

        if results:
            if len(results) <= 0:
                response['results'] = None

            if count:
                response['count'] = count
            else:
                response['count'] = len(results)

        if errors:
            if type(errors) == 'bool':
                if len(errors) <= 0:
                    response['errors'] = False
                else:
                    response['errors'] = 'unknown'
            else:
                response['errors'] = True
        else:
            response['errors'] = None

        if is_json:
            return self.jsonize(response)
        else:
            return response

    def jsonize(self, dict_data, indent=4, sort_keys=True):
        return Response(json.dumps(dict_data, indent=indent, sort_keys=sort_keys), mimetype='text/json')
