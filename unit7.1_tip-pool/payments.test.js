
describe("submit & create payment info", function() {
    beforeEach(function () {
        // initialization logic
        billAmtInput.value = 50; 
        tipAmtInput.value = 5; 
    });
  
    it('should create payment info correctly with submitPaymentInfo() & createCurPayment()', function () {
        submitPaymentInfo();
              
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1']['billAmt']).toEqual('50');
        expect(allPayments['payment1']['tipAmt']).toEqual('5');
        expect(allPayments['payment1']['tipPercent']).toEqual(10);
    });

    it('should not add payment info if it is not a valid input with submitPaymentInfo() & createCurPayment()', function () {
        billAmtInput.value = ''; 
        submitPaymentInfo();
              
        expect(Object.keys(allPayments).length).toEqual(0);
    });
    

    it('should append payment table with appendPaymentTable()', function () {
        submitPaymentInfo();

        let paymentTds = document.querySelectorAll('#paymentTable tbody tr td');

        expect(paymentTds.length).toEqual(4);
        expect(paymentTds[0].innerText).toEqual('$50');
        expect(paymentTds[1].innerText).toEqual('$5');
        expect(paymentTds[2].innerText).toEqual('10%');
        expect(paymentTds[3].innerText).toEqual('X');

    });

    it('should create new payment with createCurPayment()', function () {
        let checkPayment = {
            billAmt: '50',
            tipAmt: '5',
            tipPercent: 10
        }

        expect(createCurPayment()).toEqual(checkPayment);

    });

    it('should not create new payment with invalid input with createCurPayment()', function () {
        billAmtInput.value = ''; 
        
        expect(createCurPayment()).toEqual(undefined);

    });

    it('should update summary table corectly with updateSummary()', function () {
        submitPaymentInfo();

        expect(summaryTds[0].innerText).toEqual('$50');
        expect(summaryTds[1].innerText).toEqual('$5');
        expect(summaryTds[2].innerText).toEqual('10%');

    })
    

  afterEach(function() {
    // teardown logic
    billAmtInput.value = '';
    tipAmtInput.value = '';
    paymentTbody.innerHTML = '';
    summaryTds[0].innerHTML = '';
    summaryTds[1].innerHTML = '';
    summaryTds[2].innerHTML = '';
    serverTbody.innerHTML = '';
    paymentId = 0;
    allPayments = {};

  });
});
