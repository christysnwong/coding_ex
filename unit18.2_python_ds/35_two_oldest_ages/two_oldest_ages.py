def two_oldest_ages(ages):
    """Return two distinct oldest ages as tuple (second-oldest, oldest)..

        >>> two_oldest_ages([1, 2, 10, 8])
        (8, 10)

        >>> two_oldest_ages([6, 1, 9, 10, 4])
        (9, 10)

    Even if more than one person has the same oldest age, this should return
    two *distinct* oldest ages:

        >>> two_oldest_ages([1, 5, 5, 2])
        (2, 5)
    """

    # NOTE: don't worry about an optimized runtime here; it's fine if
    # you have a runtime worse than O(n)

    # NOTE: you can sort lists with lst.sort(), which works in place (mutates);
    # you may find it helpful to research the `sorted(iter)` function, which
    # can take *any* type of list-like-thing, and returns a new, sorted list
    # from it.

    # my solution
    
    uni_ages = list(set(ages))
    uni_ages.sort()

    return (uni_ages[len(uni_ages)-2], uni_ages[len(uni_ages)-1])

    # ===========
    # answer key
    # ===========

    # find two oldest by sorting unique; this is O(n log n)

    # uniq_ages = set(ages)
    # oldest = sorted(uniq_ages)[-2:]
    # return tuple(oldest)

    # a longer, but O(n) runtime would be:
    #
    # uniq_ages = set(ages)
    # oldest = None
    # second = None
    #
    # for age in uniq_ages:
    #     if oldest is None or age > oldest:
    #         second = oldest
    #         oldest = age
    #     elif second is None or age > second:
    #         second = age
    #
    # return (second, oldest)