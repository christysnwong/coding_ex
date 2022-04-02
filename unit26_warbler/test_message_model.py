"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from models import db, User, Message, Follows, Likes

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

class MessageModelTestCase(TestCase):
    """Test for message model"""

    def setUp(self):
        """Setup sample user and cleanup existing data"""
        db.drop_all()
        db.create_all()

        # Method 1
        user = User.signup(
            username="TestUser1",
            email="testuser1@test.com",
            password="testuser1",
            image_url=None
            )
        user.id = 10001

        # Method 2
        # user = User.signup("TestUser1", "testuser1@test.com", "testuser1", None)

        db.session.commit()

        self.user = User.query.get(user.id)
        self.user_id = user.id

        self.client = app.test_client()

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_message_model(self):

        message = Message(
            text="test message 1",
            user_id=self.user_id
        )

        db.session.add(message)
        db.session.commit()

        self.assertEqual(self.user.messages[0].text, "test message 1")
        self.assertEqual(len(self.user.messages), 1)

    def test_message_likes(self):
        message1 = Message(
            text="test message 1",
            user_id=self.user_id
        )

        message2 = Message(
            text="test message 2",
            user_id=self.user_id
        )

        user2 = User.signup(
            username="TestUser2",
            email="testuser2@test.com",
            password="testuser2",
            image_url=None
            )
        user2.id = 10002

        db.session.add_all([message1, message2, user2])
        db.session.commit()

        user2.likes.append(message1)

        db.session.commit()

        likes = Likes.query.filter(Likes.user_id == user2.id).all()
        self.assertEqual(likes[0].message_id, message1.id)
        self.assertEqual(len(likes), 1)