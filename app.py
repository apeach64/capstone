from flask import Flask, Response
from flask_restx import Api
from flask_cors import CORS
from routes import SensorRoute, CommnadRoute
import requests
app = Flask(__name__,static_folder='sensor/build')
api = Api(app)
CORS(app)
api.add_namespace(SensorRoute, '/')
api.add_namespace(CommnadRoute,'/')

@app.route('/sensor', methods=['GET'])
def get() :
    url = 'http://localhost:3000'
    #print('here===> ' + url,file=sys.stderr)
    r = requests.get(url)
    return Response(r.content)

@app.route('/static/js/<f>')
def jsfile(f) :
    url = 'http://localhost:3000/static/js/' + f
    #print('jsfile===> ' + url,file=sys.stderr)
    r = requests.get(url)
    return Response(r.content)

# @app.route('/sockjs-node')
# def sockjsnode() :
#     url = 'http://localhost:3000/sockjs-node'
#     #print('sockjs-node===> ' + url,file=sys.stderr)
#     r = requests.get(url)
#     return Response(r.content)


if __name__ == '__main__':
    app.run(port=8080)

