"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2026-11-18T21:31:17.178Z",
    "2026-12-23T07:42:02.383Z",
    "2026-01-28T09:15:04.904Z",
    "2026-04-01T10:17:24.185Z",
    "2026-05-08T14:11:59.604Z",
    "2026-09-08T17:01:17.194Z",
    "2026-09-07T23:36:17.929Z",
    "2026-09-06T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Danniel Purcell",

  movements: [250000, 175000, -15000, -45000, -125000, -50000, 350000, -10000],

  interestRate: 1.5,

  pin: 3333,

  movementsDates: [
    "2026-08-01T13:15:33.035Z",
    "2026-08-10T09:48:16.867Z",
    "2026-08-15T06:04:23.907Z",
    "2026-08-20T14:18:46.235Z",
    "2026-08-25T16:33:06.386Z",
    "2026-08-30T14:43:26.374Z",
    "2026-09-05T18:49:59.371Z",
    "2026-09-08T12:01:20.894Z",
  ],

  currency: "TZS",

  locale: "en-TZ",
};

const accounts = [account1, account2, account3];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Features implementation

// TODO: Creating a function that will be responsible to format date in a nice way
const formatMovementDate = function (date, locale) {
  // Creating another function that will display time in which a certain movement happen eg today, yesterday , 3 days ago etc
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) {
    return "Today";
  } else if (daysPassed === 1) {
    return "Yesterday";
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    // HACK: We can use Intl to format the date based on the locale
    return new Intl.DateTimeFormat(locale).format(date);

    // NOTE: The aim is to display the time in this format day/month/year by using normal JavaScript Date and Time
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;
  }
};

// TODO: A function that will be responsible to format currency
const formatCurrency = function (value, locale, currency) {
  const options = {
    style: "currency",
    currency: currency,
  };

  return new Intl.NumberFormat(locale, options).format(value);
};

// TODO: 1.Displaying the movement of cash in the App

const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  // Since we dont want to modify the original movements array, hence we'll create a shallow copy by using slice()
  const sortedMovs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  sortedMovs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // TRICK: You can loop over two arrays in a single forEach as follow.. since we want also to get the movement with it's corresponding movementDate value
    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovement(account1);

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
  const formattedBalance = formatCurrency(
    account.balance,
    account.locale,
    account.currency,
  );

  labelBalance.textContent = `${formattedBalance}`;
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

  const formattedIncome = formatCurrency(
    income,
    account.locale,
    account.currency,
  );
  labelSumIn.textContent = `${formattedIncome}`;

  const outcome = account.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (accum, mov) {
      return accum + mov;
    }, 0);

  const formattedOutcome = formatCurrency(
    Math.abs(outcome),
    account.locale,
    account.currency,
  );
  labelSumOut.textContent = `${formattedOutcome}`;

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
  const formattedInterest = formatCurrency(
    interest,
    account.locale,
    account.currency,
  );
  labelSumInterest.textContent = `${formattedInterest}`;
};

// TODO: Function to update UI

const updateUI = function (acc) {
  // Display Movement
  displayMovement(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// TODO: 10.Implementing a countdown timer
let timer;

const startLogOutTimer = function () {
  // Set time to 5 mins
  let time = 300;

  // This is the regular function that will be used as the callback function in setInterval so as the log out time could start immediately after we logged in
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When time = 0 second reach, stop timer and logout user
    if (time === 0) {
      clearInterval(timer); //Clear the time interval so as it will stop executing

      // Hide the UI and and change the Welcome message
      labelWelcome.textContent = `Login to get started`;
      containerApp.style.opacity = 0;
    }

    // Decrease time by 1 sec
    time--;
  };

  // call the timer every second
  // TRICK: inorder for the log out time to start immediately when a user logged in.. we have invoke or call the tick()
  tick();
  timer = setInterval(tick, 1000);

  return timer; //We return timer so as we can use it to handle the logout time when switching account
};

// TODO: 5.Implementing login functionality
// Attach event handlers
let currentAccount;

// TODO: Fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

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

    // Create a current date and time when a user logged in by using Intl API
    const now = new Date();

    // We can also pass some options in DateTimeFormat()
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric", //it also has some few values like long,, numeric, 2-digit
      year: "numeric",
      // weekday: "short", //It has also some few alternative like long, short and narrow
    };

    // Refers to this website to get ISO Language Code Table http://www.lingoes.net/en/translator/langcode.html
    // It's also not advisable to define the locale manually (the locale are en-US, sw pt-PT), instead we have to get it from user browser
    // const locale = navigator.language;
    // console.log(locale);

    // But since each account has defined locale we can use it
    const locale = currentAccount.locale;

    labelDate.textContent = Intl.DateTimeFormat(locale, options).format(now);

    // HACK: (The better solution is to use Intl API) Create a current date and time when a user logged in by using normal JavaScript time and date
    // const now = new Date()

    // The aim is to display the time in this format day/month/year
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); //Since monthes are 0-based in js
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear the input fields and remove the focus
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    // Start logout timer
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();

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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // UpdateUI
    updateUI(currentAccount);

    // Reset Timer whenever a user doing a transfer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// TODO: 7.Implementing request loan functionality
// Suppose that the bank grant loan , if there is at least one deposit of at least 10% of the requested loan amount
// This is the good use case of the some()
btnLoan.addEventListener("click", function (e) {
  // Preventing form from submitting(Preventing the form from reloading th page)
  e.preventDefault();

  const loanAmount = Math.floor(inputLoanAmount.value);
  const hasTenPercentDeposit = currentAccount.movements.some(
    (deposit) => deposit >= loanAmount * 0.1,
  );

  // Suppose that we want the bank to approve the loan after 3 seconds(3000 millsecond)
  setTimeout(function () {
    if (loanAmount > 0 && hasTenPercentDeposit) {
      // Add the movement to the current account
      currentAccount.movements.push(loanAmount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      //  UpdateUI
      updateUI(currentAccount);
    }
  }, 3000);

  inputLoanAmount.value = "";
  // Reset Timer whenever a user request a loan
  clearInterval(timer);
  timer = startLogOutTimer();
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

  displayMovement(currentAccount, !sortedState);
  sortedState = !sortedState; //This help to invert the boolean value of sorted variable such that, initially before the sort button was clicked the boolean value of sortedState was false, after the click the button the value comes to true hence the array is sorted and come back to false
});
