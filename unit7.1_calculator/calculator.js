window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const defaultValues = {amount: 10000, year: 5, rate: 2.5};
  const amountInput = document.getElementById('loan-amount');
  amountInput.value = defaultValues.amount;
  const yearsInput = document.getElementById('loan-years');
  yearsInput.value = defaultValues.year;
  const rateInput = document.getElementById('loan-rate');
  rateInput.value = defaultValues.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentUIValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentUIValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const monthlyIntRate = values.rate /100 /12;
  const n = Math.floor(values.years * 12);
  const monthlyPay = (values.amount * monthlyIntRate) / ( 1 - ((1 + monthlyIntRate) ** -n));
  return monthlyPay.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyOutput = document.getElementById('monthly-payment');
  monthlyOutput.innerText = `$ ${monthly}`;
}
