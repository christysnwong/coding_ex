"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
# from flask import url_for
from datetime import datetime

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

    posts = db.relationship("Post", backref="user", cascade="all, delete-orphan")

    def __repr__(self):
        me = self
        return f"<User id={me.id} first_name={me.first_name} last_name={me.last_name}>"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

class Post(db.Model):
    """Post"""

    __tablename__ = 'posts'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    title = db.Column(db.String(30),
                    nullable=False)
    content = db.Column(db.Text,
                    nullable=False)
    created_at = db.Column(db.Text,
                    nullable=False,
                    default=datetime.now)
    user_id = db.Column(db.Integer,
                    db.ForeignKey('users.id'),
                    nullable=False)

    # users = db.relationship('User')
    
    def __repr__(self):
        s = self
        return f"<Post id={s.id} title={s.title} content={s.content} created_at={s.created_at} user_id={s.user_id}>"

    @property
    def friendly_date(self):
        """Return formatted date."""

        # print("##########")
        # print(type(self.created_at))
        # print("##########")

        x = datetime.strptime(self.created_at, '%Y-%m-%d %H:%M:%S.%f')
        return x.strftime("%B %-d %Y, %-I:%M %p")
        
        
class Tag(db.Model):
    """Tag"""

    __tablename__ = 'tags'

    id = db.Column(db.Integer, 
                    primary_key=True,
                    autoincrement=True)
    name = db.Column(db.String(20),
                    nullable=False,
                    unique=True)

    posts = db.relationship('Post', 
                    secondary='post_tags',
                    backref='tags')

    def __repr__(self):
        s = self
        return f"<Tag id={s.id} name={s.name}>"


class PostTag(db.Model):
    """Mapping of tags to a post."""

    __tablename__ = "post_tags"

    post_id = db.Column(db.Integer,
                    db.ForeignKey("posts.id"),
                    primary_key=True)
    tag_id = db.Column(db.Integer,
                    db.ForeignKey("tags.id"),
                    primary_key=True)
        