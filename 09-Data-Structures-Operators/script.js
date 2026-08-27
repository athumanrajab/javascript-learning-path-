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
  orderPasta: function (ingridient1, ingridient2, ingridient3) {
    console.log(
      `Here is your delicious pasta made with ${ingridient1}, ${ingridient2}, ${ingridient3}`,
    );
  },
  orderPizza: function (mainIngridient, ...otherIngridient) {
    console.log(`Main ingridient: ${mainIngridient}`);
    console.log(`Other ingridient: ${otherIngridient}`);
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

/*
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


// Calling the function by specify the argument values
restaurant.orderDeliver({
  starterIndex: 2,
  mainIndex: 1,
  address: "Ubungo Msewe",
  time: "22:30",
});
*/

/*
// The Spread Operator (...)
// spread operator(...) is used to unpack the elements of an array or object, and it can be used in places where we would otherwise write values separated by commas. The spread operator is used when we want to create a new array or object based on an existing one, or when we want to pass multiple values as arguments to a function.

// Suppose we want to create a new array that has elements of the a certain previous created array (arr)
// Case 1: We can do it manually as follows
const arr = [7, 8, 9];
const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArray);

// Case 2: By using spread operator
const goodNewArray = [1, 2, ...arr];
console.log(goodNewArray);

// Whenever we need the values of arrays individually we can use the spread operator
console.log(...goodNewArray);

// We can also expand the mainMenu array in restaurant object
const newMainMenu = [...restaurant.mainMenu, "Gnocci"]; //Here we are creating a completely new array
console.log(newMainMenu);

// We can also create copy of array by using the spread operator
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Spred operator can also be used to join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Spread operator works for all iterables which includes, arrays, strings, maps, stes, but NOT objects
const str = "Purcell";
const letters = [...str, " ", "D."];
console.log(letters);

// We  can use the spread operator to pass as argument to the function, now let's get the ingridient values from the user and store them in an array
// const ingridients = [
//   prompt(`Please enter the first ingridient: `),
//   prompt(`Please enter the second ingridient: `),
//   prompt(`Please enter the third ingridient: `),
// ];

// We can pass the ingridients array function to the restaurant.orderPasta() as follow
// Case 1: we can manually pass the ingridients
// restaurant.orderPasta(ingridients[0], ingridients[1], ingridients[2]);

// Case 2: We can use the spread operator to pass the array elements as arguments in restaurant.orderPasta()
// restaurant.orderPasta(...ingridients);

// But ES2018, make the spread operator to also be used in object, such that we can create a new object with the same or more properties , the order does not matter
const newRestaurant = {
  ...restaurant,
  founder: "Danniel Purcell",
  foundIn: 2000,
};
console.log(newRestaurant);

// Spread operator can also be used to make a shallow copy object as follow
const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Mattie B\'s";
console.log(`Old restaurant name: ${restaurant.name}`);
console.log(`New restaurant name: ${restaurantCopy.name}`);
*/

/*
// Rest Pattern and parameters

// Consider the following code for SPREAD
const arr = [1, 2, 3, 4];
const newArr = [...arr, 5, 7]; // NOTE: This is the spread operator because it appears on the rightside of the assignment(=) operator
console.log(newArr);

// Again consider the code below for REST operator
// The rest operator collects the elements that are unused in the destructuring assignment
const [a, b, ...others] = [1, 2, 3, 4, 5]; // NOTE: This is the rest operator because it appears on the leftside of the assignment(=) operator, It's called rest because it'll take the rest(remaining elements) of the array and then put them into a new array and in this case we call this array "others"
console.log(a, b, others);

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);
// We can use then destructure the menu array, say that we only need the first food and the third food, and the rest of the food through rest operator
const [firstPizza, , thirdRisotto, ...otherFood] = menu;
console.log(firstPizza, thirdRisotto, otherFood);

// The rest operator also applied to object, but here the unused items will be collected into a new object
const { sat: weekEnd, ...weekDays } = restaurant.openingHours; //Here's the thu and friday objects are unused hence the rest operator will collect them and put them in new weekDays object
console.log(weekDays);

// Consider the following functions that takes many arguments and add them together to get the sum. This is possible since we can use the rest operator that will collect every argument passed to that function and collect it in an array , then we can use the for loop to loop and add element into that array
const add = function (...numbers) {
  console.log(`Array is: ${numbers}`);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(`Sum is : ${sum}`);
};

add(1, 3);
add(45, 83, 35, 894);
add(748, 367, 7383, 883, 228);

// We can use spread operator
const x = [23, 45, 56];
add(...x); //Here's the array elements are unpacked and get spreaded in the add() as individual values, but when reaching the add function, the values will now be collected as arrays of numbers and pass as an argument on the add function

restaurant.orderPizza("Mushroom", "Onion", "Olive", "Spinach");
 */

/*
// Short Circuiting (&& , ||)
// OR operator(||) can be used to return the first truth value that exit on the sequence, consider the example below
console.log(3 || "Jonas"); //Here both 3 and jonas are truth values but 3 is the first one to appear hence it should be returned
console.log("" || "Jonas"); //Here, jonas the empty string "" is the falsy value hence jonas will be returned since it is the truthy value
console.log(true || 0); //true will  be returned since 0 is the falsy value
console.log(undefined || null); //null will be return since the || will return the last falsy value if all of the values are falsy in the sequence

// One of the usefull application of short circuit is that, it can be used instead of ternary operator to check is the certain property or value exist or not
// Consider from the code above we want to check if restaurant.numGuests exist .. if it's not exist we assign a certain default value to it , actually it does not exist by using ternary operator

// const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guest1);

// But we can use the || to check if restaurant.numGuests, such that if that numGuests property exist it will assign it's value to guest 2, if it's not exist means the value of numGuests will be udefined, and since the undefined is the falsy value hence the || will ignore it look for a truth value hence 12 will be assigned to guest2
// const guest2 = restaurant.numGuests || 12;
// console.log(guest2);

// // AND operator(&&), work opposite of the || operator such that it will return the first falsy value occur on the sequence, and incase the sequence contain all truth values then the last truth value will be return
// console.log(0 && "Jonas"); //Here 0 will be returned since it's the first falsy value
// console.log(7 && "Jonas"); //Here Jonas will be returned because the sequence contain all truth values, hence the last truth value will be returned
// console.log("Hello" && 23 && null && "Jonas"); //Here null will be return since it's the falsy value

// // && can be used instead of if, suppose we want to check if a certain property exist
// if (restaurant.orderPizza) {
//   restaurant.orderPizza("Mushroom", "Onion");
// }

// // But we use && to the above task
// restaurant.orderPizza && restaurant.orderPizza("Chicken", "tomatoes");

// Consider the case below were the numGuests is initially set to 0
restaurant.numGuest = 0;
const guest3 = restaurant.numGuest || 10; //This is where the || fail because 0 is the real number and the result here should be 0 because the restaurant.numGuest already exist and has been set to 0, but since 0 is the falsy value so here will be ignored hence 10 will be returned
console.log(guest3);

// The above problem can be solved by using Nullish coalescing operator ??
// ?? operator work for null and undefined value except 0 and ""

const guest4 = restaurant.numGuest ?? 10; //This is where the || fail because 0 is the real number and the result here should be 0 because the restaurant.numGuest already exist and has been set to 0, but since 0 is the falsy value so here will be ignored hence 10 will be returned
console.log(guest4);
*/

// There 3 new logical assignment operators that are introduced in ES2021

const restaurant1 = {
  name: "Capri",
  // numGuests: 20,
  numGuest: 0,
};
const restaurant2 = {
  name: "La Piazza",
  owner: "Danniel Purcell",
};

/*
// NOTE:  OR || operator (Short Circuit)
// Let use || to set the default value of properties if they dont exit
// restaurant1.numGuests = restaurant1.numGuests || 10;
// restaurant2.numGuests = restaurant2.numGuests || 10;

// NOTE: The above codes can be written by using OR assignment operator as follow
// NOTE: Logical OR || assignment operator
// restaurant1.numGuests ||= 10;
// restaurant2.numGuests ||= 10;
// console.log(restaurant1);
// console.log(restaurant2);

// The main challenge encountered by using this logical OR || operator, is that when the value of property is set to 0, the restaurant1.numGuests will be evakuated as falsy value hence 10 will be assigned as the default value
// This can be solved by using logical nullish assignment operator which work for (null or undefined)
// NOTE: Logical nullish ?? assignment operator
// restaurant1.numGuest ??= 10;
// restaurant2.numGuest ??= 10;
// console.log(restaurant1);
// console.log(restaurant2);

// NOTE: Logical AND && assignment operator
// &&  is used to reassign value of a variable or property that already exist, in such a way that it return the first falsy value
restaurant1.owner &&= "<Anonymous>"; //Here the owner property does not exist such that it's undefined, since it's falsy value hence it will be returned
restaurant2.owner &&= "<Anonymous>"; //Here the owner proprty exist hence it's truth value and hence the last value which is <Anonymous> will be returned
console.log(restaurant1);
console.log(restaurant2);
*/

/* 
Coding Challenge #1
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on
next page). In this challenge we're gonna work with that data.
Your tasks:
1. Create one player array for each team (variables 'players1' and
'players2')
2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players
3. Create an array 'allPlayers' containing all players of both teams (22
players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored
GOOD LUCK 😀

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// TODO: Task 1
// const player1 = game.players[0];
// const player2 = game.players[1];

const [player1, player2] = game.players;
console.log(player1);
console.log(player2);

// TODO: Task 2
const [goalKeper, ...fieldPlayers] = player1;
console.log(`Goal Keeper: ${goalKeper}`);
console.log(`Other Field Players: ${fieldPlayers}`);

// TODO: Task 3
const allPlayer = [...player1, ...player2];
console.log(allPlayer);

// TODO: Task 4
const players1Final = [...player1, "Thiago", "Coutinho", "Peristic"];
console.log(players1Final);

// TODO: Task 5
const { team1, x: draw, team2 } = game.odds;
console.log(team1);
console.log(draw);
console.log(team2);

// TODO: Task 6
const printGoals = function (...players) {
  console.log(...players); //here the spread operator is used to unpack the element of the players arrays created by using the rest operator on passing argument
  console.log(`${players.length} were scored`);
};

// Case 1:use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals("Davies", "Muller");

// Case 2: call the function again with players from game.scored
printGoals(...game.scored); //Since the game.scored is the array hence we must unpack it's values using spread operator , hence we can be able to pass them to the function

// TODO: Task 7
team1 < team2 && console.log("team1 is more likely to win");
team1 > team2 && console.log("team2 is more likely to win");
*/

// for-of Loop, this is just another way of looping an array
// This for-of loop allow the use of continue and break keyword
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

for (const item of menu) {
  console.log(item);
}

// Some of the ES6 enhanced object literal are
// Suppose we have an computer object declared globally
const computer = {
  brand: "Apple",
  model: "MacBook Pro",
  ramGB: 16,
  isLaptop: true,
};
// Then i need this computer object to also include in workstation object, the ES6 made it easier by simply taking the computer object name and write within the workstation NOT necessary to be in key-value pair
const workstation = {
  roomNumber: 302,
  hasDeskLight: true,
  monitorBrand: "Dell",
  computer,
};

// But also another useful feature is that when we are creating method , we dont have to use the key-value pair but also to use the function keywork
const workstation2 = {
  roomNumber: 302,
  hasDeskLight: true,
  monitorBrand: "Dell",
  computer,
  getDetails() {
    return `Room ${this.roomNumber} features an ${this.computer.brand} ${this.computer.model} connected to a ${this.monitorBrand} monitor.`;
  },
};
console.log(workstation2.getDetails());

// But also ES6 made easy for us to compute the property values, consider the code below
const weekDay = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

const hours = {
  [weekDay[3]]: {
    open: 12,
    close: 22,
  },
  [weekDay[4]]: {
    open: 11,
    close: 23,
  },
  [weekDay[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
