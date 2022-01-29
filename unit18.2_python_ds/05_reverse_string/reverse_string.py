def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    # my solution
    
    list_char = list(phrase)
    list_char.reverse()

    return "".join(list_char)


    # ===========
    # answer key
    # ===========

    # return phrase[::-1]