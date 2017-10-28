from flask import json,Flask,render_template,request,jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('home.html')


@app.route('/profiles')
def profiles():
    return render_template('profiles.html')
@app.route('/login')
def login():
    return render_template('login.html')
