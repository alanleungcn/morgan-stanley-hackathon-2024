from functools import wraps
import numpy as np
import pandas as pd
import altair as alt
import json
import datetime as datetime

from flask import request, jsonify, send_file, redirect
from config import app, db, mail
from flask_mail import Mail, Message
from flask_login import LoginManager, login_user, login_required, current_user, logout_user
from models import User, Participant, Volunteer, Course, Wellbeing, Event, Reviews, takes,EventType

login_manager = LoginManager(app)

@app.route("/", methods=['GET'])
def main():
    # return redirect("/seed_DB")
    return jsonify({"message": "test"})

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or not current_user.is_admin:
            return jsonify({"message": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/login', methods=['POST'])
def login():
    # json_data = """ {
    # "username": "aidan215",
    # "password": "password"
    # } 
    # """

    json_data = request.get_json()
    data = json.loads(json_data)
    
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username, password=password).first()

    if user:
        login_user(user)
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

@app.route("/send_mail", methods=['POST'])
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
    # admin1 = Admin(username="admin", password="admin")
    user1 = User(
        username = "aidan215",
        password="password"
    )
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
        
        # db.session.add(admin1)
        db.session.add(user1)
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

@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    event = Event(
        event_name=data['eventName'],
        event_date=datetime.strptime(data['eventDate'], '%Y-%m-%d'),
        event_location=data['eventLocation'],
        event_description=data['eventDescription'],
        number_of_participants_needed=data['numberOfParticipantsNeeded'],
        number_of_volunteers_needed=data['numberOfVolunteersNeeded'],
        event_type = EventType(data['event_type'])
    )
    db.session.add(event)
    db.session.commit()
    return jsonify(event.to_json()), 201

@app.route('/events', methods=['GET'])
def get_all_events():
    events = Event.query.all()
    event_list = [event.to_json() for event in events]
    return jsonify(event_list), 200

@app.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'message': 'Event not found'}), 404

    return jsonify(event.to_json()), 200

@app.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'message': 'Event not found'}), 404

    data = request.get_json()
    if 'eventName' in data:
        event.event_name = data['event_name']
    if 'eventDate' in data:
        event.event_date = datetime.strptime(data['event_date'], '%Y-%m-%d %H:%M:%S')
    if 'eventLocation' in data:
        event.event_location = data['event_location']
    if 'eventDescription' in data:
        event.event_description = data['event_description']
    if 'numberOfParticipants' in data:
        event.number_of_participants = data['numberOfParticipants']
    if 'numberOfVolunteers' in data:
        event.number_of_volunteers = data['numberOfVolunteers']
    if 'numberOfParticipantsNeeded' in data:
        event.number_of_participants_needed = data['numberOfParticipantsNeeded']
    if 'numberOfVolunteersNeeded' in data:
        event.number_of_volunteers_needed = data['numberOfVolunteersNeeded']
    if 'event_type' in data:
        event_type_str = data['event_type']
        if event_type_str in [e.value for e in EventType]:
            event.event_type = EventType(event_type_str)
        else:
            return jsonify({'message': 'Invalid event type'}), 400

    db.session.commit()

    return jsonify(event.to_json()), 200

@app.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'message': 'Event not found'}), 404

    db.session.delete(event)
    db.session.commit()

    return jsonify({'message': 'Event deleted'}), 200

@app.route('/courses', methods=['POST'])
@admin_required
def create_course():
    data = request.get_json()

    new_course = Course(
        course_name=data.get('courseName'),
        course_description=data.get('courseDescription'),
        course_type=data.get('courseType'),
        course_url=data.get('courseUrl')
    )

    db.session.add(new_course)
    db.session.commit()
    return jsonify({"message": "Course created successfully"}), 201

@app.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    courses_json = [course.to_json() for course in courses]
    return jsonify(courses_json), 200

@app.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()

    new_review = Reviews(
        review_feedback=data.get('reviewFeedback'),
        review_rating=data.get('reviewRating'),
        event_id=data.get('eventId'),
        user_id=data.get('userId')
    )

    db.session.add(new_review)
    db.session.commit()
    return jsonify({"message": "Review created successfully"}), 201

@app.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Reviews.query.all()
    reviews_json = [review.to_json() for review in reviews]
    return jsonify(reviews_json), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

