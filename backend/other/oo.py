import re

with open('/home/ehab/mnts/codearea/urlshortner/backend/location_configs/dBAZtgywgtuc3kTLEizmE5', 'r') as f:
    first_line = f.readline()
    # location /bb2 { return 301 http://www.hotmail.com; }
    m = re.search('^location\s+(/\w+)\s+\{\s+return\s+\d+\s+(http.*)?;\s+', first_line)
    print m.group(2)  # 1 /bb2  2 url
