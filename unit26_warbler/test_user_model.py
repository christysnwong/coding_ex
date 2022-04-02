"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Message, Follows

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


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        testuser1 = User.signup(username="TestUser1",
                                email="testuser1@test.com",
                                password="testuser1",
                                image_url=None)
        testuser1.id = 10001

        testuser2 = User.signup(username="TestUser2",
                                email="testuser2@test.com",
                                password="testuser2",
                                image_url=None)
        testuser2.id = 10002

        db.session.commit()

        testuser1 = User.query.get(10001)
        testuser2 = User.query.get(10002)

        self.testuser1 = testuser1
        self.testuser2 = testuser2

        self.client = app.test_client()


    def tearDown(self):
        db.session.rollback()



    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)

    def test_user_follows(self):
        self.testuser1.following.append(self.testuser2)
        db.session.commit()

        self.assertEqual(len(self.testuser1.following), 1)
        self.assertEqual(len(self.testuser1.followers), 0)
        self.assertEqual(len(self.testuser2.following), 0)
        self.assertEqual(len(self.testuser2.followers), 1)

        self.assertEqual(self.testuser1.following[0].id, self.testuser2.id)
        self.assertEqual(self.testuser2.followers[0].id, self.testuser1.id)

    def test_is_following(self):
        self.testuser1.following.append(self.testuser2)
        db.session.commit()

        self.assertTrue(self.testuser1.is_following(self.testuser2))
        
    def test_is_followed_by(self):
        self.testuser1.following.append(self.testuser2)
        db.session.commit()

        self.assertTrue(self.testuser2.is_followed_by(self.testuser1))

    
    def test_valid_signup(self):
        testuser3 = User.signup(username="TestUser3",
                                email="testuser3@test.com",
                                password="testuser3",
                                image_url=None)
        testuser3.id = 10003

        testuser3 = User.query.get(10003)

        self.assertIsNotNone(testuser3)
        self.assertEqual(testuser3.username, "TestUser3")
        self.assertEqual(testuser3.email, "testuser3@test.com")
        self.assertNotEqual(testuser3.password, "testuser3")
        self.assertTrue(testuser3.password.startswith("$2b$"))

    def test_invalid_signup_username(self):
        testuser0 = User.signup(username=None,
                                email="testuser0@test.com",
                                password="testuser0",
                                image_url=None)
        testuser0.id = 10000

        with self.assertRaises(exc.IntegrityError) as context:
            db.session.commit()

    def test_invalid_signup_email(self):
        testuser0 = User.signup(username="TestUser0",
                                email=None,
                                password="testuser0",
                                image_url=None)
        testuser0.id = 10000

        with self.assertRaises(exc.IntegrityError) as context:
            db.session.commit()

    def test_invalid_signup_password(self):

        with self.assertRaises(ValueError) as context:
            User.signup("TestUser0", "testuser0@test.com", "", None)

        with self.assertRaises(ValueError) as context:
            User.signup("TestUser0", "testuser0@test.com", None, None)

    def test_valid_authen(self):
        user = User.authenticate(self.testuser1.username, "testuser1")
        self.assertIsNotNone(user)
        self.assertEqual(user.id, self.testuser1.id)

    def test_invalid_authen(self):
        self.assertFalse(User.authenticate("abcde", "testuser1"))
        self.assertFalse(User.authenticate(self.testuser1.username, "abcde"))