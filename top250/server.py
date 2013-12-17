from flask import Flask
from flask.ext.cache import Cache

from top250.utils import get_app_config, json_response, txt_response

app = Flask(__name__)
app.config.update(get_app_config())
cache = Cache(app)


@app.route('/<user_id>')
def todo(user_id):
    from top250.helpers import filter_top250
    todo = filter_top250(user_id)
    return json_response({
        'todo': todo
    })


@app.route('/<user_id>.txt')
def todo_txt(user_id):
    from top250.helpers import filter_top250
    todo = filter_top250(user_id)
    text = ""
    for movie in todo:
        text += "%s - %s\n" % (movie['title'], movie['rating'])
    return txt_response(text)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
