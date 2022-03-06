"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash, session
from models import db, connect_db, User, Post, Tag, PostTag
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = "oh-so-secret"
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def home_page():
    """Shows home page"""
    posts = Post.query.order_by(Post.created_at.desc()).limit(5).all()
    
    return render_template("posts.html", posts=posts)


@app.route('/users')
def list_users():
    """Shows list of all users in db"""
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('users.html', users=users)

@app.route('/users/new')
def add_user():
    """Shows a form to create a user"""
    return render_template('add_user.html')

@app.route('/users/new', methods=["POST"])
def create_user():
    """Extract data from the form and create a new user"""
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    
    img_url = request.form.get('img_url')
    img_url = img_url if img_url else None

    user = User(first_name=first_name, last_name=last_name, image_url=img_url)
    db.session.add(user)
    db.session.commit()
    flash(f"User {user.full_name} is successfully created.")

    return redirect(f'/users/{user.id}')

@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Show details about a user"""
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(user_id = user_id).order_by(Post.created_at.desc()).all()

    return render_template("details_user.html", user=user, posts=posts)

@app.route('/users/<int:user_id>/edit')
def show_edit_page(user_id):
    """Show the edit page for a user"""
    user = User.query.get_or_404(user_id)
    return render_template("edit_user.html", user=user)

@app.route('/users/<int:user_id>/edit', methods=["POST"])
def edit_user(user_id):
    """Extract info from the edit form and edit user's info"""
    user = User.query.get_or_404(user_id)

    user.first_name = request.form["first_name"]
    user.last_name = request.form["last_name"]
    img_url = request.form.get('img_url')
    user.img_url = img_url if img_url else None

    db.session.add(user)
    db.session.commit()
    flash(f"User {user.full_name} is successfully edited.")

    return redirect(f'/users/{user_id}')

@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """Delete a User"""

    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()
    flash(f"User {user.full_name} is successfully deleted.")

    return redirect('/users')

@app.route('/users/<int:user_id>/posts/new')
def add_post(user_id):
    """Show form to add a post for that user"""
    user = User.query.get_or_404(user_id)
    tags = Tag.query.order_by(Tag.name).all()

    return render_template('add_post.html', user=user, tags=tags)

@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def create_post(user_id):
    """Handle add form; add post and redirect to the user detail page"""
    
    title = request.form["title"]
    content = request.form["content"]

    tag_ids = [int(num) for num in request.form.getlist("tags")]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    
    post = Post(title=title, content=content, user_id=user_id, tags=tags)

    db.session.add(post)
    db.session.commit()
    flash(f"Post {post.title} is successfully created.")

    return redirect(f'/users/{user_id}')


@app.route('/posts/<int:post_id>')
def show_post(post_id):
    """Show a user's post"""
    post = Post.query.get_or_404(post_id)
    # tags = Tag.query.order_by(Tag.name).all()

    tags = post.tags

    return render_template('details_post.html', post=post, tags=tags)


@app.route('/posts/<int:post_id>/edit')
def show_edit_post(post_id):
    """Show the edit post page for a user"""
    post = Post.query.get_or_404(post_id)
    tags = Tag.query.order_by(Tag.name).all()

    return render_template("edit_post.html", post=post, tags=tags)


@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def edit_post(post_id):
    """Extract info from the edit form and edit user's info"""
    post = Post.query.get_or_404(post_id)
    user_id = post.user_id

    tag_ids = [int(num) for num in request.form.getlist("tags")]
    post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    post.title = request.form["title"]
    post.content = request.form["content"]

   
    db.session.add(post)
    db.session.commit()
    flash(f"{post.title} is successfully edited.")
    

    return redirect(f'/users/{user_id}')



@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def delete_user_post(post_id):
    """Delete a post from the User"""
    post = Post.query.get_or_404(post_id)
    user_id = post.user_id

    db.session.delete(post)
    db.session.commit()
    flash(f"{post.title} is successfully deleted.")

    return redirect(f'/users/{user_id}')


@app.route('/tags')
def show_tags():
    tags = Tag.query.order_by(Tag.name).all()
    
    return render_template('tags.html', tags=tags)

@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    """Show posts with this tag"""
    tag = Tag.query.get_or_404(tag_id)
    posts = tag.posts
    
    return render_template('details_tag.html', tag=tag, posts=posts)

@app.route('/tags/new')
def add_tag():
    """Shows a form to create a tag"""

    return render_template('add_tag.html')

@app.route('/tags/new', methods=["POST"])
def create_tag():
    """Extract data from the form and create a new tag"""
    tag_name = request.form["tag-name"]

    tag = Tag(name = tag_name)
    db.session.add(tag)
    db.session.commit()
    flash(f'Tag {tag.name} is successfully created.')

    return redirect('/tags')


@app.route('/tags/<int:tag_id>/edit')
def show_edit_tag(tag_id):
    """Show the edit page for a tag"""
    tag = Tag.query.get_or_404(tag_id)
    return render_template("edit_tag.html", tag=tag)

@app.route('/tags/<int:tag_id>/edit', methods=["POST"])
def edit_tag(tag_id):
    """Extract info from the edit form and edit tag"""
    tag = Tag.query.get_or_404(tag_id)

    tag.name = request.form["tag-name"] 

    db.session.add(tag)
    db.session.commit()
    flash(f"Tag {tag.name} is successfully edited.")

    return redirect(f'/tags/{tag_id}')


@app.route('/tags/<int:tag_id>/delete', methods=["POST"])
def delete_tag(tag_id):
    """Delete a post from the User"""
    tag = Tag.query.get_or_404(tag_id)
   
    db.session.delete(tag)
    db.session.commit()
    flash(f"{tag.name} is successfully deleted.")

    return redirect('/tags')

