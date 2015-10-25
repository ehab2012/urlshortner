#!/usr/bin/env python

from flask.ext.script import Manager, Server

from appname.app import app

manager = Manager(app)

manager.add_command("debug", Server(use_debugger=True, use_reloader=True, port=5000, host='127.0.0.1'))
manager.add_command('runserver', Server(host='0.0.0.0',port=5000))

if __name__ == "__main__":
    manager.run()
