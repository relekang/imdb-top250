from flask import Flask, render_template
from flask.ext.cache import Cache

from top250.utils import get_app_config, json_response, txt_response

app = Flask(__name__)
app.config.update(get_app_config())
cache = Cache(app)


@app.route('/')
@cache.cached(60*30)
def index():
    analytics_code = app.config['ANALYTICS_CODE']
    if app.config['DEBUG']:
        return render_template('index.html', analytics_code=analytics_code)
    return render_template('index.jinja2', analytics_code=analytics_code)


@app.route('/api/<user_id>')
def todo(user_id):
    from top250.helpers import filter_top250
    todo = filter_top250(user_id)
    return json_response({
        'todo': todo
    })


@app.route('/api/<user_id>.txt')
def todo_txt(user_id):
    from top250.helpers import filter_top250
    todo = filter_top250(user_id)
    text = ""
    for movie in todo:
        text += "%s - %s\n" % (movie['title'], movie['rating'])
    return txt_response(text)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
