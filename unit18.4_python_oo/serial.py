"""Python serial number generator."""

class SerialGenerator:
    """ Machine to create unique incrementing serial numbers
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        """create serial num starting from a given start"""
        self.default = self.start = start - 1

    def __repr__(self):
        return f"<SerialGenerator start={self.start+1} next={self.start+2}>"

    def generate(self):
        """generate an unique serial num by an increment of 1"""
        self.start += 1
        return self.start

    def reset(self):
        """ return to default start """
        self.start = self.default

