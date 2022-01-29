def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    # Solution 1
    # vowel_list = ['a', 'e', 'i', 'o', 'u']
    # vowel_dict = {}

    # for ltr in phrase.lower():
    #     if ltr in vowel_list:
    #         vowel_dict[ltr] = phrase.lower().count(ltr)
    
    # return vowel_dict

    # Solution 2 w/ comprehension
    vowel_list = ['a', 'e', 'i', 'o', 'u']

    return {ltr: phrase.lower().count(ltr) for ltr in phrase.lower() if ltr in vowel_list}

    # ===========
    # answer key
    # ===========

    # phrase = phrase.lower()
    # counter = {}

    # for ltr in phrase:
    #     if ltr in VOWELS:
    #         counter[ltr] = counter.get(ltr, 0) + 1

    # return counter