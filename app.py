import os
from flask import Flask, request, send_from_directory
app = Flask(__name__)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def send_static(path):
    if len(path)==0 or path[-1]=='/':
        return send_from_directory('public', f'{path}index.html')
    return send_from_directory('public', path)
if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))
