def last_element(lst):
    """Return last item in list (None if list is empty.
    
        >>> last_element([1, 2, 3])
        3
        
        >>> last_element([]) is None
        True
    """

    # my solution
    
    if len(lst) == 0:
        return None
    else:
        print(lst[len(lst)-1])

    # ===========
    # answer key
    # ===========

    # if lst:
    #     return lst[-1]

    # we don't need to do anything else; functions
    # return None by default
