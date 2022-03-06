from unittest import TestCase

from app import app
from models import db, User, Post, Tag, PostTag

from datetime import datetime

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()


class UserModelTestCase(TestCase):
    """Tests for model for Users."""

    def setUp(self):
        """Clean up any existing users."""

        User.query.delete()
        Post.query.delete()


    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_full_name(self):
        user = User(first_name="TestUser99", last_name="Test99")
        db.session.add(user)
        db.session.commit()

        self.assertEquals(user.full_name, "TestUser99 Test99")


    def test_friendly_date(self):

        user = User(first_name="TestUser", last_name="Test")
        post = Post(title="TestPost1", content="TestPost1 Content", created_at="2022-03-01 01:00:00.0000", user_id=1)
        db.session.add(user, post)
        db.session.commit()

        self.assertEquals(post.friendly_date, "March 1 2022, 1:00 AM")