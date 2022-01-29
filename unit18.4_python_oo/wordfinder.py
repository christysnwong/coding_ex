from random import choice


class WordFinder:
    """ Word Finder: finds random words from a dictionary.
    
    >>> wf = WordFinder("words2.txt")
    3 words read

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True
        
    """

    def __init__(self, filename):
        """return # of words read from file"""

        file = open(filename)

        self.word_list = self.read_file(file)

        print(f"{len(self.word_list)} words read")

    def read_file(self, file):
        """read file and get a list of words"""

        return [line.strip() for line in file]

    def random(self):
        """get a random word from the list of words"""

        return choice(self.word_list)

class RandomWordFinder(WordFinder):
    """Special word finder to read files with other formats
        
    >>> swf = RandomWordFinder("words3.txt")
    5 words read

    >>> swf.random() in ["cat", "dog", "parrot", "cow", "pig"]
    True

    >>> swf.random() in ["cat", "dog", "parrot", "cow", "pig"]
    True

    >>> swf.random() in ["cat", "dog", "parrot", "cow", "pig"]
    True

    >>> swf.random() in ["cat", "dog", "parrot", "cow", "pig"]
    True
        
    """

    def read_file(self, file):
        """read file and get a list of words, skipping # comments or blanks"""

        return [line.strip() for line in file if line[0] != "#" and line.strip()]

