from functools import wraps
import numpy as np
import pandas as pd
import altair as alt
import json
import datetime as datetime
import random
from random import sample
from sqlalchemy import func

from flask import request, jsonify, send_file, redirect
from config import app, db, mail
from flask_mail import Mail, Message
from flask_login import LoginManager, login_user, login_required, current_user, logout_user
from models import User,Course, Wellbeing, Event, Reviews, user_event,EventType, Tag, EventTag, CourseTag

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

def send_email(subject, body, list_of_recipients):
    mail_message = Message(
        subject=subject,
        recipients = list_of_recipients,
        sender = 'sender@gmail.com')
    mail_message.body = body
    mail.send(mail_message)

@app.route('/login', methods=['POST'])
def login():
    # json_data = """ {
    # "username": "aidan215",
    # "password": "password"
    # } 
    # """

    json_data = request.get_json()
    #data = json.loads(json_data)
    
    identifier = json_data['identifier']
    password = json_data['password']
    user = User.query.filter(
        (User.email == identifier) | 
        (User.phone_number == identifier)
    ).filter_by(password=password).first()

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


@app.route("/register", methods=['POST'])
def register():
    
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    email = data.get('email')

    if not email or not password:
        return jsonify({"message": "Missing required fields"}), 400
    
    new_user = User(
        email=email,
        password=password
    )
    if 'name' in data:
        new_user.name = data['name']
    if 'date_of_birth' in data:
        new_user.date_of_birth = datetime.date.fromisoformat(data['date_of_birth'])
    if 'phone_number' in data:
        new_user.phone_number = data['phone_number']  
    
    existing_user = User.query.filter_by(email=email).first()
    
    if existing_user:
        return jsonify({"message": "Username already exists"}), 400

    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/send_mail", methods=['POST'])
def send():
    
    data = request.get_json()

    recipients = []
    for item in data['recipients']:
        recipients.append(item['email']) 

    send_email(data['subject'], data['body'], recipients)

    return "Email sent successfully!"


fake = Faker()

@app.route("/seed_DB", methods=['POST'])
def seed_DB():
    try:
        db.drop_all()
        db.create_all()

        users = []
        tags = []
        events = []
        courses = []
        reviews = []
        wellbeings = []

        # Create 50 users

        admin = User(
            email="admin@mail.ru",
            password="admin_password",
            is_admin=True
        )
        users.append(admin)
        db.session.add(admin)

        for _ in range(50):
            user = User(
                email=fake.user_name(),
                password="password",
                avatar_url=fake.image_url()
            )
            users.append(user)
            db.session.add(user)

        db.session.commit()  # Commit users to get their IDs
        
        for _ in range(50):
            tag = Tag(
                tag_name=random.choice(["chai", "storytelling", "elderly","children", "adult", "women&girls", "jobs", "internships", 
                                    "scholarships", "coding", "programming", "development"])
            )
            tags.append(tag)
            db.session.add(tag)

        db.session.commit()

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
            
            random_tag = Tag.query.order_by(func.random()).first()
            if random_tag:
                event.tags.append(random_tag)
            events.append(event)
            db.session.add(event)

        # Create 20 courses
        for _ in range(20):
            course = Course(
                course_name=fake.catch_phrase(),
                course_description=fake.text(),
                course_url=fake.url(),
            )
            random_tag = Tag.query.order_by(func.random()).first()
            if random_tag:
                course.tags.append(random_tag)
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


        for _ in range(50):
            event_user = user_event(
                user_id=random.choice([user.user_id for user in users if not user.is_admin]),
                event_id=random.choice([event.event_id for event in events])
            )

            db.session.add(event_user)

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

@app.route('/tags', methods=['GET'])
def get_all_tags():
    tags = Tag.query.all()
    tag_list = [tag.tag_name for tag in tags]

    return jsonify({"tags": tag_list}), 200

@app.route('/tags', methods=['POST'])
def create_tag():
    data = request.get_json()

    tag_name = data['tagName']

    new_tag = Tag(tag_name=tag_name)

    db.session.add(new_tag)
    db.session.commit()

    return jsonify({"message": "Tag created successfully", "tag_id": new_tag.tag_id}), 201

@app.route('/event_tag', methods=['GET'])
def get_all_event_tags():
    event_tags = EventTag.query.all()

    event_tag_list = []
    for event_tag in event_tags:
        event_tag_data = {
            "event_id": event_tag.event_id,
            "tag_id": event_tag.tag_id
        }
        event_tag_list.append(event_tag_data)

    return jsonify({"event_tags": event_tag_list}), 200

@app.route('/event_tag', methods=['POST'])
def add_tag_to_event():
    data = request.get_json()

    if 'event_id' not in data or 'tag_id' not in data:
        return jsonify({"error": "Both event_id and tag_id are required"}), 400

    event_id = data['event_id']
    tag_id = data['tag_id']

    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404

    tag = Tag.query.get(tag_id)
    if not tag:
        return jsonify({"error": "Tag not found"}), 404

    event.tags.append(tag)
    db.session.commit()

    return jsonify({"message": "Tag added to event successfully"}), 201

@app.route('/event_tag/<int:event_id>', methods=['GET'])
def get_event_tags(event_id):
    event = Event.query.get(event_id)

    if not event:
        return jsonify({"error": "Event not found"}), 404

    tags = [tag.tag_name for tag in event.tags]

    return jsonify({"event_id": event_id, "event_name": event.event_name, "tags": tags}), 200

