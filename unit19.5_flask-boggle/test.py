from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    
    def test_home_page(self):
        """ Test if the home page is displaying properly """
        with app.test_client() as client:

            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h3>Welcome to My Boggle Game! Click the button below to begin.</h3>', html)

    
    def test_board_page(self):
        """ Test if the board page is displaying properly """

        with app.test_client() as client:
            resp = client.get('/board?board-size=5')

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<label for="guess">What word(s) can you find?</label>', html)
            self.assertIn('<table id="board" class="5">', html)
            self.assertIn('board', session)
            self.assertIsNone(session.get('bestscore'))
            self.assertIsNone(session.get('numplays'))
            self.assertIn(b'BEST SCORE:', resp.data)

            
    def test_check_word(self):
        """ Test valid words from the server """ 

        with app.test_client() as client:
            with client.session_transaction() as session:
                session['board_size'] = 5
                session['board'] = [["E", "A", "T", "A", "P"], 
                                    ["O", "W", "E", "L", "L"], 
                                    ["U", "R", "T", "O", "T"], 
                                    ["C", "A", "T", "S", "O"], 
                                    ["P", "O", "E", "H", "T"]]

            resp = client.get('checkword?word=eat')
            self.assertEqual(resp.json['result'], 'ok')

            resp = client.get('checkword?word=rainbow')
            self.assertEqual(resp.json['result'], 'not-on-board')

            resp = client.get('checkword?word=aabbccdd')
            self.assertEqual(resp.json['result'], 'not-word')
            

