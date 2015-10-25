from flask import Flask

app = Flask(__name__)
@app.route('/')
def index():
     return 'Index'
print "hello"
app.run(debug=True, host='127.0.0.1')