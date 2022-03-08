"""Adoption Agency application"""

from flask import Flask, request, render_template, redirect, flash, session
from models import db, connect_db, Pet
from flask_debugtoolbar import DebugToolbarExtension
from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///petadoption'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = "secret"
debug = DebugToolbarExtension(app)

connect_db(app)
# db.drop_all()
db.create_all()

@app.route('/')
def home_page():
    """Shows home page"""
    pets = Pet.query.all()
    
    return render_template("pets.html", pets=pets)

@app.route('/add', methods=["GET", "POST"])
def show_add_pet():
    """Shows add pet form and handles form submission"""
    form = AddPetForm()
    if form.validate_on_submit():
        # name = form.name.data
        # species = form.species.data
        # photo_url = form.photo_url.data
        # photo_url = photo_url if photo_url else None
        # age = form.age.data
        # notes = form.notes.data
        # notes = notes if notes else None

        # pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)
        data = {k: v for k, v in form.data.items() if k != "csrf_token"}
        pet = Pet(**data)

        db.session.add(pet)
        db.session.commit()
        
        # flash(f"A new pet is added: name is {name}, species is {species}")
        flash(f"A new pet is added: name is {pet.name}, species is {pet.species}")

        return redirect('/')
    else:
        return render_template("add_pet.html", form=form)

@app.route('/<int:id>', methods=["GET", "POST"])
def show_edit_pet(id):
    """Shows edit pet form and handles form submission"""

    pet = Pet.query.get_or_404(id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        
        db.session.add(pet)
        db.session.commit()
        flash(f"This pet's info is succesfully updated.")
        return redirect('/')
    else:
        return render_template("pet_info.html", pet=pet, form=form)
