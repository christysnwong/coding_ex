"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
# from flask import url_for

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class User(db.Model):
    """User"""

    __tablename__ = 'users'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.String(30),
                    nullable=False)
    last_name = db.Column(db.String(30),
                    nullable=False)
    image_url = db.Column(db.String(200),
                    nullable=True,
                    # default='https://cdn.landesa.org/wp-content/uploads/default-user-image.png')
                    # default=url_for('static', filename='default-user-image.png'))
                    default='/static/default-user-image.png')

    def __repr__(self):
        me = self
        return f"<User id={me.id} first_name={me.first_name} last_name={me.last_name}>"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    