def three_odd_numbers(nums):
    """Is the sum of any 3 sequential numbers odd?"

        >>> three_odd_numbers([1, 2, 3, 4, 5])
        True

        >>> three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0])
        True

        >>> three_odd_numbers([5, 2, 1])
        False

        >>> three_odd_numbers([1, 2, 3, 3, 2])
        False
    """
    # my solution
    start_idx = 0
    
    while start_idx < len(nums) - 2:
        sum = 0

        for idx in range(3):
            sum += nums[start_idx + idx] 

        if sum % 2 != 0:
            return True
        
        start_idx += 1


    return False

    # ===========
    # answer key
    # ===========

    # for i in range(len(nums) - 2):
    #     if (nums[i] + nums[i + 1] + nums[i + 2]) % 2 != 0:
    #         return True

    # return False