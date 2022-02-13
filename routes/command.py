from flask import request , send_file
from flask_restx import Resource, Api, Namespace
import json
CommnadRoute = Namespace('command')
command = {
    'data': '',
    'time': 0
}

@CommnadRoute.route('api/command')
class commandAPIHandler(Resource):
    def __init__(self, api=None, *args, **kwargs):
        super().__init__(api, *args, **kwargs)

    def get(self):
        global command
        return command
    
    def post(self):
        global command
        data = json.loads(request.data)
        command = data
        return command
