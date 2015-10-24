import json
import nginx
import uuid
# sudo pip install shortuuid
import shortuuid
from tinydb import TinyDB, where

#c = nginx.Conf()
#c.add(nginx.Comment('short URL'))
#c.add(nginx.Comment('long URL'))
#s=nginx.Location('/jjj',nginx.Key('return','301 http://www.dddd.com'))
#c.add(s)
#nginx.dumpf(c, '/home/ehab/mnts/codearea/urlshortnert/flaurl/other/f.loc')


#c=nginx.loadf('/home/ehab/mnts/codearea/urlshortnert/flaurl/other/f.loc')
#print c.as_block()[2]   # shorturl 0 , longurl 1

#print uuid.uuid4()

url = shortuuid.uuid(name="/home/ehab/mnts/codearea/urlshortnert/flaurl/other/f.loc")
# will be used to store location filenames
print url # fGBPWccFx6yhkDRqDWvyWX


with open('/home/ehab/mnts/codearea/urlshortner/frontend/src/data/urls.txt') as data_file:    
    json_data = json.load(data_file)

# from pprint import pprint
#pprint(json_data)
#print json.dumps(json_data)

mdict = dict((item['short'], item) for item in json_data["data"])

#for item in mdict:
#    print item

print mdict.has_key("etest.co1m/14")

db = TinyDB('/home/ehab/mnts/codearea/urlshortner/frontend/src/data/db.json')
table = db.table('data')
l= {
      "short": "etest.com/13",
      "long": "http://62.61.87.26:10071/tail.html",
      "notes": "aa2"
    };
c=table.insert(l)
print c

# not working
#lKey = [key for key, value in output_json.iteritems() if value == "etest.com/14"]
#print lKey


#jPosts = [{'id':123},{'id':54233}]
#print max(jPosts,key=lambda item:item['id']) #compare based on EACH items 'id' field
