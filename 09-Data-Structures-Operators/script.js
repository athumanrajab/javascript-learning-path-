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
  orderDeliver: function ({ starterIndex, mainIndex, address, time }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address}, at ${time}`,
    );
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

/*
// Destructuring Arrays
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
*/

// Destructuring Objects, can done by using {} operator , and provide the variable names that exactly match the property names that we want to retrieve from the object
// NOTE: The order of the variable names does not matter when destructuring objects, but it does matter when destructuring arrays
// const { name, openingHours, categories } = restaurant;
// console.log(name);
// console.log(openingHours);
// console.log(categories);

// We can also use different names in {} apart from those property name during destructuring object as follows
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName);
// console.log(hours);
// console.log(tags);

// We can also set the default values of properties that we want to destructure for the case that there might be a time that we may not be sure if a certain property really exist in a given obect, this will prevent to get undefine
// // Case 1: Try to destructure the property (menu) that does not exist in an object
// const { menu, starterMenu } = restaurant;
// console.log(menu); //undefine
// console.log(starterMenu);

// Case 2: Try to destructure the property (menu) that does not exist in an object by assignin the default value
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu);
console.log(starters); //Since the starters exist in an object hence the assigned default value will be ignored

// Mutating variables
let a = 100;
let b = 200;
const obj = { a: 23, b: 7, c: 14 };

// TODO: We want re-assign the values of a and b declared with the let keyword from the values of a and b in an object
// HACK: We can do this by wrapping the destructuring operator with parentheses, this is because the JS engine will think that the left side of the assignment is a code block and not an object literal
({ a, b } = obj);
console.log(a, b);

// Destructring nested objects
// suppose we want to destructure the openingHour , since it's the object nested inside restaurant object

// Case 1: Destructuring inner object(openingHours) which is also a property of a restaurant object by using the exactly property name as appeared in an object
const { openingHours } = restaurant;
console.log(openingHours);

// Case 2:Destructuring inner object(openingHours) which is also a property of a restaurant object by assigning other name
const { openingHours: hours } = restaurant;
console.log(hours);

// Case 3:Since the openingHours also contain several objects nested to it which are thu,fri,and sat. We can keep destructuring as follow
// const { fri } = openingHours; //Here's we have destructured fri object, we can do the same thing for thu and sat
// const { fri, sat } = openingHours; // Here's we have destructured fri and sat object
// console.log(fri);

// Since thu, fri and sat are objects nested inside openingHours object, we further keep destructing them
// const { open, close } = fri;
// console.log(open, close);

// Also you can generally combine all above steps into one as follow
// const {
//   fri: { open, close },
// } = openingHours;
// console.log(open, close); //Here's we get the exactly values that are inside fri obj

// We can also assign the names of properties inside the fri obj
const {
  fri: { open: friOpenHour, close: friCloseHour },
} = openingHours;
console.log(friOpenHour, friCloseHour);

// One of the practical application of destructuring object is that, we can create a method inside an object and passing the destructuring operator with it's property as arguments , this is because when we normally call a function someone might not know the correct order required to pass the arguments.
/*
// So within the object will create a method like this
// orderDeliver: function ({ starterIndex, mainIndex, address, time }) {
//     console.log(
//       `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address}, at ${time}`,
//     );
//   }
// By doing this, will help during calling the function, we can specify the argument based on the property values without following the argument order

// You can also set the default value, so as incase a user forget to pass some values of properties when calling a function.. the default values will be used
// orderDeliver: function ({ starterIndex = 1, mainIndex = 1, address, time = "19:00" }) {
//     console.log(
//       `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address}, at ${time}`,
//     );
//   }
*/

// Calling the function by specify the argument values
restaurant.orderDeliver({
  starterIndex: 2,
  mainIndex: 1,
  address: "Ubungo Msewe",
  time: "22:30",
});
