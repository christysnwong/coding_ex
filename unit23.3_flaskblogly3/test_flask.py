from unittest import TestCase
from app import app
from models import db, User, Post, Tag, PostTag



# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class UserTests(TestCase):


    def setUp(self):
        """Add sample user"""


        user = User(first_name="TestUser", last_name="Test")
        post = Post(title="TestPost1", content="TestPost1 Content", created_at="2022-03-01 01:00:00.0000", user_id=1)
        db.session.add(user)
        db.session.add(post)
        db.session.commit()

        self.user_id = user.id
        self.post_id = post.id


    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    # def test_home_page(self):
    #     """ Test if the home page is redirecting properly """
    #     with app.test_client() as client:
    #         resp = client.get("/")
    #         html = resp.get_data(as_text=True)

    #         self.assertEqual(resp.status_code, 302)


    def test_users_page(self):
        """ Test if the user page is displaying properly """
        with app.test_client() as client:
            resp = client.get("/users")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('TestUser', html) 
            self.assertIn('<h1>Users</h1>', html)

    def test_show_user_detail(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h2>TestUser Test</h2>', html)

    def test_show_add_form(self):
        with app.test_client() as client:
            resp = client.get("/users/new")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Create a User</h1>', html)

    def test_add_user(self):
        with app.test_client() as client:
            data = {"first_name": "TestUser2", "last_name": "Test2"}
            resp = client.post("/users/new", data=data, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h2>TestUser2 Test2</h2>', html)

    def test_show_edit_form(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}/edit")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Edit a User</h1>', html)

    def test_edit_user(self):
        with app.test_client() as client:
            data = {"first_name": "TestUser99", "last_name": "Test99"}
            resp = client.post(f"/users/{self.user_id}/edit", data=data, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('TestUser99', html)

    def test_delete_user(self):
        with app.test_client() as client:
            
            resp = client.post(f"/users/{self.user_id}/delete", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('User TestUser Test is successfully deleted', html)
 

    def test_posts_page(self):
        """ Test if the posts page is displaying properly """
        with app.test_client() as client:
            resp = client.get("/")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Blogly Recent Posts', html) 
            self.assertIn('TestPost1', html) 

    def test_show_post_detail(self):
        with app.test_client() as client:
            resp = client.get(f"/posts/{self.post_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<p>TestPost1 Content</p>', html)


    def test_show_post_form(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}/posts/new")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Add Post for', html)

    def test_add_post(self):
        with app.test_client() as client:
            data = {"title":"TestPost2", "content":"TestPost2 Content", "user_id":self.user_id}
            
            resp = client.post(f"/users/{self.user_id}/posts/new", data=data, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('TestPost2', html)

    def test_show_edit_post_form(self):
        with app.test_client() as client:
            resp = client.get(f"/posts/{self.post_id}/edit")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Edit Post</h1>', html)

    def test_edit_post(self):
        with app.test_client() as client:
            data = {"title":"TestPost3", "content":"TestPost3 Content", "user_id":self.user_id}
            resp = client.post(f"/posts/{self.post_id}/edit", data=data, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('TestPost3', html)

    def test_delete_post(self):
        with app.test_client() as client:
            
            resp = client.post(f"/posts/{self.post_id}/delete", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("TestPost1 is successfully deleted.", html)