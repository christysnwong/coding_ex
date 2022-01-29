def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """

    # my solution 
    # - less efficient than answer key, needs to go over the string twice

    vowels_lookup = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
    
    vowels_list = []
       
    str_list = list(s)

    for ltr in s:
        if ltr in vowels_lookup:
            vowels_list.append(ltr)

    for idx in range(len(str_list)):
        if str_list[idx] in vowels_lookup:
            str_list[idx] = vowels_list.pop()

    return "".join(str_list)


    # ===========
    # answer key
    # ===========

    # vowels = set("aeiou")

    # string = list(s)

    # i = 0
    # j = len(s) - 1

    # while i < j:
    #     if string[i].lower() not in vowels:
    #         i += 1
    #     elif string[j].lower() not in vowels:
    #         j -= 1
    #     else:
    #         string[i], string[j] = string[j], string[i]
    #         i += 1
    #         j -= 1


    # return "".join(string)
