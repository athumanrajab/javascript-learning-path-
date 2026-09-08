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
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
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

const accounts = [account1, account2];

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
          <div class="movements__value">${Number(mov.toFixed(2))}€</div>
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
  labelBalance.textContent = `${Number(account.balance.toFixed(2))}€`;
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
  labelSumIn.textContent = `${Number(income.toFixed(2))}€`;

  const outcome = account.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (accum, mov) {
      return accum + mov;
    }, 0);
  labelSumOut.textContent = `${Number(Math.abs(outcome).toFixed(2))}€`;

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
  labelSumInterest.textContent = `${Number(interest.toFixed(2))}€`;
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

  const loanAmount = Math.floor(inputLoanAmount.value);
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// NOTE: Numbers- all numbers is javascript are presented as floating point number
// All numbers in javascript are stored as 64 base 2, hence sometimes is quite hard to represent some simple fractions which are easy to to be represented in base 10 (0-9).. to represent them in binary
// Example see the result below
console.log(0.1 + 0.2);
console.log(10 / 3);
// So we can not do some precise calculation in js and that is kind of error that we have to accept in js
console.log(0.1 + 0.2 === 0.3); //Here the result is false, in which we expect it to be true

// Conversion
// There is one trick of converting string into a number in js
console.log(Number("23"));
// TRICK: the simple trick is to use + operator before that string so as the js engine will perform type coercion
console.log(+"23");

// Parsing - We can parse a number from a string by using Number(), but since even function is an object it can also have some method example parseInt()
console.log(Number.parseInt("30px")); //Here the strind can contain a number and some other words but the parseInt() method will eventually try to extract only the number part and the result of extraction will be a number not a string

// But inorder to make the parseInt work.. the string has to start with a number
console.log(Number.parseInt("e45")); //Here it wont work coz the string doesn't start with a number

// The parseInt method accept two arguments which are string and radix, we always use 10 for radix which mean base 10 number (0-9)

console.log(Number.parseInt("40em", 10));

// parseInt also only work for integer only
console.log(Number.parseInt("4.5em", 10)); //Here the result will be 4

// parseFloat() - this work the same as parseInt but here we are parsing float number, it useful when you want to read values from a string example css properties
console.log(Number.parseFloat("4.5em", 10));

// So these two methods parseInt() and parseFloat(), are also called global functions such that we don't have to necessary call them inside Number objects
console.log(parseFloat("54.44rem"));
console.log(parseInt("88em"));
// But doing so is kind traditional way, so we are reccommended to use them inside the Number object

// Sometimes these methods are referred to as namespaces, so the Number provide the namespace for all different functions such as parseInt , parseFloat

// isNaN() - This is another Number namespace which can be used to check if any value is a not a number
console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN("a"));
console.log(Number.isNaN(+"a23"));
console.log(Number.isNaN(+"23x"));
console.log(Number.isNaN(23 / 0));

// isFinite() - This is the best way of checking if the value if the number
console.log(Number.isFinite(20));
console.log(Number.isFinite("20"));
console.log(Number.isFinite(+"20px"));
console.log(Number.isFinite(23 / 0));

// isInteger() - This is used to check if the number is an integer
console.log(Number.isInteger(23));
console.log(Number.isInteger("23"));
console.log(Number.isInteger(23.4444444444444));
console.log(Number.isInteger(23.1));
*/

/*
// NOTE: math and rounding
// Square root
console.log(Math.sqrt(25));

// an alternative way to get square root, cuberoot, fourth root etc is by using an exponention
console.log(25 ** (1 / 2));

console.log(8 ** (1 / 3));

console.log(16 ** (1 / 4));

// maximum number
console.log(Math.max(5, 23, 46, 3, 28, 4, 12));

// Math.max(), also  does the type coercion
console.log(Math.max(5, 23, "46", 3, 28, 4, 12));

// Math.max(), does not do parsing
console.log(Math.max(5, 23, "46ps", 3, 28, 4, 12));

// minimum value
console.log(Math.min(5, 23, 46, 3, 28, 4, 12));

// Math.min(), also does the type coercion
console.log(Math.min(5, 23, "46", "3", 28, 4, 12));

// There are also constant values in Math namespace such PI
// Suppose we want to calculate the area of a cycle, given the radius of 10 px from a user interface

console.log(Math.PI * Number.parseFloat("10px") ** 2);

// Math.random() - used to generate random number btn 0 and 1

console.log(Math.random());

// We can cut off the decimal part by using the Math.trunc()
// Suppose we want to generate a random number between 1 and 6
console.log(Math.trunc(Math.random() * 6) + 1);

// Consider the following function which can be used to generate random number
const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + 1;
};

console.log(randomInt(1, 6));

// Rounding integer- this can be done by using different ways
// 1. Math.trunc() - is used to remove the decimal part from a number
console.log(Math.trunc(34.222));

// Math.round() - round a number to a nearest integer
console.log(Math.round(23.4));
console.log(Math.round(23.5));

// Math.ceil() - it is used to round up a number
console.log(Math.ceil(11));
console.log(Math.ceil(11.4));
console.log(Math.ceil(11.5));
console.log(Math.ceil(11.8));

// Math.floor() - it is used to round down a number
console.log(Math.floor(50));
console.log(Math.floor(50.4));
console.log(Math.floor(50.5));
console.log(Math.floor(50.8));

console.log("------Type Coercion-----");
// TRICK: both of these methods perform type coercion
console.log(Math.trunc("34.222"));

console.log(Math.round("23.4"));
console.log(Math.round("23.5"));

console.log(Math.ceil("11"));
console.log(Math.ceil("11.4"));
console.log(Math.ceil("11.5"));
console.log(Math.ceil("11.8"));

console.log(Math.floor("50"));
console.log(Math.floor("50.4"));
console.log(Math.floor("50.5"));
console.log(Math.floor("50.8"));

// Someone might think that Math.trunc() and Math.floor() are the same, but they only work the same when they both dealing only with positive numbers.. when it comes to negative numbers they work different
console.log(Math.trunc(-23.4));
console.log(Math.floor(-23.4));
// It is advised to use floor instead of trunc because it work for both positive and negative number

// Rounding decimal places
console.log((2.7).toFixed(0)); //Here the result after applying the toFixed() method is the string and not a number
console.log((2.7).toFixed(1));
console.log((2.7).toFixed(2));
console.log((2.7).toFixed(3));
console.log(+(2.345).toFixed(2));

// The operation above is possible despite that we are callinh toFixed() from primitive values which already know that primitive values have no built in methods.. this is because javascript behind the scenes will do boxing
// Boxing involve transform those primitive values to a number obeject then call a method on that object and once the process is finished it will convert them back to a primitive values
 */

