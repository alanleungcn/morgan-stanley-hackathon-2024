from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_mail import Mail


app = Flask(__name__)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'sample@gmail.com'  
app.config['MAIL_PASSWORD'] = 'App Password'     
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

app.secret_key = 'your_secret_key_here'

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"

# DB_NAME=<table_name>
# DB_USER=
# DB_PASSWORD=
# DB_HOST=localhost

# DB_URL = "mysql+mysqlconnector://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}"

app.config["AQLADCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app,db)
CORS(app)