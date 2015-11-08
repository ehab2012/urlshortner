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
if not os.path.exists(LOCATION_DIR):
    os.makedirs(LOCATION_DIR)

m = myModel(LOCATION_DIR)
m.getURLs(1)

@app.route('/api/urls/isAlive')
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

@app.route('/api/urls/delete', methods=['POST'])
def DeleteUrls():
    status_code = m.DeleteUrls(request.data)
    return str(status_code)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
