"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: "Danniel Purcell",
  movements: [550, 2340, 586, 82, 35],
  interestRate: 1,
  pin: 1234,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Features implementation

// TODO: 1.Displaying the movement of cash in the App

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  // Since we dont want to modify the original movements array, hence we'll create a shallow copy by using slice()
  const sortedMovs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  sortedMovs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovement(account1.movements);

// TODO: 2.Computing username for each account owner
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};

createUsername(accounts);

// TODO: 3.Calculate and display balance
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(function (accum, mov) {
    return accum + mov;
  }, 0);
  labelBalance.textContent = `${account.balance}€`;
};

// TODO: 4.Calculate and display summary
const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (accum, mov) {
      return accum + mov;
    }, 0);
  labelSumIn.textContent = `${income}€`;

  const outcome = account.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (accum, mov) {
      return accum + mov;
    }, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  // Suppose that the bank pay an interest rate of 1.2% , for a customer who deposited at least 1 euro
  const interest = account.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (mov) {
      return (mov * account.interestRate) / 100;
    })
    .filter(function (int) {
      return int >= 1;
    })
    .reduce(function (prev, curr) {
      return prev + curr;
    }, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// TODO: Function to update UI

const updateUI = function (acc) {
  // Display Movement
  displayMovement(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// TODO: 5.Implementing login functionality
// Attach event handlers
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  // Preventing form from submitting(Preventing the form from reloading th page)
  e.preventDefault();

  // Retrieving account based on the username
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value,
  );

  // Check for the user password
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display the UI and Welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    // Clear the input fields and remove the focus
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    // inputLoginPin.blur();

    //  UpdateUI
    updateUI(currentAccount);
  }
});

// TODO: 6.Implementing transfer money feature
btnTransfer.addEventListener("click", function (e) {
  // Preventing form from submitting(Preventing the form from reloading th page)
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(function (acc) {
    return inputTransferTo.value === acc.username;
  });

  // Before we transfer money we should check for several condition such as,
  // the amount of money to be transfered should be greater that 0,
  // also the balance should not be less than  the amount to be transfered,
  // also we should make sure that the receiver account exist,
  // also we should not be able to transfer money to ourself

  // Clear input field
  inputTransferAmount.value = "";
  inputTransferTo.value = "";

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // UpdateUI
    updateUI(currentAccount);
  }
});

// TODO: 7.Implementing request loan functionality
// Suppose that the bank grant loan , if there is at least one deposit of at least 10% of the requested loan amount
// This is the good use case of the some()
btnLoan.addEventListener("click", function (e) {
  // Preventing form from submitting(Preventing the form from reloading th page)
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  const hasTenPercentDeposit = currentAccount.movements.some(
    (deposit) => deposit >= loanAmount * 0.1,
  );

  if (loanAmount > 0 && hasTenPercentDeposit) {
    // Add the movement to the current account
    currentAccount.movements.push(loanAmount);

    //  UpdateUI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
});

// TODO: 8.Implementing close account feature
btnClose.addEventListener("click", function (e) {
  // Preventing form from submitting(Preventing the form from reloading th page)
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(function (acc) {
      return currentAccount.username === acc.username;
    });
    // Delete account
    accounts.splice(index, 1);

    // Clear input fields
    inputCloseUsername.value = inputClosePin.value = "";

    // Hide UI
    containerApp.style.opacity = 0;
  }
});

// TODO: 9.Implementing the sorting functionality
let sortedState = false; //Keep track of whether the sorted element is true or false
btnSort.addEventListener("click", function (e) {
  // Preventing form from submitting(Preventing the form from reloading th page)
  e.preventDefault();

  displayMovement(currentAccount.movements, !sortedState);
  sortedState = !sortedState; //This help to invert the boolean value of sorted variable such that, initially before the sort button was clicked the boolean value of sortedState was false, after the click the button the value comes to true hence the array is sorted and come back to false
});
