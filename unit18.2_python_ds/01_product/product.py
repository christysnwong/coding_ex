def product(a, b):
    """Return product of a and b.

        >>> product(2, 2)
        4

        >>> product(2, -2)
        -4
    """
    return a * b




# if __name__ in ("__main__", "__console__"):
#     import doctest, inspect, sys
#     m = sys.modules['__main__']
#     m.__test__ = dict((n,v) for (n,v) in globals().items()
#                             if inspect.isclass(v))
#     doctest.testmod(verbose=True)