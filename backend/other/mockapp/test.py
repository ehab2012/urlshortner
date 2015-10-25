#! /usr/bin/env python
import os
import urllib
import logging
from flask import Flask, abort, redirect, jsonify, render_template, request, make_response, url_for

from flask.ext.cors import CORS
app = Flask(__name__)
CORS(app)

#log = logging.getLogger('werkzeug')
#log.setLevel(logging.ERROR)

@app.route("/", methods=["GET"])
def hello():
    return "flask is alive!"


#@app.route("/", methods=["POST"])
#                                shorturl: "etest.com/" + Math.floor((Math.random() * 100) + 1),
#                                longurl :requestSettings.data["longurl"],
#        abort(400)


@app.route('/urlshortener/api/urls', methods=['DELETE'])
def delete_url():
    status_code=200
    for url in eval(request.data):
        print url
    return jsonify({'result': True}), status_code


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == "__main__":
    # Bind to PORT if defined, otherwise default to 5000.
    #port = int(os.environ.get('PORT', 5000))
    app.run(debug=True,host='0.0.0.0', port=5000)


"""
    GET /urls - Retrieves a list of tickets
    GET /urls/12 - Retrieves a specific ticket
    POST /urls - Creates a new ticket
    PUT /urls/12 - Updates ticket #12
    PATCH /urls/12 - Partially updates ticket #12
    DELETE /urls/12 - Deletes ticket #12
"""

#   a = request.args.get('a', 0, type=int)
#   urls = request.get_json().get('urls', '')  To access parameters submitted in the URL (?key=value)
#   return jsonify(name = name)
#    print request.form['urls']

#    if len(shorturl) == 0:
#        abort(404)
#tasks.remove(task[0])


#url = urllib.quote(u"jhjhjh%20qwewe-".encode('utf8'))
#url = urllib.unquote(u"jhjhjh%20qwewe-").decode('utf8')
#print url



