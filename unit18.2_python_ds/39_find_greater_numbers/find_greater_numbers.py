def find_greater_numbers(nums):
    """Return # of times a number is followed by a greater number.

    For example, for [1, 2, 3], the answer is 3:
    - the 1 is followed by the 2 *and* the 3
    - the 2 is followed by the 3

    Examples:

        >>> find_greater_numbers([1, 2, 3])
        3

        >>> find_greater_numbers([6, 1, 2, 7])
        4

        >>> find_greater_numbers([5, 4, 3, 2, 1])
        0

        >>> find_greater_numbers([])
        0
    """
    # my solution

    a = 0
    b = a + 1
    count = 0

    while a < len(nums) -1:
        while b < len(nums):
            if nums[b] > nums[a]:
                count += 1

            b += 1
        
        a += 1
        b = a + 1

    return count

    # ===========
    # answer key
    # ===========

    # count = 0

    # for i in range(len(nums)):
    #     for j in range(i + 1, len(nums)):
    #         if nums[j] > nums[i]:
    #             count += 1

    # return count
