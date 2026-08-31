"use strict";

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
