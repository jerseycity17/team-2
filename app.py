from flask import json,Flask,render_template,request,jsonify
from twilio.twiml.messaging_response import MessagingResponse, Message
import dbfunctions
import sqlite3
from flask_cors import CORS
from twilio.rest import Client
#from twilio import twiml
#import message_maker
# Your Account SID from twilio.com/console
account_sid = ""
# Your Auth Token from twilio.com/console
auth_token  = ""

app = Flask(__name__)
CORS(app)
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
@app.route('/populated')
def populated():
    return render_template('populated.html')

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

@app.route('/send', methods=['POST'])
def msg():
    print('sdfsdf')
    client = Client(account_sid, auth_token)
    message = client.messages.create(
        to="+19198087203",
        body="Upcoming Workshop",
        from_="+19193283003",)
    return message
@app.route('/send2', methods=['POST'])
def msg2():
    print('sdfsdf')
    client = Client(account_sid, auth_token)
    message = client.messages.create(
        to="+19197229032",
        body="Financial Literacy Workshop! Come join",
        from_="+19193283003",)
    return message
