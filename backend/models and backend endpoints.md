## Backend Models&Endpoints

### Running the backend server

- in the terminal cd to \backend
- then run "python app.py"

# Database Models

Overview of the database models used in the application, including their columns and relationships.

## Admin

Represents an admin user.

| Column   | Type    | Constraints                 |
| -------- | ------- | --------------------------- |
| admin_id | Integer | Primary Key, Auto Increment |
| username | String  | Unique, Not Null            |
| password | String  | Not Null                    |

## UserMixin

A mixin class for user-related models.

| Column  | Type    | Constraints                 |
| ------- | ------- | --------------------------- |
| user_id | Integer | Primary Key, Auto Increment |

## User

Represents a user.

| Column  | Type    | Constraints                 |
| ------- | ------- | --------------------------- |
| user_id | Integer | Primary Key, Auto Increment |

### Relationships

- `wellbeings`: One-to-Many with `Wellbeing`
- `reviews`: One-to-Many with `Reviews`

## Participant

Represents a participant user.

| Column                        | Type     | Constraints                 |
| ----------------------------- | -------- | --------------------------- |
| user_id                       | Integer  | Primary Key, Auto Increment |
| username                      | String   | Unique, Not Null            |
| password                      | String   | Not Null                    |
| email                         | String   | Unique, Not Null            |
| name                          | String   | Not Null                    |
| date_of_birth                 | DateTime | Not Null                    |
| phone_number                  | String   | Nullable                    |
| number_of_participated_events | Integer  | Not Null                    |
| preferred_event_type          | String   | Not Null                    |

### Relationships

- `events`: Many-to-Many with `Event` through `user_event_joins`

## Volunteer

Represents a volunteer user.

| Column                       | Type     | Constraints                 |
| ---------------------------- | -------- | --------------------------- |
| user_id                      | Integer  | Primary Key, Auto Increment |
| username                     | String   | Unique, Not Null            |
| password                     | String   | Not Null                    |
| email                        | String   | Unique, Not Null            |
| name                         | String   | Not Null                    |
| date_of_birth                | DateTime | Not Null                    |
| phone_number                 | String   | Nullable                    |
| number_of_volunteered_events | Integer  | Not Null                    |
| preferred_event_type         | String   | Not Null                    |

### Relationships

- `events`: Many-to-Many with `Event` through `helps`
- `courses`: Many-to-Many with `Course` through `takes`

## Event

Represents an event.

| Column                        | Type     | Constraints                 |
| ----------------------------- | -------- | --------------------------- |
| event_id                      | Integer  | Primary Key, Auto Increment |
| event_name                    | String   | Not Null                    |
| event_date                    | DateTime | Not Null                    |
| event_location                | String   | Not Null                    |
| event_description             | String   | Not Null                    |
| number_of_participants        | Integer  | Not Null                    |
| number_of_volunteers          | Integer  | Not Null                    |
| number_of_participants_needed | Integer  | Not Null                    |
| number_of_volunteers_needed   | Integer  | Not Null                    |
| event_type                    | String   | Not Null                    |

### Relationships

- `reviews`: One-to-Many with `Reviews`

## Course

Represents a course.

| Column             | Type    | Constraints                 |
| ------------------ | ------- | --------------------------- |
| course_id          | Integer | Primary Key, Auto Increment |
| course_name        | String  | Not Null                    |
| course_description | String  | Not Null                    |
| course_type        | String  | Not Null                    |
| course_url         | String  | Not Null                    |

## Reviews

Represents a review.

| Column          | Type    | Constraints              |
| --------------- | ------- | ------------------------ |
| review_feedback | String  | Not Null                 |
| review_rating   | Integer | Not Null                 |
| event_id        | Integer | Primary Key, Foreign Key |
| user_id         | Integer | Primary Key, Foreign Key |

## Wellbeing

Represents a wellbeing score.

| Column          | Type     | Constraints                 |
| --------------- | -------- | --------------------------- |
| wellbeing_id    | Integer  | Primary Key, Auto Increment |
| wellbeing_score | Integer  | Not Null                    |
| created_at      | DateTime | Server Default              |
| user_id         | Integer  | Foreign Key                 |

## Many-to-Many Relationships

### user_event_joins

| Column   | Type    | Constraints |
| -------- | ------- | ----------- |
| user_id  | Integer | Foreign Key |
| event_id | Integer | Foreign Key |

### helps

| Column   | Type    | Constraints |
| -------- | ------- | ----------- |
| user_id  | Integer | Foreign Key |
| event_id | Integer | Foreign Key |

### takes

| Column    | Type     | Constraints              |
| --------- | -------- | ------------------------ |
| user_id   | Integer  | Primary Key, Foreign Key |
| course_id | Integer  | Primary Key, Foreign Key |
| deadline  | DateTime | Nullable                 |
| progress  | Integer  | Nullable                 |

### GET /

- Description: Returns a test message.
- Request Method: GET
- Response: JSON
- Response Body:
  ```json
  {
    "message": "test"
  }
  ```

### GET /send-email

- Description: Sends a test email.
- Request Method: GET
- Response: JSON
- Response Body:
  ```json
  {
    "message": "Email sent"
  }
  ```
