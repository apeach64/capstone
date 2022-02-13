from sqlite3 import Date
from flask import request , send_file
from flask_restx import Resource, Api, Namespace
import json
SensorRoute = Namespace('sensor')
sensor = {
    "data": "",
    "time": ""
}

@SensorRoute.route('api/sensor')
class SensorAPIHandler(Resource):
    def __init__(self, api=None, *args, **kwargs):
        super().__init__(api, *args, **kwargs)

    def get(self):
        global sensor
        return sensor
    
    def post(self):
        global sensor
        data = json.loads(request.data)
        sensor = data
        return sensor
