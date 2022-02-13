import requests
import json
import time

command = {
    'data': '',
    'time': ''
}
while True:
    res = requests.get('http://localhost:8080/api/command')
    data =  json.loads(res.text)
    if data['time'] != command['time']:
        command = data
        print('new command')
        print(command)
    time.sleep(0.5)