"use strict";

/*
// Default parameter

// const bookings = [];

// const createBooking = function (flightNum, numPassangers, price) {
//   const booking = {
//     flightNum,
//     numPassangers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking("LH123");

// We can use short circuitng to set the default parameters
// const bookings = [];

// const createBooking = function (flightNum, numPassangers, price) {
//   // ES 5 short circuit
//   numPassangers = numPassangers || 1;
//   price = price || 199;

//   const booking = {
//     flightNum,
//     numPassangers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking("LH123");

// But also we can directly set the default parameter on the () as follow, this is ES 6 feature
// const bookings = [];

// const createBooking = function (flightNum, numPassangers = 1, price = 200) {
//   const booking = {
//     flightNum,
//     numPassangers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking("LH123");
// createBooking("LH123", 23, 4450);

// But also through this ES6 feature we can directly pass the expression as the default parameter, consider the code below which calculate the price based on the number of passanger as the default parameter
const bookings = [];

const createBooking = function (
  flightNum,
  numPassangers = 1,
  price = 200 * numPassangers,
) {
  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 20);

// NOTE: We can skip specifying the argument while calling the function by using "undefined" keyword, consider the codes below in which we want only to specify the flightNum and price ... but skip to specify numPassangers
createBooking("LH123", undefined, 20); //Here since the numPassager is set to undefined hence the default parameter of numPassager will be set
*/

/*
// How passing arguments works: Values Vs References
const flight = "LH234";
const danniel = {
  name: "Danniel Purcell",
  passport: 26387474,
};

const checkIn = function (flightNum, passanger) {
  flightNum = "LH999";
  passanger.name = "Mr. " + passanger.name;
  if (passanger.passport === 26387474) {
    alert("Checked in");
  } else {
    alert("Wrong passport!");
  }
};

checkIn(flight, danniel);
console.log(flight); //Here the value remain the same (LH234) because primitive value are stored on stack hence flightNum = fligh will create a complete new variable
console.log(danniel); //Here the value of name changed because as we now the reference types like object are stored on stack but reference on memory heap hence since passanger.name reference the same danniel.name on the memory heap hence changing one variable will affect another variable

// NOTE: JavaScript use passing by value not passing by references
 */

/*
//Functions Accepting callback functions

// Lets create two generic functions that we can later pass them in higher-order function
const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original text: ${str}`);
  console.log(`Transformed text: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`); //SInce functions are object hence has both properties and methods
};

// Here the tranformer() is called the higher-order function because it does not care about the level of detail about the str is really transformed, it just work on higher level

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);
 */

/*
// Functions returning functions
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greetHey = greet("Hey");
// greetHey("Purcell");

// // We can also call it direct
// greet("Hey")("Danniel");

// We can also write the code above using an arrow function
const greet = (greeting) => {
  return (name) => console.log(`${greeting} ${name}`);
};
const greetHey = greet("Hey");
greetHey("Purcell");

// We can also call it direct
greet("Hey")("Danniel");
 */

/*
// The call and  apply method
const lufthansa = {
  airline: "Lufthansa",
  iatacode: "LH",
  bookings: [],

  book(flighNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flighNum}`,
    );
    this.bookings.push({ flight: ` ${this.iatacode}${flighNum}`, name });
  },
};

// lufthansa.book(239, "Danniel Purcell");
// lufthansa.book(626, "Danniel Deus");
// console.log(lufthansa.bookings);

// Suppose that after some year the lufthansa create a new airline called eurowings
const eurowings = {
  airline: "Eurowings",
  iatacode: "EW",
  bookings: [],
  //Suppose we want also this eurowings to have book() method as appeared in lufthansa, we can copy directly the method and paste here but that is literally the bad practice and violate the DRY principle.. so instead we can take the book() and store it somewhere else
};

const newBook = lufthansa.book;

// newBook(342, "Danniel Purcell"); //This will throw an error Uncaught TypeError: Cannot read properties of undefined (reading 'airline'), this is because the newBook() is a regular function such that it's no longer a method, as we know the regular function handle this keyword by return undefined

// The solution to above problem is by using the call() method in which the first argument that it takes(We should specify explicitly which object does the "this" keyword should refer), and the other argument should be as they are
newBook.call(eurowings, 333, "Danniel Purcell");
console.log(eurowings);

newBook.call(lufthansa, 234, "Danniel Deus");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iatacode: "LX",
  bookings: [],
};

newBook.call(swiss, 555, "Athuman Rajab");
console.log(swiss);

// apply() method - this method work the same as call(), the only differece is that the apply() does not accept specify the argument after this keyword(after specify the object to be refered by this keyword) instead it accept the array of data
const flightData = [675, "Mary Cooper"];
newBook.apply(swiss, flightData);
// NOTE: The apply() is no longer useful in modern javaScript.. although you can keep use it if you want

// Instead we can keep use the call() and spread operator
newBook.call(swiss, ...flightData);
console.log(swiss);
 */

