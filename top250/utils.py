import json
import ConfigParser

from flask import make_response


def json_response(data, status=200):
    response = make_response(json.dumps(data), status)
    response.mimetype = 'application/json'
    return response


def txt_response(data, status=200):
    response = make_response(data, status)
    response.mimetype = 'text/plain'
    return response


def get_app_config():
    config = ConfigParser.ConfigParser()
    config.read(['defaults.cfg', 'local.cfg'])
    app_config = {}

    for k, v in config.items('server'):
        app_config[k.upper()] = v

    return app_config
