#! /usr/bin/env python
import json
from flask import Flask, abort, redirect, jsonify, render_template, request, make_response, url_for
from flask.ext.cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/urls')
def index():
     return 'Index'


@app.route('/api/urls/delete', methods=['POST'])
def delete_url():
    status_code=200
    for url in eval(request.data):
        print str(url)
    #print request.data
    return "deleteing" , status_code

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port=5000)