/*
// NOTE: numeric separator
// starting from year 2021 , we can use a feature called numeric separators to format a number in a way that it's easier for us or for other developer to read and understand
// Hence we can use underscore to give meaning to our number
// Suppose we want to write a very large number such as diameter of a sun
const diameter = 287_460_000_000;
console.log(diameter);

// It's not allowed to place the underscore at the following position _3.1415 , 3._1415, 3_.1415 , 3.1415_, 3.14__15
// Also when we try to convert a string contain _ to a number will not work
console.log(Number("3000_3044"));
*/

/*
// NOTE: Working with BigInt
// This is the special type of integer which was introduced in ES2020
// Since javaScript store number value in 64 bit base 2.. then only 53 bits are used to store a number while.. the remaininf bits are used for storing decimal place
// Since only 53 bits are used to store number this means we have limit of number that can be processed by javaScript
console.log(2 ** 53 - 1); //we minus 1 because the number in js start from zero

const maxSafeNumber = 9_007_199_254_740_991;

console.log(2 ** 53 + 3); //This will give the wrong answer

// So the Number object has the namespace for the largest value that can be processed by js which is know as MAX_SAFE_INTEGER
console.log(Number.MAX_SAFE_INTEGER);

console.log(4937480982389409823490290342934924902348);

// We can use the BigInt or put n at the of the number
console.log(4937480982389409823490290342934924902348n); //4937480982389409823490290342934924902348n
console.log(BigInt(4937480982389409823490290342934924902348)); //4937480982389409983641378903027479478272n
// Although the results above seems to be different so it's highly recommended to use BigInt() when working large number that fall on MAX_SAFE_INTEGER
// BigInt() this is referred to as constructor function

// Operations
console.log(100000n + 100000n);
console.log(1238383421212233n * 23289348948240281n);

// But we can not mix bigint with other regular integer
const hugeNum = 34892839490198102912n;
const regularNum = 23;
// console.log(regularNum * hugeNum); //we'll get TypeError

// This can be solved by using the BigInt() constructor function to convert the regular number into int bigint
console.log(BigInt(regularNum) * hugeNum);

// But this can still work
console.log(20n > 15);

// This cannot work
console.log(20n === 20); //the result is false because the strictly equality operator does not perform type coersion so those two number belong to the two different data types
console.log(typeof 20n);
console.log(typeof 20);

console.log(20n == 20); //here's the result will be true because javaScript will automatically do type coercision
console.log(20n == "20");

// Also the square root does not work
// console.log(Math.sqrt(16n));
// console.log(16n ** (1 / 2));

// Division
console.log(10n / 3n); //here the result will not be as expected , it will return 3n since it's the closest value and cutoff the decimal part
console.log(12n / 3n); //here the result will not be as expected , it will return 3n since it's the closest value
*/

// NOTE: Creating dates
// There are four different ways of creating dates in javaScript , they all use the new date constructor function but they can accept different parameters
const now = new Date();
console.log(now);

// We can pass in string in new Date() constructor function
console.log(new Date("Wed Sep 09 2026 23:10:06"));
console.log(new Date("December 24, 2025"));

console.log(new Date(account1.movementsDates[0]));

// We can also pass something like this .. (Year, month, day, hours, min, sec)
console.log(new Date(2026, 7, 31, 10, 30, 23)); //Here the month specified here is july but since the month in js is zero-based hence it will print Aug on the console

// Also Date(), auto correct the day
console.log(new Date(2026, 1, 31, 10, 30, 23)); //Here on the console March 03 will be printed

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// 3 * 24 * 60 * 60 * 1000 the result of this is called timestamp which is the millisecond passed since 1970

// Dates are also special types of object hence they have their own methods and properties
// Working with dates
const future = new Date(2030, 6, 15, 16, 30);
console.log(future);

// getFullYear() - this is used to get the full year
console.log(future.getFullYear());

// getMonth() - this is used to get the month
console.log(future.getMonth()); //on the console it will display 6, since it's 0-based that 6 will literally represent July

// getDate() - this is used to get the exactly day of the month
console.log(future.getDate());

//getDay() -  this is used to get the day of the week .. it is 0-based
console.log(future.getDay());

console.log(future.getHours());

console.log(future.getMinutes());

console.log(future.getSeconds());

// toISOString() - convert the date object into a string
console.log(future.toISOString());

// getTime() - it return the timestamp since january 1 , 1970
console.log(future.getTime()); //1910352600000

// We can also reverse the value 1910352600000
console.log(new Date(1910352600000));

// We can also get the current time stamp by using Date.now()
console.log(Date.now());

// There are also set methods like setFullYear(), setMonth(), setDate() etc
