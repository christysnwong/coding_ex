


def print_upper_words(list_words, must_start_with):
    """Print only words that start with specified letter in all uppercase  """

    for word in list_words:
        for start_char in must_start_with:
            if word[0].lower() == start_char:
                print(word.upper())


print_upper_words(["Hello", "hey", "goodbye", "yo", "Yes"], {"h", "y"})