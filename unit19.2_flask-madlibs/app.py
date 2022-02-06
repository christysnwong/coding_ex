from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import stories

app = Flask(__name__)

app.config['SECRET_KEY'] = "bunbun"
debug = DebugToolbarExtension(app)


@app.route('/')
def select_story():
    """Show list of stories form"""
    return render_template('select.html', stories=stories.values())

@app.route('/form')
def form_page():
    """Show form for selected story"""
    story_id = request.args["story_id"]
    story = stories[story_id]

    return render_template('form.html', story_id=story_id, title=story.title, words=story.prompts)


@app.route('/story')
def story_page():
    """Generate the story on page"""
    
    # place = request.args.get("place")
    # noun = request.args.get("noun")
    # verb = request.args.get("verb")
    # adjective = request.args.get("adjective")
    # plural_noun = request.args.get("plural_noun")

    # input = {
    #     "place": place,
    #     "noun": noun,
    #     "verb": verb,
    #     "adjective": adjective,
    #     "plural_noun": noun
    # }

    # ans = {word: input[word] for word in story.prompts if input[word]} 
    # print(request.args)
    # story_text = story.generate(ans)
    story_id = request.args["story_id"]
    story = stories[story_id]

    story_text = story.generate(request.args)

    return render_template("story.html", story_title=story.title, story_text=story_text)