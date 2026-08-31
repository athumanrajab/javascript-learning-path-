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
