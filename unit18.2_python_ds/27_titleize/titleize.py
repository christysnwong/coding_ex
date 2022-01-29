def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    # my solution

    words_list = phrase.lower().split(" ")

    return " ".join(word.capitalize() for word in words_list)


    # ===========
    # answer key
    # ===========

    # return phrase.title()
