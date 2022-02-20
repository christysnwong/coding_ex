from flask import Flask, request, render_template, redirect, flash, jsonify, session
from boggle import Boggle
from flask_debugtoolbar import DebugToolbarExtension

boggle_game = Boggle()

app = Flask(__name__)

app.config['SECRET_KEY'] = "bunbun123"
# debug = DebugToolbarExtension(app)


@app.route('/')
def show_homepage():
    """ display homepage """ 
    session['board'] = []

    return render_template('index.html')


@app.route('/board')
def show_board():
    """ make and display board based on user's input on board's size """ 

    try:
        board_size = int(request.args['board-size'])
    except KeyError:
        board_size = session['board_size']
        
    board = boggle_game.make_board(board_size)

    session['board'] = board
    session['board_size'] = board_size
    bestscore = session.get("bestscore", 0)
    numplays = session.get("numplays", 0)

    return render_template('board.html', board=board, board_size=board_size, bestscore=bestscore, numplays=numplays)


@app.route('/checkword')
def check_word():
    """ check user's word and see if it's a valid word that exists on both the board and the dictionary """

    user_word = request.args['word']
    result = boggle_game.check_valid_word(session['board'], user_word, session['board_size'])

    return jsonify({"result": result})



@app.route('/post-score', methods=["POST"])
def post_score():
    """ post best score on the server, check number of plays """

    score = request.json["score"]

    bestscore = session.get("bestscore", 0)
    numplays = session.get("numplays", 0)

    session['numplays'] = numplays + 1
    session['bestscore'] = max(score, bestscore)
    
    return jsonify(brokeRecord=score > bestscore)