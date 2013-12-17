from flask import Flask
from flask.ext.cache import Cache

from top250.utils import get_app_config

app = Flask(__name__)
app.config.update(get_app_config())
cache = Cache(app)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
