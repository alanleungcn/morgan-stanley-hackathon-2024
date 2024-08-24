from config import db
from sqlalchemy.orm import declared_attr, declarative_mixin
from sqlalchemy import Enum
import enum

from datetime import datetime

# Database models
# class Admin(db.Model):
#     admin_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     username = db.Column(db.String(100), unique=True, nullable=False)
#     password = db.Column(db.String(100), nullable=False)
    
#     def to_json(self):
#         return {
#             "adminId": self.admin_id,
#             "username": self.username,
#             "password": self.password
#         }

@declarative_mixin       
class UserMixin:
    __table_args__ = {"extend_existing": True}
    
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    # @declared_attr
    # def wellbeings(cls):
    #     return db.relationship("Wellbeing", backref="user_wellbeings", lazy=True)
    
    # @declared_attr
    # def reviews(cls):
    #     return db.relationship("Reviews", backref="user_reviews", lazy=True, uselist=False)
    
    
class User(UserMixin, db.Model):
    __tablename__ = "user"
    wellbeings = db.relationship("Wellbeing", backref="user", lazy=True)
    reviews = db.relationship("Reviews", backref="user", lazy=True)
    
    def to_json(self):
        return {
            "userId": self.user_id,
            "username": self.username,
            "password": self.password,
            "isAdmin": self.is_admin
        }

# # Many-to-many relationship
user_event_joins = db.Table(
    "user_event_joins",
    db.Column("user_id", db.Integer, db.ForeignKey("participant.user_id")),
    db.Column("event_id", db.Integer, db.ForeignKey("event.event_id"))
)

helps = db.Table(
    "helps",
    db.Column("user_id", db.Integer, db.ForeignKey("volunteer.user_id")),
    db.Column("event_id", db.Integer, db.ForeignKey("event.event_id"))
)

class takes(db.Model):
    __tablename__ = "takes"
    user_id = db.Column(db.Integer, db.ForeignKey("volunteer.user_id"), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("course.course_id"), primary_key=True)
    deadline = db.Column(db.DateTime, nullable=True)
    progress = db.Column(db.Integer, nullable=True)

    
    @property
    def is_completed(self):
        return True if self.progress == 100 else False

    def to_json(self):
        self.completed = self.is_completed()
        
        return {
            "userId": self.user_id,
            "courseId": self.course_id,
            "deadline": self.deadline,
            "progress": self.progress,
            "completed": self.completed
        }
class EventType(enum.Enum):
    SOCIAL_GATHERING = "Social Gathering"
    COUNSELLING = "Counselling"
    TRAINING = "Training"
    WORKSHOP = "Workshop"
    OTHER = "Other"

class Event(db.Model):
    __tablename__ = "event"
    event_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_name = db.Column(db.String(100), nullable=False)
    event_start_date = db.Column(db.DateTime, nullable=False)
    event_end_date = db.Column(db.DateTime, nullable=False)
    event_location = db.Column(db.String(100), nullable=False)
    event_description = db.Column(db.String(100), nullable=False)
    number_of_participants = db.Column(db.Integer, nullable=False)
    number_of_volunteers = db.Column(db.Integer, nullable=False)
    number_of_participants_needed = db.Column(db.Integer, nullable=False)
    number_of_volunteers_needed = db.Column(db.Integer, nullable=False)
    event_type = db.Column(Enum(EventType), nullable=False)
    
    reviews = db.relationship("Reviews", backref="event", lazy=True)
    
    def __init__(self,event_start_date, event_end_date,event_name, event_location, event_description, number_of_participants_needed, number_of_volunteers_needed, event_type):
        self.event_name = event_name
        self.event_start_date = datetime.strptime(event_start_date, '%Y-%m-%d %H:%M:%S')
        self.event_end_date = datetime.strptime(event_end_date, '%Y-%m-%d %H:%M:%S')
        self.event_location = event_location
        self.event_description = event_description
        self.number_of_participants = 0
        self.number_of_volunteers = 0
        self.number_of_participants_needed = number_of_participants_needed
        self.number_of_volunteers_needed = number_of_volunteers_needed
        self.event_type = event_type
        
    def to_json(self):
        return {
            "eventId": self.event_id,
            "eventName": self.event_name,
            "eventStartDate": str(self.event_start_date),
            "eventEndDate": str(self.event_end_date),
            "eventLocation": self.event_location,
            "eventDescription": self.event_description,
            "numberOfParticipants": self.number_of_participants,
            "numberOfVolunteers": self.number_of_volunteers,
            "numberOfParticipantsNeeded": self.number_of_participants_needed,
            "numberOfVolunteersNeeded": self.number_of_volunteers_needed,
            "eventType": self.event_type.value
        }
        
