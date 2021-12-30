
it('should calculate the monthly rate correctly', function () {
  const values = {
    amount: 10000,
    years: 5,
    rate: 2.5
  };
  expect(calculateMonthlyPayment(values)).toEqual('177.47');
});

it("should return a result with 2 decimal places", function() {
  const values = {
    amount: 9984,
    years: 5,
    rate: 2
  };
  expect(calculateMonthlyPayment(values)).toEqual('175.00');
});

it("should handle more than lifelong years", function() {
  const values = {
    amount: 10000,
    years: 200,
    rate: 2
  };
  expect(calculateMonthlyPayment(values)).toEqual('16.98');
});
