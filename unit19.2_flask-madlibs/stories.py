"""Madlibs Stories."""


class Story:
    """Madlibs story.

    To  make a story, pass a list of prompts, and the text
    of the template.

        >>> s = Story(["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing
    of {prompt: answer, promp:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, id, title, words, text):
        """Create story with words and template text."""
        
        self.id = id
        self.title = title
        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text



# Here's a story to get you started
# answer = {"place": "Bun's stomach", "verb": "eat", "noun": "bunbun", "adjective": "yum yum", "plural_noun": "buns"}

story1 = Story(
    "long-ago",
    "Once upon a time",
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)

story2 = Story(
    "love",
    "What do you a love",
    ["noun", "verb"],
    """I love to {verb} a good {noun}."""
)

story3 = Story(
    "bunny",
    "A bunny story",
    ["bunny_name", "adjective", "fun_event", "noun"],
    """Once there was bunny named {bunny_name}. He was {adjective} and nobody liked him.
       One day there was a {fun_event} and the {adjective} bunny won. 
       He got a {noun} and then everybody liked {bunny_name}. 
       He made lots of new friends and lived happily ever after."""
)


stories = {story.id: story for story in [story1, story2, story3]}