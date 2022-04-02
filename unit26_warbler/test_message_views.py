"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from models import db, connect_db, Message, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class MessageViewTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()

        self.client = app.test_client()

        self.testuser = User.signup(username="TestUser1",
                                    email="testuser1@test.com",
                                    password="testuser1",
                                    image_url=None)
        self.testuser.id = 10001

        db.session.commit()

    def test_add_message(self):
        """Can use add a message?"""

        # Since we need to change the session to mimic logging in,
        # we need to use the changing-session trick:

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            # Now, that session setting is saved, so we can have
            # the rest of ours test

            resp = c.post("/messages/new", data={"text": "Hello"})

            # Make sure it redirects
            self.assertEqual(resp.status_code, 302)

            msg = Message.query.one()
            self.assertEqual(msg.text, "Hello")

    def test_add_no_session(self):
        with self.client as c:
            resp = c.post("messages/new", data={"text": "test test"}, follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))

    def test_add_invalid_user(self):
        with self.client as c:
            with c.session_transaction() as session:
                session[CURR_USER_KEY] = 99999

            resp = c.post("messages/new", data={"text": "test test"}, follow_redirects=True)

            # import pdb
            # pdb.set_trace()
            # print(resp.get_data(as_text=True))

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))


    def test_message_show(self):

        message = Message(
            id=10001,
            text="test message 10001",
            user_id = self.testuser.id
        )

        db.session.add(message)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as session:
                session[CURR_USER_KEY] = self.testuser.id

            message = Message.query.get(10001)

            resp = c.get(f'/messages/{message.id}')

            # print(resp.get_data(as_text=True))

            self.assertEqual(resp.status_code, 200)
            self.assertIn(message.text, str(resp.data))

    def test_invalid_message(self):
        with self.client as c:
            with c.session_transaction() as session:
                session[CURR_USER_KEY] = self.testuser.id


            resp = c.get('/messages/11111')

            self.assertEqual(resp.status_code, 404)

    def test_message_delete(self):

        message = Message(
            id=10001,
            text="test message 10001",
            user_id = self.testuser.id
        )

        db.session.add(message)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as session:
                session[CURR_USER_KEY] = self.testuser.id

            resp = c.post(f'/messages/10001/delete', follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            
            message = Message.query.get(10001)
            self.assertIsNone(message)

    def test_unauthen_message_delete(self):

        testuser2 = User.signup(username="TestUser2",
                        email="testuser2@test.com",
                        password="testuser2",
                        image_url=None)
        testuser2.id = 20000

        message = Message(
            id=10001,
            text="test message 10001",
            user_id = self.testuser.id
        )

        db.session.add_all([testuser2, message])
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as session:
                session[CURR_USER_KEY] = 20000

            resp = c.post("/messages/10001/delete", follow_redirects=True)

            # import pdb
            # pdb.set_trace()
            # print(resp.get_data(as_text=True))

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))

            message = Message.query.get(10001)
            self.assertIsNotNone(message)

    def test_message_delete_no_authen(self):

        message = Message(
            id=10001,
            text="test message 10001",
            user_id = self.testuser.id
        )

        db.session.add(message)
        db.session.commit()

        with self.client as c:

            resp = c.post("/messages/10001/delete", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))

            message = Message.query.get(10001)
            self.assertIsNotNone(message)

        

    

        