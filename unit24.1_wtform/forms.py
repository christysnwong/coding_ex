from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, BooleanField, SelectField
from wtforms.validators import InputRequired, DataRequired, Optional, AnyOf, NumberRange, URL


class AddPetForm(FlaskForm):
    """Form for adding pets."""
    
    name = StringField("Pet name", validators=[
                        InputRequired(message="Pet Name can't be blank")])
    species = SelectField("Species", choices=[
                        ('Dog', 'Dog'), ('Cat', 'Cat'), ('Porcupine', 'Porcupine')])
    photo_url = StringField("Photo URL", validators=[Optional(), URL(require_tld=False)])
    age = IntegerField("Age", validators=[Optional(), NumberRange(min=0, max=30, message="The age has to be between 0 and 30.")])
    notes = StringField("Notes", validators=[Optional()])

class EditPetForm(FlaskForm):
    """Form for editing an existing pet."""

    photo_url = StringField("Photo URL", validators=[Optional(), URL(require_tld=False)])
    age = IntegerField("Age", validators=[Optional(), NumberRange(min=0, max=30, message="The age has to be between 0 and 30.")])
    notes = StringField("Notes", validators=[Optional()])
    available = BooleanField('Available?', default="checked")

