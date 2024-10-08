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
    password = db.Column(db.String(100), nullable=False)
    is_volunteer = db .Column(db.Boolean, default=False)
    is_admin = db.Column(db.Boolean, default=False)
    avatar_url = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=True)
    date_of_birth = db.Column(db.DateTime, nullable=True)
    phone_number = db.Column(db.String(100),unique=True, nullable=True)
    preferred_event_type = db.Column(db.String(100), nullable=True)
    @declared_attr
    def events(cls):
        return db.relationship("UserEvent", back_populates="user")
    
class User(UserMixin, db.Model):
    __tablename__ = "user"

    # __init__()

    @property
    def is_active(self):
        # Assuming all users are active by default
        return True

    @property
    def is_authenticated(self):
        # Assuming all users are authenticated if they are logged in
        return True

    @property
    def is_anonymous(self):
        # Anonymous users are not logged in
        return False

    def get_id(self):
        # Return the unique identifier for the user
        return str(self.user_id)

    wellbeings = db.relationship("Wellbeing", backref="user", lazy=True)
    reviews = db.relationship("Reviews", backref="user", lazy=True)
    
    def to_json(self):
        return {
            "userId": self.user_id,
            "password": self.password,
            "isVolunteer": self.is_volunteer,
            "isAdmin": self.is_admin,
            "avatarUrl": self.avatar_url,
            "email": self.email,
            "name": self.name,
            "dateOfBirth": self.date_of_birth,
            "phoneNumber": self.phone_number,
            "preferredEventType": self.preferred_event_type,
        }


class UserEvent(db.Model):
    __tablename__ = "user_event"
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("event.event_id"), primary_key=True)
    user_role = db.Column(db.String(50), nullable=True, default="Participant")
    
    user = db.relationship("User", back_populates="events")
    event = db.relationship("Event", back_populates="users")
    
    @property
    def is_completed(self):
        return True if self.progress == 100 else False

    def to_json(self):
        
        return {
            "userId": self.user_id,
            "event_id": self.event_id,
        }

class Tag(db.Model):
    __tablename__ = "tag"
    tag_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tag_name = db.Column(db.String(50), unique=True, nullable=False)

class EventTag(db.Model):
    __tablename__ = 'event_tags'
    event_id = db.Column(db.Integer, db.ForeignKey('event.event_id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.tag_id'), primary_key=True)

class EventType(enum.Enum):
    SOCIAL_GATHERING = ("Social Gathering")
    COUNSELLING = ("Counselling")
    TRAINING = ("Training")
    WORKSHOP = ("Workshop")
    OTHER = ("Other")

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
    event_image_url = db.Column(db.String(255), nullable=True)
    
    users = db.relationship("UserEvent", back_populates="event",cascade="all, delete-orphan")
    
    tags = db.relationship('Tag', secondary='event_tags', backref='events')
    reviews = db.relationship("Reviews", backref="event", lazy=True, cascade="all, delete-orphan")
    
    def __init__(self,event_start_date, event_end_date,event_name, event_location, event_description, number_of_participants_needed, number_of_volunteers_needed, event_type, event_image_url):
        self.event_name = event_name
        self.event_start_date = datetime.fromisoformat(event_start_date)
        self.event_end_date = datetime.fromisoformat(event_end_date)
        self.event_location = event_location
        self.event_description = event_description
        self.number_of_participants = 0
        self.number_of_volunteers = 0
        self.number_of_participants_needed = number_of_participants_needed
        self.number_of_volunteers_needed = number_of_volunteers_needed
        self.event_type = event_type
        self.event_image_url = event_image_url
        
    def to_json(self):
        return {
            "eventId": self.event_id,
            "eventName": self.event_name,
            "eventStartDate": self.event_start_date.isoformat(),
            "eventEndDate": self.event_end_date.isoformat(),
            "eventLocation": self.event_location,
            "eventDescription": self.event_description,
            "numberOfParticipants": self.number_of_participants,
            "numberOfVolunteers": self.number_of_volunteers,
            "numberOfParticipantsNeeded": self.number_of_participants_needed,
            "numberOfVolunteersNeeded": self.number_of_volunteers_needed,
            "eventType": self.event_type.value,
            "eventImageUrl": self.event_image_url,
            "users": [user.user_id for user in self.users],
            "tags": [tag.tag_name for tag in self.tags]
        }
    
        
# class Participant(UserMixin, db.Model):
#     __tablename__ = "participant"
#     username = db.Column(db.String(100), unique=True, nullable=False)
#     password = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)
#     name = db.Column(db.String(100), nullable=True)
#     date_of_birth = db.Column(db.DateTime, nullable=False)
#     phone_number = db.Column(db.String(100), nullable=True)
#     number_of_participated_events = db.Column(db.Integer, nullable=False)
#     preferred_event_type = db.Column(db.String(100), nullable=True)
    
#     events = db.relationship("Event", secondary=user_event, backref="participants")
  
#     def to_json(self):
#         return {
#             "userId": self.user_id, 
#             "username": self.username,
#             "password": self.password,
#             "email": self.email,
#             "name": self.name,
#             "dateOfBirth": self.date_of_birth,
#             "phoneNumber": self.phone_number,
#             "numberOfParticipated_events": self.number_of_participated_events,
#             "preferredEventType": self.preferred_event_type,
#             "events": self.events #[event.event_id for event in self.events]
#         }

# class Volunteer(UserMixin, db.Model):
#     __tablename__ = "volunteer"
#     username = db.Column(db.String(100), unique=True, nullable=False)
#     password = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)
#     name = db.Column(db.String(100), nullable=False)
#     date_of_birth = db.Column(db.DateTime, nullable=False)
#     phone_number = db.Column(db.String(100), nullable=True)
#     number_of_volunteered_events = db.Column(db.Integer, nullable=False)
#     preferred_event_type = db.Column(db.String(100), nullable=False)
    
#     events = db.relationship("Event", secondary=helps, backref="events_volunteers")
#     courses = db.relationship("Course", secondary=takes.__table__, backref="courses_volunteers")
    
#     def to_json(self):
#         return {
#             "userId": self.user_id,
#             "username": self.username,
#             "password": self.password,
#             "email": self.email,
#             "name": self.name,
#             "dateOfBirth": self.date_of_birth,
#             "phoneNumber": self.phone_number,
#             "numberOfVolunteeredEvents": self.number_of_volunteered_events,
#             "preferredEventType": self.preferred_event_type,
#             "events": self.events, #[event.event_id for event in self.events],
#             "courses": self.courses #[course.course_id for course in self.courses]
#         }


class CourseTag(db.Model):
    __tablename__ = 'course_tags'
    course_id = db.Column(db.Integer, db.ForeignKey('course.course_id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.tag_id'), primary_key=True)

class Course(db.Model):
    __tablename__ = "course"
    course_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_name = db.Column(db.String(100), nullable=False)
    course_description = db.Column(db.String(100), nullable=False)
    course_url = db.Column(db.String(100), nullable=False)
    tags = db.relationship('Tag', secondary='course_tags', backref='course')
    
    def to_json(self):
        return {
            "courseId": self.course_id,
            "courseName": self.course_name,
            "courseDescription": self.course_description,
            "courseUrl": self.course_url,
            "tags": [tag.tag_name for tag in self.tags]
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