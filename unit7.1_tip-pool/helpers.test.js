describe("Calculate sum payment total and tip amount", function() {
    beforeEach(function () {
      // initialization logic
      billAmtInput.value = 50; 
      tipAmtInput.value = 5; 
      submitPaymentInfo();
    });
  
    it('should calculate sum of billAmt on sumPaymentTotal(type)', function () {
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
      submitPaymentInfo();
        
      expect(sumPaymentTotal('billAmt')).toEqual(150);
    });

    it('should calculate sum of tipAmt on sumPaymentTotal(type)', function () {
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
      submitPaymentInfo();
        
      expect(sumPaymentTotal('tipAmt')).toEqual(25);
    });

    it('should calculate sum of tipPercent on sumPaymentTotal(type)', function () {
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
      submitPaymentInfo();
        
      expect(sumPaymentTotal('tipPercent')).toEqual(30);
    });
  
    it('should attach td to tr', function () {
      let newTr = document.createElement('tr');
      
      appendTd(newTr, 'test')
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerText).toEqual('test');

    });

    it('should delete the tr', function () {
      let newTr = document.createElement('tr');
      
      appendDeleteBtn(newTr);

      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerText).toEqual('X');

    });



  afterEach(function() {
    // teardown logic
    billAmtInput.value = '';
    tipAmtInput.value = '';
    paymentTbody.innerHTML = '';
    summaryTds[0].innerHTML = '';
    summaryTds[1].innerHTML = '';
    summaryTds[2].innerHTML = '';
    allPayments = {};
    paymentId = 0;

  });
});
