from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import UserForm, LoginForm, FeedbackForm
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import Unauthorized

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
# db.drop_all()
db.create_all()

toolbar = DebugToolbarExtension(app)


@app.route('/')
def home_page():
    """Show homepage"""
    
    return redirect('/register')


@app.route('/register', methods=['GET', 'POST'])
def register_user():
    """Register a user """
    form = UserForm()

    # username = session.get('username')

    if 'username' in session:
        username = session['username']
        return redirect(f'/users/{username}')

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(username, password, email, first_name, last_name)

        db.session.add(new_user)

        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken.  Please pick another')
            return render_template('register.html', form=form)
        # session['user_id'] = new_user.id
        session['username'] = new_user.username
        flash('Welcome! Successfully Created Your Account!', "success")
        return redirect(f'/users/{new_user.username}')

    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login_user():
    """ Login a user"""

    form = LoginForm()

    # username = session.get('username')

    if 'username' in session:
        username = session['username']
        return redirect(f'/users/{username}')

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            flash(f"Welcome Back, {user.username}!", "primary")
            # session['user_id'] = user.id
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Invalid username/password.']

    return render_template('login.html', form=form)


@app.route('/secret')
def secret_page():
    """Shows secrete page after the user is logged in"""
    # if 'user_id' not in session:
    if 'username' not in session:
        flash("Please login first!", "danger")
        return redirect('/login')

    return "You made it!"


@app.route('/logout')
def logout_user():
    """ Log out a user """
    # session.pop('user_id')
    session.pop('username')
    flash("Goodbye!", "info")
    return redirect('/')

@app.route('/users/<username>')
def show_user_info(username):
    """Show user's info after logging in"""

    if 'username' not in session:
        flash("Please login first!", "danger")
        return redirect('/login')

    if username == session['username']:
        user = User.query.filter_by(username = username).first()
        feedbacks = Feedback.query.filter_by(username = username).all()

        return render_template("user_info.html", user=user, username=username, feedbacks=feedbacks)
    else:
        flash("Sorry! You are not authorized to view this page.", "danger")
        return redirect('/')

@app.route('/users/<username>/delete', methods=['GET', 'POST'])
def delete_user(username):
    """Delete a User"""

    if 'username' not in session:
        flash("Please login first!", "danger")
        return redirect('/login')

    if username == session['username']:
        user = User.query.filter_by(username = username).first()

        db.session.delete(user)
        db.session.commit()
        session.pop('username')
        flash(f"User {username} is successfully deleted.", 'success')

        return redirect('/login')
    else:
        flash("Sorry! You are not authorized to delete this user!", "danger")
        return redirect('/login')

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    """Allows user to add feedback"""

    if 'username' not in session:
        flash("Please login first!", "danger")
        return redirect('/login')

    if username == session['username']:
        form = FeedbackForm()

        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data
            new_feedback = Feedback(title=title, content=content, username=session['username'])
            db.session.add(new_feedback)
            db.session.commit()
            flash(f'Feedback {title} is Created!', 'success')
            return redirect(f'/users/{username}')

        return render_template("add_feedback.html", form=form, username=username)
    else:
        flash("Sorry! You are not authorized to add this feedback!", "danger")
        return redirect('/login')

@app.route('/feedback/<int:id>/update', methods=['GET', 'POST'])
def edit_feedback(id):
    """Allows user to edit feedback"""

    feedback = Feedback.query.get_or_404(id)
    
    user = feedback.user
    username = feedback.username
    
    if 'username' not in session:
        flash("Please login first!", "danger")
        return redirect('/login')

    if username == session['username']:
        
        form = FeedbackForm(obj=feedback)

        if form.validate_on_submit():
            feedback.title = form.title.data
            feedback.content = form.content.data
           
            db.session.commit()
            flash('Feedback is Editted!', 'success')
            return redirect(f'/users/{username}')

        return render_template("edit_feedback.html", form=form, username=username)
    else:
        # raise Unauthorized()
        flash("Sorry! You are not authorized to edit this feedback!", "danger")
        return redirect('/login')


    
@app.route('/feedback/<int:id>/delete', methods=['GET', 'POST'])
def delete_feedback(id):
    """Allows user to delete feedback"""

    feedback = Feedback.query.get_or_404(id)
    
    user = feedback.user
    username = feedback.username
    
    if 'username' not in session:
        flash("Please login first!", "danger")
        return redirect('/login')

    if username == session['username']:
        
        db.session.delete(feedback)
        db.session.commit()
        
        flash('Feedback is Deleted!', 'success')
        return redirect(f'/users/{username}')
    else:
        flash("Sorry! You are not authorized to delete this feedback!", "danger")
        return redirect('/login')


@app.errorhandler(401)
def page401_not_authorized(e):
    """Show 401 NOT AUTHORIZED page."""

    return render_template('404.html'), 401

@app.errorhandler(404)
def page404_not_found(e):
    """Show 404 NOT FOUND page."""

    return render_template('404.html'), 404