@app.route('/recommended_courses/<int:user_id>/<int:event_id>', methods=['GET'])
def get_recommended(user_id, event_id):

    user_courses = user_event.query.filter_by(user_id=user_id).all()

    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404

    event_tags = set([tag.tag_id for tag in event.tags])

    course_tags = set()
    for user_course in user_courses:
        course_tags_ = CourseTag.query.filter_by(course_id=user_course.course_id).all()
        course_tags.update([tag.tag_id for tag in course_tags_])
        
    recommended_courses = list(event_tags - course_tags)
    return jsonify({"recommended_courses": recommended_courses}), 200

@app.route('/course_tag', methods=['POST'])
def add_tag_to_course():
    data = request.get_json()

    if 'course_id' not in data or 'tag_id' not in data:
        return jsonify({"error": "Both course_id and tag_id are required"}), 400

    course_id = data['course_id']
    tag_id = data['tag_id']

    course = Course.query.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404

    tag = Tag.query.get(tag_id)
    if not tag:
        return jsonify({"error": "Tag not found"}), 404

    course.tags.append(tag)
    db.session.commit()

    return jsonify({"message": "Tag added to course successfully"}), 201

@app.route('/course_tag', methods=['GET'])
def get_all_course_tags():
    course_tags = CourseTag.query.all()

    course_tag_list = []
    for course_tag in course_tags:
        course = Course.query.get(course_tag.course_id)
        if course:
            tag = Tag.query.get(course_tag.tag_id)
            if tag:
                course_tag_data = {
                    "course_id": course_tag.course_id,
                    "tag_id": course_tag.tag_id,
                    "course_name": course.course_name,
                    "tag_name": tag.tag_name
                }
                course_tag_list.append(course_tag_data)

    return jsonify({"course_tags": course_tag_list}), 200

@app.route('/course_tag/<int:course_id>', methods=['GET'])
def get_course_tags(course_id):
    course = Course.query.get(course_id)

    if not course:
        return jsonify({"error": "Course not found"}), 404

    tags = [tag.tag_name for tag in course.tags]

    return jsonify({"course_id": course_id, "course_name": course.course_name, "tags": tags}), 200

@app.route('/search_events', methods=['GET'])
def search_events():
    try:
        # Using Search Parameters
        event_name = request.args.get('eventName')
        event_start_date = request.args.get('eventStartDate')
        event_end_date = request.args.get('eventEndDate')

        query = db.session.query(Event)

        if event_name:
            query = query.filter(Event.event_name.ilike(f'%{event_name}%'))
        if event_start_date:
            query = query.filter(Event.event_start_date >= event_start_date)
        if event_end_date:
            query = query.filter(Event.event_end_date <= event_end_date)

        events = query.all()
        # Convert events to JSON
        events_json = [event.to_json() for event in events]

        return jsonify(events_json), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    finally:
        db.session.close()

@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()

    event_tags = data.get('tags', [])

    event = Event(
        event_name=data['eventName'],
        event_start_date=data['eventStartDate'],
        event_end_date=data['eventEndDate'],
        event_location=data['eventLocation'],
        event_description=data['eventDescription'],
        number_of_participants_needed=data['numberOfParticipantsNeeded'],
        number_of_volunteers_needed=data['numberOfVolunteersNeeded'],
        event_type = EventType(data['eventType']),
        event_image_url = data['eventImageUrl']
    )

    for tag_id in event_tags:
        tag = Tag.query.get(tag_id)
        if tag:
            event.tags.append(tag)
            
    db.session.add(event)
    db.session.commit()
    return jsonify(event.to_json()), 201


@app.route('/events', methods=['GET'])
def get_all_events():
    events = Event.query.all()
    event_list = [event.to_json() for event in events]

    response_data = {
        "events": event_list
    }

    return jsonify(response_data), 200

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
        event.event_start_date = datetime.fromisoformat(data['eventStartDate'])
    if 'eventEndDate' in data:
        event.event_end_date = datetime.fromisoformat(data['eventEndDate'])
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
    
@app.route('/getEventChart_EventTypes', methods=['GET'])
def getEventChart_EventTypes():
    df = pd.read_excel('./datas/Event_review.xlsx', header=0, parse_dates=['event_date'], date_format="%d/%m/%Y")
    
    # remove duplicates
    df = df.drop_duplicates()
    
    chart = alt.Chart(df).mark_arc(innerRadius=50).encode(
        color= alt.Color("event_type", scale=alt.Scale(scheme='pastel1')),
        theta="count(event_type)"
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

@app.route('/getWellbeingChartDistribution', methods=['GET'])
def getWellnessChartDistribution():
    df = pd.read_excel('./datas/Wellbeing.xlsx', header=0, parse_dates=['date'], date_format="%d/%m/%Y")
    
    base  = alt.Chart(df).encode(
    alt.Theta("count(score)").stack(True),
    alt.Radius("count(score)").scale(type="sqrt", zero=True, rangeMin=20),
    color=alt.Color("score:N", scale=alt.Scale(scheme='lightmulti'))
    )

    c1 = base.mark_arc(innerRadius=20, stroke="#fff")

    c2 = base.mark_text(radiusOffset=10).encode(text="count(score):Q")

    chart = c1 + c2
    
    chart.save('chart.json')
    
    return send_file('chart.json', mimetype='application/json')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
