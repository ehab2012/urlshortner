"""
Install : pip install pymongo flask
Minimalistic url shortener : use with curl -sd "url=http://example.com/" http://this-app.com/shorten
"""
from flask import Flask, request, redirect, abort
#from pymongo import MongoClient
import base64, md5, re

#con = MongoClient()
#col = con.shortener.entries
#col.ensure_index('code', 1)

app = Flask(__name__)

@app.route('/shorten', methods=['POST'])
def shorten() :
    url = request.form.get('url')
    if not is_valid_url(url) :
        return abort(400)
    code = base64.b64encode(md5.new(url).digest()[-4:]).replace('=','').replace('/','_')
#   col.update({'code' : code}, {'$set' : {'code' : code, 'url' : url}}, True)
    return code+"\n"

#@app.route('/<code>')
#def router(code) :
#    url = col.find_and_modify({'code' : code}, {'$inc' : {'v' : 1}})['url']
#    return redirect(url)

def is_valid_url(url):
    regex = re.compile(
        r'^https?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return url is not None and regex.search(url)

if __name__ == '__main__' :
    app.debug = True
    app.run()