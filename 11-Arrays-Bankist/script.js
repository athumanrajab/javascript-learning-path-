"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// // BANKIST APP

// // Data
// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: "Jessica Davis",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: "Steven Thomas Williams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };
// const account5 = {
//   owner: "Danniel Purcell",
//   movements: [550, 2340, 586, 82, 35],
//   interestRate: 1,
//   pin: 1234,
// };

// const accounts = [account1, account2, account3, account4, account5];

// // Elements
// const labelWelcome = document.querySelector(".welcome");
// const labelDate = document.querySelector(".date");
// const labelBalance = document.querySelector(".balance__value");
// const labelSumIn = document.querySelector(".summary__value--in");
// const labelSumOut = document.querySelector(".summary__value--out");
// const labelSumInterest = document.querySelector(".summary__value--interest");
// const labelTimer = document.querySelector(".timer");

// const containerApp = document.querySelector(".app");
// const containerMovements = document.querySelector(".movements");

// const btnLogin = document.querySelector(".login__btn");
// const btnTransfer = document.querySelector(".form__btn--transfer");
// const btnLoan = document.querySelector(".form__btn--loan");
// const btnClose = document.querySelector(".form__btn--close");
// const btnSort = document.querySelector(".btn--sort");

// const inputLoginUsername = document.querySelector(".login__input--user");
// const inputLoginPin = document.querySelector(".login__input--pin");
// const inputTransferTo = document.querySelector(".form__input--to");
// const inputTransferAmount = document.querySelector(".form__input--amount");
// const inputLoanAmount = document.querySelector(".form__input--loan-amount");
// const inputCloseUsername = document.querySelector(".form__input--user");
// const inputClosePin = document.querySelector(".form__input--pin");

// // Features implementation

// // TODO: 1.Displaying the movement of cash in the App

// const displayMovement = function (movements) {
//   containerMovements.innerHTML = "";

//   movements.forEach(function (mov, i) {
//     const type = mov > 0 ? "deposit" : "withdrawal";
//     const html = `
//         <div class="movements__row">
//           <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
//           <div class="movements__value">${mov}€</div>
//         </div>
//     `;
//     containerMovements.insertAdjacentHTML("afterbegin", html);
//   });
// };

// displayMovement(account1.movements);

// // TODO: 2.Computing username for each account owner
// const createUsername = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map(function (name) {
//         return name[0];
//       })
//       .join("");
//   });
// };

// createUsername(accounts);

// // TODO: 3.Calculate and display balance
// const calcDisplayBalance = function (account) {
//   account.balance = account.movements.reduce(function (accum, mov) {
//     return accum + mov;
//   }, 0);
//   labelBalance.textContent = `${account.balance}€`;
// };

// // TODO: 4.Calculate and display summary
// const calcDisplaySummary = function (account) {
//   const income = account.movements
//     .filter(function (mov) {
//       return mov > 0;
//     })
//     .reduce(function (accum, mov) {
//       return accum + mov;
//     }, 0);
//   labelSumIn.textContent = `${income}€`;

//   const outcome = account.movements
//     .filter(function (mov) {
//       return mov < 0;
//     })
//     .reduce(function (accum, mov) {
//       return accum + mov;
//     }, 0);
//   labelSumOut.textContent = `${Math.abs(outcome)}€`;

//   // Suppose that the bank pay an interest rate of 1.2% , for a customer who deposited at least 1 euro
//   const interest = account.movements
//     .filter(function (mov) {
//       return mov > 0;
//     })
//     .map(function (mov) {
//       return (mov * account.interestRate) / 100;
//     })
//     .filter(function (int) {
//       return int >= 1;
//     })
//     .reduce(function (prev, curr) {
//       return prev + curr;
//     }, 0);
//   labelSumInterest.textContent = `${interest}€`;
// };

// // TODO: Function to update UI

// const updateUI = function (acc) {
//   // Display Movement
//   displayMovement(acc.movements);

//   // Display balance
//   calcDisplayBalance(acc);

//   // Display summary
//   calcDisplaySummary(acc);
// };

// // TODO: 5.Implementing login functionality
// // Attach event handlers
// let currentAccount;
// btnLogin.addEventListener("click", function (e) {
//   // Preventing form from submitting(Preventing the form from reloading th page)
//   e.preventDefault();

