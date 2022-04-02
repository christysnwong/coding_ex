"""User View tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, connect_db, User, Message, Follows, Likes, Follows

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

app.config['WTF_CSRF_ENABLED'] = False


class UserViewTestCase(TestCase):
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

    def test_users(self):
        with self.client as c:
            resp = c.get("/users")

            self.assertIn("@TestUser1", str(resp.data))
            self.assertIn("@TestUser2", str(resp.data))

    def test_users_search(self):
        with self.client as c:
            resp = c.get("/users?q=")

            self.assertIn("@TestUser1", str(resp.data))
            self.assertIn("@TestUser2", str(resp.data))

    def test_user_show(self):
        with self.client as c:
            resp = c.get(f"/users/{self.testuser1.id}")

            self.assertEqual(resp.status_code, 200)
            self.assertIn("@TestUser1", str(resp.data))
    
    def test_user_like(self):
        with self.client as c:
            message = Message(id=9999,
                            text="message 1 test",
                            user_id = self.testuser2.id
            )
            db.session.add(message)
            db.session.commit()

            with c.session_transaction() as session:
                session[CURR_USER_KEY] = self.testuser1.id

            resp = c.post("/messages/9999/like", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)

            like = Likes.query.all()

            self.assertEqual(len(like), 1)
            self.assertEqual(like[0].user_id, self.testuser1.id)

            resp = c.get(f"/users/{self.testuser1.id}/likes")

            self.assertEqual(resp.status_code, 200)
            self.assertIn("message 1 test", str(resp.data))
    
    def test_user_unlike(self):
        self.test_user_like()

        message = Message.query.get(9999)
        self.assertIsNotNone(message)
        self.assertNotEqual(message.user_id, self.testuser1.id)

        # like = Likes.query.filter_by(user_id=self.testuser1.id).all()
        # like = Likes.query.filter(Likes.user_id==self.testuser1.id).all()
        # like = Likes.query.filter_by(message_id=9999).all()
        # like = Likes.query.filter(Likes.message_id==9999).all()
        like = Likes.query.filter(Likes.user_id==self.testuser1.id and Likes.message_id==9999).all()
        self.assertIsNotNone(like)
        self.assertEqual(len(like), 1)

        with self.client as c:
            with c.session_transaction() as session:
                session[CURR_USER_KEY] = self.testuser1.id

            resp = c.post("/messages/9999/like", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)

            like = Likes.query.all()
            self.assertEqual(len(like), 0)

    def test_unauthen_like(self):
        with self.client as c:
            message = Message(id=9999,
                            text="message 1 test",
                            user_id = self.testuser2.id
            )
            db.session.add(message)
            db.session.commit()

            resp = c.post("/messages/9999/like", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)

            self.assertIn("Access unauthorized", str(resp.data))

            like = Likes.query.all()
            self.assertEqual(len(like), 0)

    def test_user_show_follows(self):
        follow = Follows(user_being_followed_id=self.testuser1.id, user_following_id=self.testuser2.id)

        db.session.add(follow)
        db.session.commit()

        with self.client as c:
            resp = c.get(f"/users/{self.testuser1.id}")

            self.assertEqual(resp.status_code, 200)

            self.assertIn("@TestUser1", str(resp.data))
            self.assertIn(f'<a href="/users/{self.testuser1.id}/followers">1</a>', str(resp.data))

            resp = c.get(f"/users/{self.testuser2.id}")

            self.assertEqual(resp.status_code, 200)

            self.assertIn("@TestUser2", str(resp.data))
            self.assertIn(f'<a href="/users/{self.testuser2.id}/following">1</a>', str(resp.data))

    def test_show_followers(self):
        follow = Follows(user_being_followed_id=self.testuser1.id, user_following_id=self.testuser2.id)

        db.session.add(follow)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as session:
                session[CURR_USER_KEY] = self.testuser1.id

            resp = c.get(f"/users/{self.testuser1.id}/followers")

            self.assertIn("@TestUser2", str(resp.data))

    
    def test_show_followering(self):
        follow = Follows(user_being_followed_id=self.testuser1.id, user_following_id=self.testuser2.id)

        db.session.add(follow)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as session:
                session[CURR_USER_KEY] = self.testuser2.id

            resp = c.get(f"/users/{self.testuser2.id}/following")

            self.assertIn("@TestUser1", str(resp.data))

    def test_unauthen_followers_access(self):
        with self.client as c:
            resp = c.get(f"/users/{self.testuser1.id}/followers", follow_redirects=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))

    def test_unauthen_following_access(self):
        with self.client as c:
            resp = c.get(f"/users/{self.testuser1.id}/following", follow_redirects=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))



