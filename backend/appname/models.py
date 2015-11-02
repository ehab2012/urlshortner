import os
import os.path
import json
import io
import glob
import uuid
import re
import random
import shortuuid
from flask import Flask, abort, redirect, jsonify, render_template, request, make_response, url_for

class UrlObject:
    def to_JSON(self):
        return json.dumps(self, default=lambda o: o.__dict__)

    def to_ShortUUID(longUrl):
        return shortuuid.uuid(name=longUrl)

    # location /bb2 { return 301 http://www.hotmail.com; }
    def get_details(self,filename):
        with open(filename, 'r') as f:
            first_line = f.readline()
            m = re.search('^location\s+/(\w+)\s+\{\s+return\s+\d+\s+(http.*)?;\s+', first_line)
            shorturl=m.group(1) 
            longurl=m.group(2)
        return {"short" : shorturl , "long" : longurl}

    def add_UrlObject(self,filename,longurl):
        shorturl=str(random.randint(1,1000)) + random.choice('ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')
        # TODO.e. check shorturl is unique
        #while os.path.isfile('foo.txt'):
            #os.path.isfile('foo.txt')
        locstr="location /" + shorturl + " { return 301 "+ longurl + "; }" # \n
        with open(filename, 'w+') as f:
            f.write(locstr)
        return {"short" : shorturl , "long" : longurl}

class EError(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)


class myModel:
    dirPath =""
    def __init__(self, DirPath):
       myModel.dirPath = DirPath

    def isAlive(self):
        return "url shorter is alive"

    def getURLs(self,savetoFile=0):
        tmpObj= UrlObject()
        tmpObj.data=[]
        #filesList=os.listdir(myModel.dirPath)
        filesList=glob.glob(myModel.dirPath + "/*.loc")
        for f in filesList:
            f=os.path.join(os.path.sep, myModel.dirPath , f)
            tmpObj.data.append(tmpObj.get_details(f))
        result = tmpObj.to_JSON()
        datafile=os.path.join(os.path.sep, myModel.dirPath,"data.txt")
        if (not os.path.exists(datafile)) or (savetoFile==1):
            with io.open(datafile, 'w', encoding='utf-8') as f:
              f.write(unicode(result))
        return result

    def AddURL(self,reqData):
        status_code=400
        longurl=str(eval(reqData))
        uuidUrl= shortuuid.uuid(name=longurl)
        filename=os.path.join(os.path.sep, myModel.dirPath , uuidUrl) + ".loc"
        tmpObj= UrlObject()
        tmpObj.data=[]
        status_code = 200
        if os.path.exists(filename):
            tmpObj.data.append(tmpObj.get_details(filename))
        else:
            status_code = 201
            tmpObj.data.append(tmpObj.add_UrlObject(filename,longurl))
        myModel.getURLs(self,1)
        return (tmpObj.to_JSON(),status_code)

    def DeleteUrls(self,reqData):
        status_code=404
        for url in eval(request.data):
            uuidUrl= shortuuid.uuid(name=str(url))
            print uuidUrl
            filename=os.path.join(os.path.sep, myModel.dirPath , uuidUrl)  + ".loc" 
            if os.path.exists(filename):
                status_code = 200
                os.remove(filename)
        return status_code

# jsonify({'data': os.listdir(dirPath)});



#        if not os.path.exists(datafile):
           #savetoFile=1
        #if savetoFile==1:
"""
with io.open(datafile, 'w', encoding='utf-8') as outfile:
    outfile.write(result)
"""
#with open(datafile, 'w') as fp:
#    json.dump(tmpObj.to_JSON(), fp)


