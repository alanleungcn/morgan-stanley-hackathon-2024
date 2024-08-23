from config import db

# Database models
class Admin(db.Model):
    admin_id = db.Column(db.Integer, primary_key=True, index=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    def to_json(self):
        return {
            "adminId": self.admin_id,
            "username": self.username,
            "password": self.password
        }
        
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, index=True, autoincrement=True)
    
    wellbeings = db.relationship("Wellbeing", backref="user", lazy=True)
    reviews = db.relationship("Reviews", backref="user", lazy=True, uselist=False)
    
    def to_json(self):
        return {
            "userId": self.user_id
        }
        
# Many-to-many relationship
joins = db.Table(
    "joins",
    db.Column("event_id", db.Integer, db.ForeignKey("event.event_id")),
    db.Column("user_id", db.Integer, db.ForeignKey("Participant.user_id"))
)

helps = db.Table(
    "helps",
    db.Column("event_id", db.Integer, db.ForeignKey("event.event_id")),
    db.Column("user_id", db.Integer, db.ForeignKey("Volunteer.user_id"))
)

class takes(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey("Volunteer.user_id"), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("course.course_id"), primary_key=True)
    deadline = db.Column(db.Date, nullable=False)
    progress = db.Column(db.Integer, nullable=True)
    
    # completed = db.Column(db.Boolean, nullable=True)
    
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

class Participant(User):
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    phone_number = db.Column(db.String(100), nullable=True)
    number_of_participated_events = db.Column(db.Integer, nullable=False)
    preferred_event_type = db.Column(db.String(100), nullable=False)
    
    events = db.relationship("Event", secondary=joins, backref="participants")
    
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

class Volunteer(User):
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    phone_number = db.Column(db.String(100), nullable=True)
    number_of_volunteered_events = db.Column(db.Integer, nullable=False)
    preferred_event_type = db.Column(db.String(100), nullable=False)
    
    events = db.relationship("Event", secondary=helps, backref="volunteers")
    courses = db.relationship("Course", secondary=takes, backref="volunteers")
    
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

class Event(db.Model):
    event_id = db.Column(db.Integer, primary_key=True, index=True, autoincrement=True)
    event_name = db.Column(db.String(100), nullable=False)
    event_date = db.Column(db.Date, nullable=False)
    event_location = db.Column(db.String(100), nullable=False)
    event_description = db.Column(db.String(100), nullable=False)
    number_of_participants = db.Column(db.Integer, nullable=False)
    number_of_volunteers = db.Column(db.Integer, nullable=False)
    number_of_participants_needed = db.Column(db.Integer, nullable=False)
    number_of_volunteers_needed = db.Column(db.Integer, nullable=False)
    event_type = db.Column(db.String(100), nullable=False)
    
    reviews = db.relationship("Reviews", backref="event", lazy=True)
    
    def to_json(self):
        return {
            "eventId": self.event_id,
            "eventName": self.event_name,
            "eventDate": self.event_date,
            "eventLocation": self.event_location,
            "eventDescription": self.event_description,
            "numberOfParticipants": self.number_of_participants,
            "numberOfVolunteers": self.number_of_volunteers,
            "numberOfParticipantsNeeded": self.number_of_participants_needed,
            "numberOfVolunteersNeeded": self.number_of_volunteers_needed,
            "eventType": self.event_type,
            "reviews": self.reviews #[review.review_id for review in self.reviews]
        }

class Course(db.Model):
    course_id = db.Column(db.Integer, primary_key=True, index=True, autoincrement=True)
    course_name = db.Column(db.String(100), nullable=False)
    course_description = db.Column(db.String(100), nullable=False)
    course_type = db.Column(db.String(100), nullable=False)
    
    def to_json(self):
        return {
            "courseId": self.course_id,
            "courseName": self.course_name,
            "courseDescription": self.course_description,
            "courseType": self.course_type
        }

class Reviews(db.Model):
    review_id = db.Column(db.Integer, primary_key=True, index=True, autoincrement=True)
    review_feedback = db.Column(db.String(100), nullable=False)
    review_rating = db.Column(db.Integer, nullable=False)
    
    event_id = db.Column(db.Integer, db.ForeignKey("event.event_id"), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), primary_key=True)
    
    def to_json(self):
        return {
            "reviewId": self.review_id,
            "eventId": self.event_id,
            "userId": self.user_id,
            "reviewFeedback": self.review_feedback,
            "reviewRating": self.review_rating
        }

class Wellbeing(db.Model):
    wellbeing_id = db.Column(db.Integer, primary_key=True, index=True, autoincrement=True)
    wellbeing_score = db.Column(db.Integer, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))
    
    def to_json(self):
        return {
            "wellbeingId": self.wellbeing_id,
            "userId": self.user_id,
            "wellbeingScore": self.wellbeing_score
        }

