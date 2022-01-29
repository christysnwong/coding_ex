def remove_every_other(lst):
    """Return a new list of other item.

        >>> lst = [1, 2, 3, 4, 5]

        >>> remove_every_other(lst)
        [1, 3, 5]

    This should return a list, not mutate the original:

        >>> lst
        [1, 2, 3, 4, 5]
    """
    # solution 1
    # return [num for num in lst if num % 2 != 0]

    # solution 2
    # my_lst = []
    # for num in range(len(lst)):
    #     if num % 2 == 0:
    #         my_lst.append(lst[num])
    
    # return my_lst

    # solution 3
    return [lst[num] for num in range(len(lst)) if num % 2 == 0]


    # ===========
    # answer key
    # ===========


    # return lst[::2]

    # Okay way
    #
    # return [val for i, val in enumerate(lst) if i % 2 == 0]
