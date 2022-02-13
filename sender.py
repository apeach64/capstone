from this import d
import requests
import json
import time
while True:
    sensor_data = input('type data: ')
    requests.post('http://localhost:8080/api/sensor',json=json.dumps({
        'data': sensor_data,
        'time': time.time()
    }))