from flask import json,Flask,render_template,request,jsonify
from twilio.twiml.messaging_response import MessagingResponse, Message
import test
import sqlite3
#from twilio.rest import Client
#from twilio import twiml
#import message_maker
# Your Account SID from twilio.com/console
account_sid = "AC48bfb30988e4421136472e5e02927a37"
# Your Auth Token from twilio.com/console
auth_token  = "8c6d3bc77693b473e644d6438c8b5bb"

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
@app.route('/profileform')
def profileform():
    return render_template('profileform.html')
@app.route('/profiledisplay')
def profiledisplay():
    return render_template('profiledisplay.html')

@app.route('/getFamilyData',methods=['POST'])
def getFamData():
    print('hi')
    name=request.form['name']
    number=request.form['number']
    print(number)
    return render_template('success.html')
@app.route('/sms', methods=['POST'])
def text():
    print('received')
    # Get the text in the message sent
    response = MessagingResponse()
    #message_body = request.form['Body']
    #print(message_body)   
    # Create a Twilio response object to be able to send a reply back (as per         # Twilio docs)
    response.message('hi, aaron')
    print('hi')
    return str(response)

@app.route('/send_data' methods = ['POST'])
def send_data():
    projectpath=request.form['projectFilepath']
    conn = test.create_connection('database.db')

