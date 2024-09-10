from flask import render_template
from .. import app
from datetime import timedelta, date
from requests import get
from ..db import Event, Session, User
from flask_login import current_user, login_required

@app.get("/")
@login_required
def main():
    mock_data = {

    }
    for item in range(5):
        event_date = date.today() + timedelta(days=item)
        date_str = event_date.strftime("%d %B")
        events = [
            get("https://www.boredapi.com/api/activity?minaccessibility=0&maxaccessibility=0.1").json().get("activity"),
            get("https://www.boredapi.com/api/activity?minaccessibility=0&maxaccessibility=0.1").json().get("activity"),
        ]
        mock_data[date_str] = events
        with Session.begin() as session:
            user = session.query(User).where(User.email == current_user.email).first()
            print(user)
            session.add_all([Event(header=event, start_date=event_date, user=user) for event in events])

    return render_template("main.html", iterable=mock_data)