import numpy as np
import pandas as pd
import altair as alt
from flask import request, jsonify, send_file, Flask
from config import app, db, mail
from flask_mail import Mail, Message
import json

@app.route("/", methods=['GET'])
def main():
    return jsonify({"message": "test"})

@app.route("/send_mail", methods=['GET'])
def index():

    # json_data = """ {
    # "subject": "Announcement Test",
    # "body": "This is a test body message",
    # "recipients": [ 
    #     {"email":"justforhongkong1@gmail.com"}, 
    #     {"email":"mustafaabylkhanuli@gmail.com"}
    # ]}
    # """
    # data = json_data
    
    json_data = request.get_json()
    data = json.loads(json_data)

    recipients = []
    for item in data['recipients']:
        recipients.append(item['email']) 

    mail_message = Message(
        subject=data['subject'],
        recipients = recipients,
        sender = 'sender@gmail.com')
        
    mail_message.body = data['body']
    mail.send(mail_message)

    return "Email sent successfully!"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