/*
// The bind() method
// bind() also allows us to set manually the "this" keyword for any function call
// The difference os that, bind() does not immediately call the function , instead it returns a new function where the this keyword is bound

const lufthansa = {
  airline: "Lufthansa",
  iatacode: "LH",
  bookings: [],

  book(flighNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flighNum}`,
    );
    this.bookings.push({ flight: ` ${this.iatacode}${flighNum}`, name });
  },
};
const eurowings = {
  airline: "Eurowings",
  iatacode: "EW",
  bookings: [],
};

const swiss = {
  airline: "Swiss Air Lines",
  iatacode: "LX",
  bookings: [],
};

const newBook = lufthansa.book;

const bookSwiss = newBook.bind(swiss);
const bookLufthansa = newBook.bind(lufthansa);
const bookEurowings = newBook.bind(eurowings);

bookSwiss(23, "Dominic Purcell");
bookLufthansa(54, "Danniel Purcell");
bookEurowings(75, "Danniel Deus");

// We can also pass some few arguments in bind()
const bookEW23 = newBook.bind(eurowings, 23); //Here we directly pass the flight number , hence make it easy when we call this function we'll only be required to pass only the name of the passager
bookEW23("Martha Cooper");
bookEW23("Chase Cooper");

// Another useful application of bind() method is with event listener
// Suppose that we want to attach an handler function on a "buy new plane" button such that when we click that button it should print to the console the number of planes that has been increased such that if initially the company has 300 planes, when we click the buy new plane button it should be increased by one
// Lets start by adding some new property and method to our lufthansa object

lufthansa.planes = 300;
lufthansa.buy = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

// Now let's add our eventlistener to the DOM element(button)

// document.querySelector(".buy").addEventListener("click", lufthansa.buy); //here the console.log(this); will result <button class="buy">Buy new plane 🛩</button> will be printed to the console but also console.log(this.planes); will result to NaN, this is because the "this" keyword is dynamic such that when it is used inside the DOM element , it will directly point back that element and that's why it has printed the button element to the console

// The solution to above problem is to use the bind() so as we can explicit set which object does the "this" keyword should refer to
document.addEventListener("click", lufthansa.buy.bind(lufthansa));

// Another useful application of bind method is partial application where we can preset parameter
// Lets create a normal function

const addTax = function (rate, value) {
  return value + value * rate;
};
console.log(addTax(0.3, 300));

// So by using the bind(), we can create another function from the existing function with some preset parameters, suppose the mostly used rate for VAT is 23%
const addVAT = addTax.bind(null, 0.23); //In partial application we dont care about this keyword, thus why we wrote the null
console.log(addVAT(347));

// NOTE: This is different from using the default parameters because , here we create a brand new function
 */

/*
NOTE: Coding Challenge #1
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter
'poll' object below.
Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:
1.1.
Display a prompt window for the user to input the number of the
selected option. The prompt should look like this:
What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)
1.2.
Based on the input number, update the 'answers' array property. For
example, if the option is 3, increase the value at position 3 of the array by
1. Make sure to check if the input is a number and if the number makes
sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation?
est data for bonus:
§Data 1: [5, 2, 3]
§Data 2: [1, 5, 3, 9, 6, 1]
Hints: Use many of the tools you learned about in this and the last section 😉
GOOD LUCK 😀


const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(write option number)`,
      ),
    );
    if (typeof answer === "number" && answer < this.answers.length) {
      this.answers[answer]++;
      this.displayResults();
      // this.displayResults("string");
    }
  },

  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));
*/

/*
// NOTE: Immediately Invoked Function Expressions (IIFE)
// Sometimes in javaScript we need to create a function and call it immediately after creating it.. and run it once so as we can never call again
// This can be achieved by wrapping the function inside (), and when we want to call it immediately we should add () at the end
(function () {
  console.log("This will never run again");
})();

// This can also be applied in arrow function
(() => console.log("This will also never run again"))();
// Also the IIFE is no longer used in modern javaScript
*/

/*
// NOTE: Closure
// closure is not a feature that we explicitly use, such as when we create an array or a new function etc , closure happens automatically in certain situation
// Conside the code below

const secureBooking = function () {
  let passangerCount = 0;

  return function () {
    passangerCount++;
    console.log(`${passangerCount} passangers`);
  };
};

const booker = secureBooking();
// SInce the booker function is the function that exist in global execution scope, and the environment in which the booker function was created which was inside the secureBooking was already executed in call stack and already removed from the call stack
// But due to closure , the booker function can still have access to all variables existed inside the secureBooking function
// Closure makes the function remember all variables that existed at the function birth place

booker();
booker();
booker();

// We can access these internal properties of closures to see all varaible that the booker function still has access too by using console.dir(booker)
console.dir(booker);

// NOTE: More examples on closure
// These example demonstrate that we dont need to create a function that return another function so as to create a closure

// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 10;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f); //Due to the closure property, help the function to not always loose the connection to all variables that were present at it's birthplace

// Re-assign f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (numPassengers, waitTime) {
  const perGroup = numPassengers / 3;

  // This function accept 2 arguments which are callback function and time in mill second in which the callback function shall be executed
  setTimeout(function () {
    console.log(`We are now boarding all ${numPassengers} passangers`);
    console.log(`There are 3 groups , each with ${perGroup} passangers`);
  }, waitTime * 1000);

  console.log(`Will start boarding in ${waitTime} seconds.`);
};

boardPassengers(180, 3);
// Due to closure, makes the setTimeout() function to still have all the variables that were exist on it's birth place because when we call boardPassanger(), it's executed and popped out of call stack, and then when the setTimeout() is executed , it's still has access to all variables
 */

/*
NOTE: Coding Challenge #2
This is more of a thinking challenge than a coding challenge 🤓
Your tasks:
1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!
2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";
  document.body.addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