//   // Retrieving account based on the username
//   currentAccount = accounts.find(
//     (acc) => acc.username === inputLoginUsername.value,
//   );

//   // Check for the user password
//   if (currentAccount?.pin === Number(inputLoginPin.value)) {
//     // Display the UI and Welcome message
//     labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
//     containerApp.style.opacity = 100;

//     // Clear the input fields and remove the focus
//     inputLoginUsername.value = "";
//     inputLoginPin.value = "";
//     // inputLoginPin.blur();

//     //  UpdateUI
//     updateUI(currentAccount);
//   }
// });

// // TODO: 6.Implementing transfer money feature
// btnTransfer.addEventListener("click", function (e) {
//   // Preventing form from submitting(Preventing the form from reloading th page)
//   e.preventDefault();
//   const amount = Number(inputTransferAmount.value);
//   const receiverAcc = accounts.find(function (acc) {
//     return inputTransferTo.value === acc.username;
//   });

//   // Before we transfer money we should check for several condition such as,
//   // the amount of money to be transfered should be greater that 0,
//   // also the balance should not be less than  the amount to be transfered,
//   // also we should make sure that the receiver account exist,
//   // also we should not be able to transfer money to ourself

//   // Clear input field
//   inputTransferAmount.value = "";
//   inputTransferTo.value = "";

//   if (
//     amount > 0 &&
//     currentAccount.balance >= amount &&
//     receiverAcc &&
//     receiverAcc.username !== currentAccount.username
//   ) {
//     // Doing the transfer
//     currentAccount.movements.push(-amount);
//     receiverAcc.movements.push(amount);

//     // UpdateUI
//     updateUI(currentAccount);
//   }
// });

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// NOTE: Simple array methods

let arr = ["a", "b", "c", "d", "e"];

//slice() - this is used to extract some elements on a given array without changing the original array, such that it return a new array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1)); // TRICK: This is used to get the last element from an array
console.log(arr.slice(-2));

// We can use the slice() to create a shallow copy of an array , by not specify the start index
console.log(arr.slice());
// But also the spread operator can be used to create a shallow copy of an array
console.log([...arr]);

// So you can either use spread operator or slice () to create a shallow copy , but the slice() is useful especially when you want to chain multiple operator

// splice() - this method work similar to how the slice() work , but the major difference is that splice() actually change the original array, such that the extracted element are completely removed from the original array
// splice() - it return an array of extracted/removed elements

// console.log(arr.splice(2));
// console.log(arr); //Here original array will only remain with 2 elements

// Mainly we use the splice() to delete some elements in array, so we are not interested with the values in which the splice method return

//  Example removing the last element from an array
// console.log(arr.splice(-1)); //TRICK: This is used to remove the last element from an array
// console.log(arr);

// We can also specify the number of elements we want to delete by specifying the deleteCount parameter
// console.log(arr);
// console.log(arr.splice(1, 3));
// console.log(arr);

// reverse() - It is used to reverse the order in which elements are arranged in an array, the reverse() mutate the original array.. such that it change the original array
const arr2 = ["j", "i", "h", "g", "f", "e"];
console.log(arr2.reverse());
console.log(arr2);

// concat() - this is used to combine the elements from two different arrays and result into one array, concat() does not mutate the original array
const letters = arr.concat(arr2);
console.log(letters);
// We can achieve the same results by usng also the spread operator
const letters2 = [...arr, ...arr2];
console.log(letters2);

// join() - this is used to convert an array elements into a strings by specify the character(separator) that you want your strings to be joined by
console.log(letters.join("-"));

// Other methods include push(), pop(), indexOf(), shift(), unshift()
 */

