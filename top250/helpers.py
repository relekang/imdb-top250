import re
import httplib
from imdbpie import Imdb

from top250.server import cache

imdb = Imdb()


@cache.cached(60*60*24)
def get_top250():
    top_list = imdb.top_250()
    for i in xrange(len(top_list)):
        top_list[i]['rank'] = i + 1
    return top_list


def get_user_ratings(user_id):
    HEADERS = {
        "Content-type": "application/x-www-form-urlencoded",
        "Accept": "text/plain",
        "Accept-Language": 'en'
    }
    url = 'www.imdb.com'
    path = '/list/export?list_id=ratings&author_id=%s' % user_id
    rows = []
    ratings = {}

    connection = httplib.HTTPConnection(url)
    connection.request("POST", path, '', HEADERS)
    response = connection.getresponse()
    if response.status == 200:
        input = response.read()
        rows = input.split("\n")[1:]

    for row in rows:
        # Remove " in beginning and end, since it is splitted on ","
        row = row[1:len(row)-1]
        data = row.split("\",\"")
        if len(data) > 4 and not re.search('TV', data[6]):
            ratings[data[1]] = data[8]

    return ratings


@cache.memoize(60*2)
def filter_top250(user_id):
    user_ratings = get_user_ratings(user_id)
    filtered_list = []

    for movie in get_top250():
        if not movie['tconst'] in user_ratings:
            filtered_list.append(movie)

    return filtered_list
