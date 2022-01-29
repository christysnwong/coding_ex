def sum_pairs(nums, goal):
    """Return tuple of first pair of nums that sum to goal.

    For example:

        >>> sum_pairs([1, 2, 2, 10], 4)
        (2, 2)

    (4, 2) sum to 6, and come before (5, 1):

        >>> sum_pairs([4, 2, 10, 5, 1], 6) # (4, 2)
        (4, 2)

    (4, 3) sum to 7, and finish before (5, 2):

        >>> sum_pairs([5, 1, 4, 8, 3, 2], 7)
        (4, 3)

    No pairs sum to 100, so return empty tuple:

        >>> sum_pairs([11, 20, 4, 2, 1, 5], 100)
        ()
    """

    # Solution 1
    # x = 0
    # y = 1
    # pair = ()

    # while x < len(nums):
    #     while y < len(nums):
    #         if nums[x] + nums[y] == goal:
    #             if pair == ():
    #                 pair = (nums[x], nums[y])
    #             elif pair != () and nums[x] < pair[0]:
    #                 pair = (nums[x], nums[y])
    #             else:
    #                 break
            
    #         else:
    #             y += 1

    #     x += 1
    #     y = x + 1

    # return pair

    # Solution 2
    
    diff_list = []

    for num in nums:
        if num in diff_list:
            return (goal - num, num)
        else:
            diff_list.append(goal - num)

    return ()


