// input - pin, optional initial deposit
// output - bank account 

// return obj {
//     checkBalance,
//      - input - PIN
//      - output - curr balance or "invalid PIN"
//     deposit
//      - input - PIN, deposit amt
//      - increment deposit amt
//      - output - invalid PIN if it's invalid
//     withdraw
//      - input - PIN, withdrawal amt
//      - decrement balance by withdrawal amt
//      - output - error msg if neg balance or invalid pin
//     changePin
//      - input - old PIN, new PIN
//      - change PIN to new PIN
//      - output - invalid PIN if it's invalid

// }

function createAccount(pin, amount = 0) {
    // set pin, amount
    let userPin = pin;
    let userAmount = amount;

    // return an obj with 4 methods
    return {
        checkBalance(pin) {
            if (userPin === pin) {
              return `$${userAmount}`;
            } else {
              return "Invalid PIN.";
            }
        },
        deposit(pin, depositAmt) {
            if (userPin === pin && depositAmt > 0) {
              userAmount += depositAmt;
              return `Succesfully deposited $${depositAmt}. Current balance: $${userAmount}.`;
            } else {
              return "Invalid PIN.";
            }
        },
        withdraw(pin, withdrawAmt) {
            if (userPin === pin && withdrawAmt <= userAmount) {
              userAmount -= withdrawAmt;
              return `Succesfully withdrew $${withdrawAmt}. Current balance: $${userAmount}.`;
            } else if (withdrawAmt > userAmount) {
              return `Withdrawal amount exceeds account balance. Transaction cancelled.`;
            } else {
              return "Invalid PIN.";
            }
        },
        changePin(oldPin, newPin) {
            if (userPin === oldPin) {
              userPin = newPin;
              return `PIN successfully changed!`;
            } else {
              return "Invalid PIN.";
            }
        }
    }

}

module.exports = { createAccount };
