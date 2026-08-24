"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const italianFoods = new Set([
  "pasta",
  "gnocchi",
  "tomatoes",
  "olive oil",
  "garlic",
  "basil",
]);

const mexicanFoods = new Set([
  "tortillas",
  "beans",
  "rice",
  "tomatoes",
  "avocado",
  "garlic",
]);

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const arr = [2, 4, 6];

const [x, y, z] = arr; //Destructuring an array, it's like unpacking or retrieve elements from an array

console.log(x, y, z);

let [main, secondary] = restaurant.categories; //This will take the first element(element at index 0) and the second element(element at index 1) in array and assign them to the main and secondary variable

// Suppose we want to get first and the third element on the array without creating 3 variables, we would leave a hole by using commas within the destructuring operator
// let [main, , secondary] = restaurant.categories; //Here's the first and the third element will be assigned to main and secondary variables

console.log(`Before switching:  ${main}, ${secondary}`);

// // Suppose we want to switch the two variables without destructing operator
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(`After switching:  ${main}, ${secondary}`);

// Switching variables with destructuring operators
// NOTE: The desctructuring operator is the same as the array [], but is located at the LHS
// We first need to create an array of two variables inverted [secondary, main], then we've to destructure that created array
// [main, secondary] = [secondary, main]; //INFO: Here's we dont need let or const keyword because we are reassign the variables
// console.log(`After switching:  ${main}, ${secondary}`);

console.log(restaurant.order(2, 0)); //This will log the array

// Destructuring the array
const [starterCourse, maincourse] = restaurant.order(2, 0);
console.log(`Order:  ${starterCourse}, ${maincourse}`);

// Destructuring the nested array
const nested = [2, 4, [5, 6]];

// Suppose we want to get the first element and the whole array at the third position
const [first, , third] = nested;
console.log(first, third);

// But if we want to destruct the actual values inside the that nested array , we would have also to nest the destructuring operator
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Setting default values while destructuring, this can be useful when we dont know the size of an array that you're trying to destruct

const [p = 1, q = 1, r = 1] = [8, 9]; //This will help to avoid getting undefined as we try to access the element that does not exist in an array
console.log(p, q, r);
