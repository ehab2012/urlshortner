#! /usr/bin/env python
import os
import json
from flask import Flask, abort, redirect, jsonify, render_template, request, make_response, url_for
#from flask.ext.api import FlaskAPI, status, exceptions
from flask.ext.cors import CORS
from models import myModel

app = Flask(__name__)
CORS(app)

# API constants
LOCATION_DIR = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'location_configs'))

m = myModel(LOCATION_DIR)

@app.route('/isAlive')
def isAlive():
    return m.isAlive()

@app.route('/api/urls', methods=['GET'])
def getUrls():
    return m.getURLs()

@app.route('/api/urls', methods=['POST'])
def AddUrl():
    if len(request.data)== 0:
        abort(400)
    resp,status_code = m.AddURL(request.data)
    if status_code == 400:
        abort(400)
    return resp, status_code

@app.route('/api/urls/<urls>', methods=['DELETE'])
def DeleteUrls(urls):
    resp={}
    if len(urls)==0:
        print "urls=0"
        abort(400)
    resp,status_code = m.DeleteUrls(urls)
    if status_code == 400: #  status.HTTP_204_NO_CONTENT
        abort(400)
    return resp, status_code

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