class Participant(UserMixin, db.Model):
    __tablename__ = "participant"
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    date_of_birth = db.Column(db.DateTime, nullable=False)
    phone_number = db.Column(db.String(100), nullable=True)
    number_of_participated_events = db.Column(db.Integer, nullable=False)
    preferred_event_type = db.Column(db.String(100), nullable=False)
    
    events = db.relationship("Event", secondary=user_event_joins, backref="participants")
  
    def to_json(self):
        return {
            "userId": self.user_id, 
            "username": self.username,
            "password": self.password,
            "email": self.email,
            "name": self.name,
            "dateOfBirth": self.date_of_birth,
            "phoneNumber": self.phone_number,
            "numberOfParticipated_events": self.number_of_participated_events,
            "preferredEventType": self.preferred_event_type,
            "events": self.events #[event.event_id for event in self.events]
        }

class Volunteer(UserMixin, db.Model):
    __tablename__ = "volunteer"
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    date_of_birth = db.Column(db.DateTime, nullable=False)
    phone_number = db.Column(db.String(100), nullable=True)
    number_of_volunteered_events = db.Column(db.Integer, nullable=False)
    preferred_event_type = db.Column(db.String(100), nullable=False)
    
    events = db.relationship("Event", secondary=helps, backref="events_volunteers")
    courses = db.relationship("Course", secondary=takes.__table__, backref="courses_volunteers")
    
    def to_json(self):
        return {
            "userId": self.user_id,
            "username": self.username,
            "password": self.password,
            "email": self.email,
            "name": self.name,
            "dateOfBirth": self.date_of_birth,
            "phoneNumber": self.phone_number,
            "numberOfVolunteeredEvents": self.number_of_volunteered_events,
            "preferredEventType": self.preferred_event_type,
            "events": self.events, #[event.event_id for event in self.events],
            "courses": self.courses #[course.course_id for course in self.courses]
        }



class Course(db.Model):
    __tablename__ = "course"
    course_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_name = db.Column(db.String(100), nullable=False)
    course_description = db.Column(db.String(100), nullable=False)
    course_type = db.Column(db.String(100), nullable=False)
    course_url = db.Column(db.String(100), nullable=False)
    
    def to_json(self):
        return {
            "courseId": self.course_id,
            "courseName": self.course_name,
            "courseDescription": self.course_description,
            "courseType": self.course_type,
            "courseUrl": self.course_url
        }

class Reviews(db.Model):
    __tablename__ = "reviews"
    review_feedback = db.Column(db.String(100), nullable=False)
    review_rating = db.Column(db.Integer, nullable=False)
    
    # review_id is identify by both of this foreign keys
    event_id = db.Column(db.Integer, db.ForeignKey("event.event_id"), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), primary_key=True)
    
    def to_json(self):
        return {
            "eventId": self.event_id,
            "userId": self.user_id,
            "reviewFeedback": self.review_feedback,
            "reviewRating": self.review_rating
        }

class Wellbeing(db.Model):
    __tablename__ = "wellbeing"
    
    wellbeing_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    wellbeing_score = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))
    
    
    def to_json(self):
        return {
            "wellbeingId": self.wellbeing_id,
            "userId": self.user_id,
            "wellbeingScore": self.wellbeing_score,
            "createdAt": self.created_at
        }