/*
// NOTE: The new at() - This method was introduced in ES2022 where by it's an enhanced way of retrieving an element at a certain position or index arr[index]

const arr = [23, 11, 64];

// Traditionally we use bracket notation, when we want to retrieve an element on a certai  position
console.log(arr[1]);

// But with new ES2022 at(), we could achieve the same result as follows
console.log(arr.at(1));

// The most useful case of an at(), is when we want to get the last element of an array
// Suppose we don't know the length of an array and we want to get the last elements , there are multiple ways in which we can achieve that

// 1.By using the bracket notation and arr.length
console.log(arr[arr.length - 1]); //This is because the array is 0-based hence to get the last element we should take the total array length and subtract 1 from it

// 2.By using slice() - since the slice() used to return the new array with extracted elements that with specify when passing an argument, hence we can pass -1
console.log(arr.slice(-1)[0]); //Here without use [0], the result would be an array [64], but since we need the exact value we have to [0] so as we can that value out

// 3.By using at(), this work by specify the negative index as follow
console.log(arr.at(-1)); //TRICK: used to easily get the last element of an array

// The at() also works on strings
const firstName = "Danniel";
console.log(firstName.at(0));
console.log(firstName.at(-1));
 */

/*
// NOTE: Looping arrays forEach()
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Suppose we want to log to the console, whether the money is deposited or withdrawn based on the movements array
// We ca achieve this by using the following ways

// 1. for - of loop
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${movement}`);
//   }
// }

// 2. forEach() - This is an array method which is used to loop over an array, it's an higher-order function which accept the callback function as an argument
// We have also to pass argument in that callback function/anonymous function
// console.log("---forEach()---");
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${movement}`);
//   }
// });

// Suppose we want to know/use the current counter variable in both for-of loop and forEach()

// 1. for - of loop
// This can be dane by using array destructing operator and  entries() , which is an array method that return array of index: value
// for (const [index, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}: You withdrew ${movement}`);
//   }
// }

// 2. forEach()
// This can be done by specifying several arguments on the callback function where by, the first argument should be the element that we would be passing in, the second should be the counter variable(index), the third should be an array.. but also it is not necessary to pass all three argument
movements.forEach(function (movement, index, array) {
  console.log(`Index: ${index}`);
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${movement}`);
  }
});

// INFO: the break and continue keywords, are not supported by forEach loop so, if you want to use break and continue keywords, you better use for-of loop
 */

/*
//NOTE: forEach() with maps and sets

// MAPS- forEach() loop , also work on MAP because they are iterables
// On the callback function , it also accept three arguments, which is not necessary to specify all of them, those arguments are, value, key and map. This is becasue the map store data in key: value pair
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set - forEach() loop also works on Sets because they are also iterables
//  On the callback function , it also accept three arguments, which is not necessary to specify all of them, those arguments are, value, key and set.
// But on the set , they key and value are the same because the set does not store data in key: value pair
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);

currenciesUnique.forEach(function (value, set) {
  console.log(`${value}`);
});
*/

/*
NOTE: Coding Challenge #1 : Working With Arrays
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog
🐶 number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
")
4. Run the function for both test datasets
Test data:
§Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 😉
GOOD LUCK 😀


const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopy = dogsJulia.slice(1, -2);
  const correctDogs = [...dogsJuliaCopy, ...dogsKate];
  for (const [i, dog] of correctDogs.entries()) {
    const type =
      dog >= 3 ? `an adult, and is ${dog} years old` : "still a puppy";
    console.log(`Dog number ${i + 1} is ${type}`);
  }
};

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/*
// NOTE: Data transformation: map(), filter() and reduce()
// NOTE: map()
// map()- returns a new array containing the results of applying an operation on all original array elements
// This method is used to loop over through an array, it works the same as forEach() , the major difference is that.. the map() return a brand new array
// This new array will contain the result after perform operation on each element on the callback function

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Suppose the amount that are within the movements arrays are in dollars(USD) ,now we want a new array that will have all amount in Tanzania Shillings(Tsh)
// We can achieve this by using map(), where by in each element we can perform some operation and store it to a new array

const conversationRate = 2500;

const convertedToTsh = movements.map(function (mov) {
  return mov * conversationRate;
});

console.log(movements);
console.log(convertedToTsh);

// Although we can achieve the same result by using the for-of loop , as follow
const newMovementsArr = [];

for (const mov of movements) {
  newMovementsArr.push(mov * conversationRate);
}
console.log(newMovementsArr);

// the map(), also have several argument that we can pass by, which are value, index and arr
const movementDescription = movements.map(function (mov, index, array) {
  if (mov > 0) {
    return `Movement ${index + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${index + 1}: You withdrew ${Math.abs(mov)}`;
  }
});
console.log(movementDescription);
 */

