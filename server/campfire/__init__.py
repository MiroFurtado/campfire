from flask import Flask, flash, request, redirect, url_for
from flask_restful import Resource, Api
from werkzeug.utils import secure_filename
from subprocess import Popen
import os
import json


app = Flask(__name__)
app.config.from_object('config')

api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']



@app.route('/upload_model', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        print('No file part')
        return ''
    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        return ''
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # dispatch_worker_to_server(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return json.dumps({'success':True}), 200, {'ContentType':'application/json', 'Access-Control-Allow-Origin': '*'} 
    return ''


if __name__ == '__main__':
    app.run(debug=True)
