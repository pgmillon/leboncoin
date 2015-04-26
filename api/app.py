#!/usr/bin/env python
import logging
from api.CustomJSONEncoder import CustomJSONEncoder
from api.providers.leboncoin import LeBonCoinProvider
from flask import json, request
from flask.app import Flask

logging.basicConfig(filename='leboncoin.log', level=logging.DEBUG)


app = Flask(__name__)
app.json_encoder = CustomJSONEncoder

def providers():
    return [
        LeBonCoinProvider()
    ]

@app.route('/api')
def list():
    page = request.args.get('page', 1)
    location = request.args.get('location', None)
    provider = LeBonCoinProvider()

    return app.response_class(json.dumps({
        'count': provider.count(location),
        'houses': provider.list(page=page, location=location)
    }), mimetype='application/json')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8888, debug=True)