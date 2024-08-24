from functools import wraps
import numpy as np
import pandas as pd
import altair as alt
import json
import datetime as datetime
import random


from flask import request, jsonify, send_file, redirect
from config import app, db, mail,photos,patch_request_class
from flask_mail import Mail, Message
from flask_login import LoginManager, login_user, login_required, current_user, logout_user
from models import User, Participant, Volunteer, Course, Wellbeing, Event, Reviews, takes,EventType

from faker import Faker

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
    #data = json.loads(json_data)
    
    username = json_data['username']
    password = json_data['password']
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

    json_data = """ {
    "subject": "Announcement Test",
    "body": "This is a test body message",
    "recipients": [ 
        {"email":"justforhongkong1@gmail.com"}, 
        {"email":"mustafaabylkhanuli@gmail.com"}
    ]}
    """
    data = json_data
    
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


fake = Faker()

@app.route("/seed_DB", methods=['POST'])
def seed_DB():
    try:
        db.drop_all()
        db.create_all()

        users = []
        participants = []
        events = []
        volunteers = []
        courses = []
        reviews = []
        wellbeings = []

        # Create 50 users

        admin = User(
            username="admin",
            password="admin_password",
            is_admin=True
        )
        users.append(admin)
        db.session.add(admin)

        for _ in range(50):
            user = User(
                username=fake.user_name(),
                password="password",
                avatar_url=fake.image_url()
            )
            users.append(user)
            db.session.add(user)

        db.session.commit()  # Commit users to get their IDs

        # Create 35 participants
        for _ in range(35):
            participant = Participant(
                username=fake.user_name(),
                password="password",
                email=fake.email(),
                name=fake.name(),
                date_of_birth=fake.date_of_birth(),
                phone_number=fake.phone_number(),
                number_of_participated_events=random.randint(1, 20),
                preferred_event_type=random.choice([e.value for e in EventType]),
            )
            participants.append(participant)
            db.session.add(participant)

        # Create 25 events
        for _ in range(25):
            event_start = fake.date_time_this_year()
            event_end = fake.date_time_between_dates(datetime_start=event_start)
            event = Event(
                event_name=fake.catch_phrase(),
                event_start_date=event_start.strftime('%Y-%m-%d %H:%M:%S'),
                event_end_date=event_end.strftime('%Y-%m-%d %H:%M:%S'),  
                event_location=fake.address(),
                event_description=fake.text(),
                number_of_participants_needed=random.randint(5, 20),
                number_of_volunteers_needed=random.randint(1, 5),
                event_type=random.choice(list(EventType)),
                event_image_url=fake.image_url()
            )
            events.append(event)
            db.session.add(event)

        # Create 15 volunteers
        for _ in range(15):
            volunteer = Volunteer (
                username=fake.user_name(),
                password="password",
                email=fake.email(),
                name=fake.name(),
                date_of_birth=fake.date_of_birth(),
                phone_number=fake.phone_number(),
                number_of_volunteered_events=random.randint(1, 20),
                preferred_event_type=random.choice([e.value for e in EventType]),
            )
            volunteers.append(volunteer)
            db.session.add(volunteer)

        # Create 20 courses
        for _ in range(20):
            course = Course(
                course_name=fake.catch_phrase(),
                course_description=fake.text(),
                course_type="Social Gathering",
                course_url=fake.url(),
            )
            courses.append(course)
            db.session.add(course)

        db.session.commit()  # Commit participants, events, volunteers, and courses to get their IDs

            # Create 50 reviews
        for _ in range(100):
            event_id = random.choice([event.event_id for event in events])
            user_id = random.choice([user.user_id for user in users if not user.is_admin])
    
            # Check if the review already exists
            existing_review = Reviews.query.filter_by(event_id=event_id, user_id=user_id).first()
    
            if not existing_review:
                review = Reviews(
                    review_rating=random.randint(1, 5),
                    review_feedback=random.choice(["Good event", "Average event", "Could be organized better"]),
                    event_id=event_id,
                    user_id=user_id
                )
                reviews.append(review)
                db.session.add(review)

        # Create 50 wellbeings
        for _ in range(50):
            wellbeing = Wellbeing(
                wellbeing_score=random.randint(1, 10),
                user_id=random.choice([user.user_id for user in users if not user.is_admin])
            )
            wellbeings.append(wellbeing)
            db.session.add(wellbeing)

        db.session.commit()
        return jsonify({"message": "success"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400
    finally:
        db.session.close()
    return jsonify({"message": "exited"})

@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    event = Event(
        event_name=data['eventName'],
        # event_start_date=datetime.strptime(data['eventStartDate'], '%Y-%m-%d %H:%M:%S'),
        # event_end_date=datetime.strptime(data['eventEndDate'], '%Y-%m-%d %H:%M:%S'),
        event_start_date=data['eventStartDate'],
        event_end_date=data['eventEndDate'],
        event_location=data['eventLocation'],
        event_description=data['eventDescription'],
        number_of_participants_needed=data['numberOfParticipantsNeeded'],
        number_of_volunteers_needed=data['numberOfVolunteersNeeded'],
        event_type = EventType(data['eventType']),
        event_image_url = data['eventImageUrl']
    )
    db.session.add(event)
    db.session.commit()
    return jsonify(event.to_json()), 201

@app.route('/search_events', methods=['GET'])
def search_events():
    try:
        # Using Search Parameters
        event_name = request.args.get('eventName')
        event_start_date = request.args.get('eventStartDate')
        event_end_date = request.args.get('eventEndDate')
        event_type = request.args.get('eventType')

        query = db.session.query(Event)

        if event_name:
            query = query.filter(Event.event_name.ilike(f'%{event_name}%'))
        if event_start_date:
            query = query.filter(Event.event_start_date >= event_start_date)
        if event_end_date:
            query = query.filter(Event.event_end_date <= event_end_date)
        if event_type:
            query = query.filter(Event.event_type == EventType(event_type))

        events = query.all()
        # Convert events to JSON
        events_json = [event.to_json() for event in events]

        return jsonify(events_json), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    finally:
        db.session.close()



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
        event.event_name = data['eventName']
    if 'eventStartDate' in data:
        event.event_start_date = datetime.strptime(data['eventStartDate'], '%Y-%m-%d %H:%M:%S')
    if 'eventEndDate' in data:
        event.event_end_date = datetime.strptime(data['eventEndDate'], '%Y-%m-%d %H:%M:%S')
    if 'eventLocation' in data:
        event.event_location = data['eventLocation']
    if 'eventDescription' in data:
        event.event_description = data['eventDescription']
    if 'numberOfParticipants' in data:
        event.number_of_participants = data['numberOfParticipants']
    if 'numberOfVolunteers' in data:
        event.number_of_volunteers = data['numberOfVolunteers']
    if 'numberOfParticipantsNeeded' in data:
        event.number_of_participants_needed = data['numberOfParticipantsNeeded']
    if 'numberOfVolunteersNeeded' in data:
        event.number_of_volunteers_needed = data['numberOfVolunteersNeeded']
    if 'eventType' in data:
        event_type_str = data['eventType']
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

@app.route('/event_types', methods=['GET'])
def get_event_types():
    event_types = [e.value for e in EventType]
    return jsonify(event_types), 200

@app.route('/courses', methods=['POST'])
#@admin_required
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

@app.route('/getReviewCharts', methods=['GET'])
def getReviewsChart():
    df = pd.read_excel('./datas/Event_review.xlsx', header=0, parse_dates=['event_date'], date_format="%d/%m/%Y")
    
    # remove duplicates
    df = df.drop_duplicates()

    chart = alt.Chart(df).mark_bar().encode(
        x = alt.X("rating:N", title="Ratings"),
        y = alt.Y("count(rating)", title="Number of rating"),
        color = alt.Color("rating"),
        column = alt.Column("event_type:N", title="Event Types"),
    )
    
    chart.save('chart.json')
    
    return send_file('chart.json', mimetype='application/json')

@app.route('/getEventChart/<int:event_id>', methods=['GET'])
def getEventChart(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'message': 'Event not found'}), 404
    df = pd.DataFrame([row.__dict__ for row in event])
    
    chart = alt.Chart(df).mark_bar().encode(
        x = alt.X("rating:N", title="Ratings"),
        y = alt.Y("count(rating)", title="Number of rating"),
        color = alt.Color("rating"),
        column = alt.Column("event_type:N", title="Event Types"),
    )
    
    chart.save('chart.json')
    
    return send_file('chart.json', mimetype='application/json')
    
    
@app.route('/getWellbeingCharts', methods=['GET'])
def getWellnessChart():
    df = pd.read_excel('./datas/Wellbeing.xlsx', header=0, parse_dates=['date'], date_format="%d/%m/%Y")
    
    chart_base = alt.Chart(df).encode(
        x=alt.X('date:T', title='Date'),
        y=alt.Y('score:Q', title='Score'),
        color = alt.Color('user_id:N', title='User Name'),
    )
    
    chart = chart_base.mark_line() + chart_base.mark_circle(filled=True , size=100)
    chart = chart.facet(
        column = 'user_id:N',
        columns = 3
    )
    chart.save('chart.json')
    
    return send_file('chart.json', mimetype='application/json')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

