"""Models for Pet Adotpion"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

default_img = "https://e7.pngegg.com/pngimages/270/666/png-clipart-pet-sitting-dog-walking-cat-dog-and-cat-mammal-cat-like-mammal-thumbnail.png"

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class Pet(db.Model):
    """Pet"""

    __tablename__ = 'pets'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    name = db.Column(db.String(30),
                    nullable=False)
    species = db.Column(db.String(30),
                    nullable=False)
    photo_url = db.Column(db.Text,
                    nullable=True)
                    # default='/static/default-pet-image.jpg')
    age = db.Column(db.Integer,
                    nullable=True)
    notes = db.Column(db.Text,
                    nullable=True,
                    default="Not provided")
    available = db.Column(db.Boolean,
                    nullable=False,
                    default=True)

    def __repr__(self):
        me = self
        return f"<Pet id={me.id} name={me.name} species={me.species}>"

    @property
    def image_url(self):
        """Return image for pet """
        return self.photo_url or default_img
