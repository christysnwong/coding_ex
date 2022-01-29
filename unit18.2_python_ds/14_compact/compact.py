def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """

    # Solution 1
    # my_lst = []
 
    # for ele in lst:
    #     if ele:
    #         my_lst.append(ele)

    # return my_lst

    # Solution 2
    return [ele for ele in lst if ele]

