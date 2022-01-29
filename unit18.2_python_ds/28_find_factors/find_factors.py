import math

def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """

    factor_list = []

    # solution 1
    # for i in range(1, num + 1):
    #     if num % i == 0:
    #         factor_list.append(i)

    # return factor_list

    # solution 2
    for i in range(1, int(math.sqrt(num)) + 1):
        if num % i == 0:
            factor_list.append(i)
            factor_list.append(int(num / i))
        
    factor_list.sort()

    return factor_list


    # ===========
    # answer key
    # ===========

    # n_list = [n for n in range (1, num // 2 + 1) if num % n == 0]

    # n_list.append(num)

    # return n_list

    # or could write by hand with a while loop
    #
    # factors = []
    #
    # while(n <= num):
    #     if num % n == 0:
    #         factors.append(n)
    #     n += 1
    #
    # return factors