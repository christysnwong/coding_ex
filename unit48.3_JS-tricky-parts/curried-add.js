function curriedAdd(total) {
  if (total) {
    return function add(x) {
      if (x) {
        total += x;
        return add;
      } else {
        return total;
      }
    };
  } else {
    return 0;
  }
}

module.exports = { curriedAdd };
