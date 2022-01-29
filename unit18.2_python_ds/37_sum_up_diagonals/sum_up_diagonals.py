def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """

    # my solution 

    tlbr_sum = 0
    bltr_sum = 0

    matrix_size = len(matrix)

    a = 0
    b = matrix_size - 1

    while a < matrix_size and b >= 0:
        tlbr_sum += matrix[a][a]
        bltr_sum += matrix[a][b]
        a += 1
        b -= 1


    return tlbr_sum + bltr_sum

    # ===========
    # answer key
    # ===========

    total = 0

    for i in range(len(matrix)):
        total += matrix[i][i]
        total += matrix[i][-1 - i]

    return total

    or
    return sum([matrix[i][i] + matrix[i][-1 - i] for i in range(len(matrix))])
