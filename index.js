var imageBill = []; //Image of the bills.
imageBill["50 bill"] = "Bills images/Bill50.png";
imageBill["20 bill"] = "Bills images/Bill20.png";
imageBill["10 bill"] = "Bills images/Bill10.png";

var text = document.getElementById("info"); //Empty <p></p> in HTML to write the result of the withdrawal.
var imag = document.getElementById("image"); //Empty <p></p> in HTML to insert the images of the bills given.


class Bill {
  constructor(name, value, totalAmount) {
    this.image = new Image();
    this.name = name;
    this.value = value;
    this.totalAmount = totalAmount;
    this.image.src = imageBill[this.name];
  }
}


var machine = []; //Bills the ATM carries and total amount of each.
machine[0] = new Bill("50 bill", 50, 10);
machine[1] = new Bill("20 bill", 20, 8);
machine[2] = new Bill("10 bill", 10, 5);

var billGiven = []; //Specifies which bill has been given and the amount.
var amountBills = 0; //Amount of bills the ATM will give the client.
var divisor = 0; //Result of the division when iterating.
var amountMoney = 0; //Amount of money to be withdrawn.
  
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
      billGiven.push(new Bill(bill.name, bill.value, amountBills));
      amountMoney = amountMoney - bill.value * amountBills;
    }
  }
  if (amountMoney > 0) {
    text.innerHTML = "The ATM lacks some amount of money for you to withdraw it all :(";
  }
  else {
      for (const given of billGiven) {
        text.innerHTML = "Here you have your bills. Thank you for using our service!";
          if (given.totalAmount > 0) {
              for (let i = 1; i <= given.totalAmount; i++) {
                imag.appendChild(given.image.cloneNode(true)); //To duplicate the node (the images of bills in this case)
              }
              console.log(given);
          }
        /*This is the text approach: it doesn't show e.g. "0 bill(s) of 50USD.".
          if (given.totalAmount > 0) {
              text.innerHTML += given.totalAmount + " bill(s) of " + given.value + "USD.<br />";
          } */
      }
  }
}
