var imageBill = []; //Image of the bills.
imageBill["50 bill"] = "Bills images/Bill50.png";
imageBill["20 bill"] = "Bills images/Bill20.png";
imageBill["10 bill"] = "Bills images/Bill10.png";

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

var textTotal = document.getElementById("totalAmount");

//Total amount of money the ATM currently has.
count();
function count() {
  total = 0;
  for (const t of machine) {
    total = total + t.value * t.totalAmount;
  }
  textTotal.innerHTML = "This ATM currently has <b>" + total + "USD</b>.";
}
var amountBills = 0; //Amount of bills the ATM will give the client.
var divisor = 0; //Result of the division when iterating.
var amountMoney = 0; //Amount of money to be withdrawn.

var text = document.getElementById("info"); //Empty <p></p> in HTML to write the results of the withdrawal.
var submit = document.getElementById("withdraw");
submit.addEventListener("click", giveBill);
function giveBill() {
  var billGiven = []; //Specifies which bill has been given and the amount.
  var input = document.getElementById("amount");
  amountMoney = parseInt(input.value);
  if (total >= amountMoney) {
    for (const bill of machine) {
      if (amountMoney > 0) {
        divisor = Math.floor(amountMoney / bill.value);
        if (divisor > bill.totalAmount) {
          amountBills = bill.totalAmount;
        } 
        else {
          amountBills = divisor;
        }
        bill.totalAmount = bill.totalAmount - amountBills;
        for (var i = 0; i < amountBills; i++) {
          billGiven.push(new Bill(bill.name, bill.value, amountBills));
        }
        amountMoney -= bill.value * amountBills;
      }
    }
    if (amountMoney == 0) {
      text.innerHTML +=
        "Here is your cash. Thank you for using our service! <br />";
      for (const given of billGiven) {
        text.innerHTML += "<img src=" + given.image.src + " alt='#USD bill'/>";
      }
      text.innerHTML += "<hr />";
      count();
    } 
    else {
      text.innerHTML += "No available bills. Try another amount.<br />FYI: The ATM only carries 50USD, 20USD and 10USD bills.<hr />";
    }
  } 
  else {
    text.innerHTML += "There is not enough money, sorry :( <hr/>";
  }
}
