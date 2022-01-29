def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """

    # Solution 1
    return phrase.capitalize()

    # Solution 2
    # return phrase[:1].upper() + phrase[1:]