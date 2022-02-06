from flask import Flask, request, render_template, redirect, flash, jsonify, session
from random import randint,  choice, sample
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)

app.config['SECRET_KEY'] = "bunbun123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

responses = []
survey_length = len(survey.questions)


@app.route('/')
def home_page():
    """Shows home page"""
    
    return render_template('home.html', length = survey_length, title=survey.title, instructions=survey.instructions)

@app.route('/questions/<int:question_id>')
def get_question(question_id):
    
    if len(responses) == survey_length:
        flash('All the questions are already completed.', 'error')
        return redirect('/thanks')

    if question_id >= survey_length:
        flash('Sorry. The question that you are trying to access is invalid.', 'error')
        return redirect('/questions/' + str(len(responses)))
    elif question_id != len(responses):
        flash('Please answer the questions in order', 'error')
        # flash(responses)
        return redirect('/questions/' + str(len(responses)))

    # get question and choices from survey
    survey_question = survey.questions[question_id].question
    survey_choices = survey.questions[question_id].choices
    
    return render_template('questions.html', id = question_id, survey_length = survey_length, question = survey_question, choices = survey_choices)

@app.route('/answer', methods=["POST"])
def get_answer():
    ans = request.form.get('response')

    # add response to response list
    responses.append(ans)

    # msg = 'Your respnose for question ' + str(len(responses)) + ' is submitted!' 
    # flash(msg, 'success')

    print("#####")
    print(responses)
    print("#####")
    
   
    if len(responses) < survey_length:
        return redirect('/questions/' + str(len(responses)))
    else:
        return redirect('/thanks')


@app.route('/thanks')
def thanks_page():
    return render_template('thanks.html')