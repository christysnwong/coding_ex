def repeat(phrase, num):
    """Return phrase, repeated num times.

        >>> repeat('*', 3)
        '***'

        >>> repeat('abc', 2)
        'abcabc'

        >>> repeat('abc', 0)
        ''

    Ignore illegal values of num and return None:

        >>> repeat('abc', -1) is None
        True

        >>> repeat('abc', 'nope') is None
        True
    """

    # Solution 1
    # lst = []

    # if type(num) == int and num >= 0:
    #     for count in range(num):
    #         lst.append(phrase)
    #     return "".join(lst)
    # else:
    #     return None

    # Solution 2
    # if type(num) == int and num >= 0:
    #     return "".join([phrase for count in range(num)])
    # else:
    #     return None

    # Solution 3
    if type(num) == int and num >= 0:
        return phrase * num
    else:
        return None

    
    # ===========
    # answer key
    # ===========

    # if not isinstance(num, int) or num < 0:
    #     return None

    # return phrase * num