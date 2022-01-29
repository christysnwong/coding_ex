def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """

    # Solution 1
    # count_dict = {}

    # for ltr in phrase:
    #     count_dict[ltr] = phrase.count(ltr)

    # return count_dict

    # Solution 2 w/ comprehension
    return {ltr: phrase.count(ltr) for ltr in phrase}