/*
// NOTE: filter()
// filter() - returns a new array containing the array elements that passed a specified test condition
// It is used to filter elements that satisfy a certain condition
// the filter(), method works the same as forEach() or map()... it works on iterable but also it accept the callback function , with several arguments such as current elements, counter variable and  array(iterable)

// Suppose we want to create a new deposit arrays that will contain of non negative values from the movements array
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

// We can also achieve the same result by using the for-of loop
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

// The main advantage of use filter(), is that it allows us to main multiple array methods

// Suppose also we want to  create a withdrawals arrays the include negative values from movements array
const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);
// reduce() - it boils(reduces) all array elements down to one single value (eg. adding all elements together)
 */

/*
// NOTE: reduce()
// It is used to boils down all elements in array into a single values
// The reduce(), accepts the callback function and the initial value of accumlator(which we mostly use 0), and the callback function accepts the four arguments which are not necessary to be specified
// The first argument is accumlator(accum) which act as snowball that accumlate all values in an array, the second one is current element(cur), the third one is index, the fourth one is array

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce(function (accum, mov) {
  return accum + mov;
}, 0);
console.log(balance);

// We can achieve the same result by using for-of loop
let sum = 0;
for (const mov of movements) {
  sum += mov;
}
console.log(sum);

// The reduce method can also be used to find the maximum value in array, in which the accum argument can be used to keep track of the current maximum element
const maxValue = movements.reduce(function (accum, mov) {
  if (accum > mov) {
    return accum;
  } else {
    return mov;
  }
}, movements[0]);
console.log(maxValue);
*/

/*
NOTE: Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
Test data:
§Data 1: [5, 2, 4, 1, 15, 8, 3]
§Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀

const calcAverageHumanAge = function (dogAges) {
  const humanAges = dogAges.map(function (dog) {
    if (dog <= 2) {
      return 2 * dog;
    } else {
      return 16 + dog * 4;
    }
  });
  const adultAges = humanAges.filter(function (dog) {
    return dog >= 18;
  });
  const average =
    adultAges.reduce(function (avg, dog) {
      return avg + dog;
    }, 0) / adultAges.length;

  return average;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

// NOTE: The magic of chaining
// We can chain multiple array methods together
// Suppose we want to work with movements array , so as we can create a new deposit array which will contain all non negative value, the convert each value from euro to usd and then calculate the total deposit
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 2.5;
const totalDeposit = movements
  .filter(function (mov) {
    return mov > 0;
  })
  .map(function (mov) {
    return mov * eurToUsd;
  })
  .reduce(function (accum, mov) {
    return accum + mov;
  }, 0);
console.log(totalDeposit);
// We can only chain multiple methods only if the previous method returns an array, example from an example above we can only chain multiple methods after map() or filter(), but not after the reduce(), because the reduce() returns does not return an array, it just return a number
// One major disadvantage of chaining is that, it's kind hard to debug when we get the weird result, perhaps we can use console.log() in each method so as we can see that method
// It's bad practice to chain up methods that mutates the underlying array example splice(), reverse()
// Too much chaining can result to performance issues when working with large arrays, so try to optimize the chaining

/*
NOTE: Coding Challenge #3
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!
Test data:
§Data 1: [5, 2, 4, 1, 15, 8, 3]
§Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀


const calcAverageHumanAge = (dogAges) => {
  const humanAges = dogAges
    .map((dog) => (dog <= 2 ? 2 * dog : 16 + dog * 4))
    .filter((dog) => dog >= 18)
    .reduce((prev, dog, i, arr) => prev + dog / arr.length, 0);

  return humanAges;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

/*
// NOTE: The find()
// It's used to retrieve one element on array based on condition
// It does not return a new array, but it will only return the first element of an array that satisfies the condition
// Also it has a callback function which accept three argument , the current element, counter variable(index) and array

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(firstWithdrawal);

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

const accounts = [account1, account2, account3, account4];

// Suppose from the data above we want to use the find() to retrieve only one account that meet a certain condition, say may be we want to retrieve only one element in which the given element is an object with property owner of "Jessica Davis"

// const account = accounts.find(function (acc) {
//   return acc.owner === "Jessica Davis";
// });
// console.log(account);

// We can achieve the same result by using the for-of loop

for (const acc of accounts) {
  acc.owner === "Jessica Davis" ? console.log(acc) : "No account Found!";
}
*/
