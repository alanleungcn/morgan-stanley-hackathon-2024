import numpy as np
import pandas as pd
import altair as alt
import datetime as datetime
from flask import request, jsonify, send_file, redirect
from config import app, db
from models import Admin , User, Participant, Volunteer, Course, Wellbeing, Event, Reviews, takes,EventType

@app.route("/", methods=['GET'])
def main():
    # return redirect("/seed_DB")
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

@app.route("/seed_DB", methods=['POST'])
def seed_DB():
    admin1 = Admin(username="admin", password="admin")
    
    participant1 = Participant(
        username="aidan215",
        password="password", 
        email="aidan21@connect.hku.hk",
        name = "Aidan",
        date_of_birth = datetime.datetime(2000, 1, 1),
        phone_number="12345678",
        number_of_participated_events=10,
        preferred_event_type = EventType.SOCIAL_GATHERING.value,
        
    ) # Plz dont spam me!
    
    Event1 = Event(
        event_name = "Coffee Chat",
        event_date = datetime.datetime(2021, 5, 1),
        event_location = "Starbucks",
        event_description = "A casual coffee chat",
        number_of_participants_needed=10,
        number_of_volunteers_needed=2,
        event_type = EventType.SOCIAL_GATHERING,
    )
    
    participant1.events.append(Event1)
    
    Volunteer1 = Volunteer(
        username="volunteer1",
        password="password",
        email="volunteer1@gmail.com",
        name = "Volunteer",
        date_of_birth = datetime.datetime(2000, 1, 1),
        phone_number="12345678",
        number_of_volunteered_events=5,
        preferred_event_type = EventType.SOCIAL_GATHERING.value,
        
    )
    
    Course1 = Course(
        course_name = "social event planning",
        course_description = "learn how to plan social events",
        course_type = "Social Gathering",
        course_url = "https://www.google.com",
    )
    
    Volunteer1.courses.append(Course1)
    Volunteer1.events.append(Event1)
    
    Reviews1 = Reviews(
        review_rating = 5,
        review_feedback = "Great event!",
        event_id = 1,
        user_id = 1 # need to query this user_id from the db of who submit the form
    )
    
    Wellbeing1 = Wellbeing(
        wellbeing_score = 5,
        user_id = 1 # need to query this user_id from the db of who submit the form
    )
    
    try:
        db.drop_all()
        db.create_all()
        
        db.session.add(admin1)
        db.session.add(participant1)
        db.session.add(Event1)
        db.session.add(Volunteer1)
        db.session.add(Course1)
        db.session.add(Reviews1)
        db.session.add(Wellbeing1)
        
        db.session.commit()
        return jsonify({"message": "success"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}),400
    finally:
        db.session.close()
    return jsonify({"message": "exited"})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

