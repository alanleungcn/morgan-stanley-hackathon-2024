import numpy as np
import pandas as pd
import altair as alt
from flask import request, jsonify, send_file
from config import app, db
# from models import <db>

@app.route("/", methods=['GET'])
def main():
    return jsonify({"message": "test"})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)