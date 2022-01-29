def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """

    # my solution
    lst = []

    for bracket in parens:
        if bracket == "(":
            lst.append("(")

        if bracket == ")":
            if "(" in lst:
                lst.pop(lst.index("("))
            else:
                return False

        
    if len(lst) == 0:
        return True
    else:
        return False

    
    # ===========
    # answer key
    # ===========

    # count = 0

    # for p in parens:
    #     if p == '(':
    #         count += 1
    #     elif p == ')':
    #         count -= 1

    #     # fast fail: too many right parens
    #     if count < 0:
    #         return False

    # return count == 0

        

