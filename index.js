class Bill {
  constructor(value, totalAmount) {
    this.value = value;
    this.totalAmount = totalAmount;
  }
}
var machine = []; //Bills the ATM carries and total amount of each.
machine[0] = new Bill(200, 10);
machine[1] = new Bill(125, 8);
machine[2] = new Bill(50, 5);
machine[3] = new Bill(5, 50);

var billGiven = []; //Specifies which bill has been given and the amount.
var amountBills = 0; //Amount of bills the ATM will give the client.
var divisor = 0; //Result of the division when iterating.
var amountMoney = 0; //Amount of money to be withdrawn.
  
var text = document.getElementById("info");
var submit = document.getElementById("withdraw");
submit.addEventListener("click", giveBill);
function giveBill() {
  var input = document.getElementById("amount");
  amountMoney = input.value;
  for (const bill of machine) {
    if (amountMoney > 0) {
      divisor = Math.floor(amountMoney / bill.value);
      if (divisor > bill.totalAmount) {
        amountBills = bill.totalAmount;
      } else {
        amountBills = divisor;
      }
      billGiven.push(new Bill(bill.value, amountBills));
      amountMoney = amountMoney - bill.value * amountBills;
    }
  }
  if (amountMoney > 0) {
    text.innerHTML = "The ATM lacks some amount of money for you to withdraw all that :(";
  }
  else {
      for (const given of billGiven) {
          if (given.totalAmount > 0) { //This is so it doesn't show e.g. "0 bill(s) of 50USD.".
              text.innerHTML += given.totalAmount + " bill(s) of " + given.value + "USD.<br />";
          }  
      }
  }
}
