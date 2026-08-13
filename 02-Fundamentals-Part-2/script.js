/*
// Activating strict mode in javascript helps to avoid some common mistakes and bugs in the code. It prevents the use of undeclared variables and other unsafe actions such as using of reserved keywords such as interface, if, etc.
"use strict";

let hasDriversLicense = false;
let passTest = true;

if (passTest) hasDriverLicense = true; // This line will throw an error on the console with the help of strict mode because "hasDriverLicense" is not declared. The correct variable name is "hasDriversLicense".
if (hasDriversLicense) console.log("I can drive");

const interface = "Audio"; // This line will throw an error on the console with the help of strict mode because "interface" is a reserved keyword in javascript.
*/

/*
// Functions
// This function does not accept any parameters and does not return any value.
function logger(){
    console.log("My name is Danniel");
}

// Calling / Running / Invoking function
logger();

// This function accepts two parameters and returns a value.
function fruitProcessor(apples, oranges){
    console.log(`Appples: ${apples}, Oranges: ${oranges}`);
    const juice = `Juice made with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

fruitProcessor(5, 0); // This will not return anything because the return value is not stored in a variable or logged to the console.

const appleJuice = fruitProcessor(5, 0); // This will store the return value of the function in a variable.
console.log(appleJuice); // This will log the return value of the function to the console.

const orangeJuice = fruitProcessor(0, 5); // This will store the return value of the function in a variable.
console.log(orangeJuice); // This will log the return value of the function to the console.

const mixedJuice = fruitProcessor(2, 4); // This will store the return value of the function in a variable.
console.log(mixedJuice); // This will log the return value of the function to the console.

console.log(fruitProcessor(3, 2)); // This will log the return value of the function to the console without storing it in a variable.
*/


/*
// Function declarations vs Function expressions
// Function declaration can be done by using the "function" keyword followed by the function name and parameters. Function declarations are hoisted, which means they can be called before they are defined in the code.

function calcAge1(birthYear){
    return 2026 - birthYear;
}

const age1 = calcAge1(2003);
console.log(`You're ${age1} years old.`);

// Function expression can be done by assigning a function to a variable. Function expressions are not hoisted, which means they cannot be called before they are defined in the code.

const calcAge2 = function(birthYear){
    return 2026 - birthYear;
}

const age2 = calcAge2(2003); //
console.log(`You're ${age2} years old.`);
*/


/*
// Arrow functions
// Arrow functions can be implemented by using the "=>" syntax. Arrow functions are always expressions and they do not have their own "this" keyword. They are best suited for non-method functions.

const calcAge3 = birthYear => 2026 - birthYear; // This is a single parameter arrow function that returns the age based on the birth year.You dont need to use the "return" keyword or curly braces for single line arrow functions.

const age3 = calcAge3(2003);
console.log(`You're ${age3} years old.`);

// Arrow function with single parameters and multiple lines of code can be implemented by using the "=>" syntax with curly braces and return keyword.

const yearsUntilRetirement1 = birthYear => {
    const currentAge = 2026 - birthYear;
    const maxRetirementAge = 65;
    const retirementAge = maxRetirementAge - currentAge;
    return retirementAge;
}

const retirementAge1 = yearsUntilRetirement1(2003);
console.log(`You have ${retirementAge1} years until retirement.`);

// Arrow function with multiple parameters and multiple lines of code can be implemented by using the "=>" syntax with curly braces and return keyword.

const yearsUntilRetirement2 = (birthYear, firstName) => {
    const currentAge = 2026 - birthYear;
    const maxRetirementAge = 65;
    const retirementAge = maxRetirementAge - currentAge;
    return `${firstName} has ${retirementAge} years until retirement.`;
}

let retirementAge2; //This variable is declared outside the function so that it can be used to store the return value of the function and log it to the console.
retirementAge2 = yearsUntilRetirement2(2003, "Danniel");
console.log(retirementAge2);

retirementAge2 = yearsUntilRetirement2(2004, "Carrine");
console.log(retirementAge2);
*/

/*
// Funtions calling other functions,
// This is a good practice to keep the code modular and reusable. It also helps to avoid code duplication and makes the code easier to read and maintain.

// Cutting fruit into pieces, This function accepts a number of fruits and returns the number of pieces of fruit. Each fruit is cut into 4 pieces.
function cutFruitPieces(fruit){
    return fruit * 4;
}

// This function accepts two parameters, the number of apples and oranges, and returns a string that describes the juice made with the given number of pieces of apple and orange. It calls the cutFruitPieces function to get the number of pieces of each fruit.
function fruitProcessor(apples, oranges){
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    console.log(`Apple pieces: ${applePieces}`);
    console.log(`Orange pieces: ${orangePieces}`);

    return `Juice made with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
}

const mixedJuice = fruitProcessor(2, 3); 
console.log(mixedJuice);
*/




/*
Coding Challenge #1
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new
gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so
one average score per team).
A team only wins if it has at least double the average score of the other team.
Otherwise, no team wins!
Your tasks:
1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team
as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner
to the console, together with the victory points, according to the rule above.
Example: "Koalas win (30 vs. 13)"
4. Use the 'checkWinner' function to determine the winner for both Data 1 and
Data 2
5. Ignore draws this time
Test data:
§
§
Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
Hints:
§To calculate average of 3 values, add them all together and divide by 3
§To check if number A is at least double number B, check for A >= 2 * B.
Apply this to the team's average scores 😉
GOOD LUCK 😀


const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

    // // Test Data 1
    // let avgDolphinsScore = calcAverage(44, 23, 71);
    // let avgKoalasScore = calcAverage(65, 54, 49);

    // Test Data 2
    let avgDolphinsScore = calcAverage(85, 54, 41);
    let avgKoalasScore = calcAverage(23, 34, 27);

function checkWinner(avgDolphins, avgKoalas){
    
    if(avgDolphins >= 2 * avgKoalas){
        return `Dolphins win ${avgDolphins} vs ${avgKoalas}`;
    }
    else if(avgKoalas >= 2 * avgDolphins){
        return `Koalas win ${avgKoalas} vs ${avgDolphins}`;
    }
    else{
        return `No team wins`;
    }
}

const winner = checkWinner(avgDolphinsScore, avgKoalasScore);
console.log(winner);
*/

/*
// Arrays
const friends = ["Michael", "Steven", "Peter"]; //This is an array literal that contains three string elements. Arrays are used to store multiple values in a single variable.
console.log(friends);

const years = new Array(1991, 1984, 2008, 2020); //This is an array constructor that creates an array with four number elements. Arrays can also be created using the Array constructor.
console.log(years);

console.log(friends[0]); //This will log the first element of the array to the console.
console.log(friends[2]); //This will log the third element of the array to the console.

console.log(friends.length); //This will log the length of the array to the console.

console.log(friends[friends.length - 1]); //This will log the last element of the array to the console. The last element of an array can be accessed by using the length property of the array and subtracting 1 from it.

// Also inside [] we can store any type of data such as numbers, strings, and expressions. We can also store other arrays and objects inside an array. This is called a nested array or multidimensional array.

friends[1] = "Danniel"; //This will change the second element of the array to "Danniel". Arrays are mutable, which means we can change the elements of an array after it has been created.
console.log(friends); //This will log the updated array to the console.

// Only the primitive values declared with const are immutable(they cannot be changed). Arrays and objects declared with const are mutable(they can be changed). We can change the elements of an array.However, we cannot reassign a new array or object to a variable declared with const.

friends[0] = 2000;
friends[1] = 2001;
friends[2] = 2002;
console.log(friends); //This will log the updated array to the console.

// We cannot reassign a new array to a variable declared with const. The following line will throw an error on the console.

const newFriends = ["John", "Jane", "Jack"];
// newFriends = ["Mary", "Mark", "Mike"]; // This line will throw an error on the console because we cannot reassign a new array to a variable declared with const. However, we can change the elements of the array as shown above.
// // console.log(newFriends); //This will log the updated array to the console.

// We can also create an array with mixed data types. This is called a heterogeneous array. However, it is not a good practice to create an array with mixed data types because it can lead to confusion and bugs in the code. It is better to create an array with homogeneous data types.

const firstName = "Danniel";
const lastName = "Purcell";
const myProfile = [firstName, lastName, 2026 - 2003, "Software Engineer", newFriends];
console.log(myProfile); //This will log the array to the console.

// Exercise

// The below function is a function expression that calculates the age of a person based on their birth year. It takes one parameter, birthYear, and returns the age by subtracting the birth year from the current year (2026). The function is assigned to a variable called calcAge.
const calcAge = function(birthYear){
    return 2026 - birthYear;
}

const yearsArray = [1990, 1967, 2002, 2010, 2018]; //This is an array literal that contains five number elements. It represents the birth years of five people.

const age1 = calcAge(yearsArray[0]); //This will calculate the age of the first person in the array by passing the first element of the array to the calcAge function.
const age2 = calcAge(yearsArray[1]); //This will calculate the age of the second person in the array by passing the second element of the array to the calcAge function.
const age3 = calcAge(yearsArray[yearsArray.length - 1]); //This will calculate the age of the last person in the array by passing the last element of the array to the calcAge function.

console.log(age1, age2, age3); //This will log the ages of the three people to the console.

// But also we can directly pass the calcAge function to the array elements without storing them in variable , and store them in a new array.

const ages = [calcAge(yearsArray[0]), calcAge(yearsArray[1]), calcAge(yearsArray[yearsArray.length - 1])]; //This will create a new array called ages that contains the ages of the three people by passing the elements of the yearsArray to the calcAge function.
console.log(ages); //This will log the ages array to the console.
*/



/*
// Basic Array Operations (Methods)

// Add elements either to the begining or end of the array

const friends = ["John", "Jane", "Jack"];
friends.push("Danniel"); //The push method adds the new element to the end of the array.
console.log(friends);

// Also the push function return the length of the array, consider the code below

// const lengthOfFriends = friends.push("Purcell");
// console.log(lengthOfFriends);

friends.unshift("Carrine"); //The unshift method add the new element to the begining of the array
console.log(friends);

// Also the unshift function return the length of the array, consider the code below

const lengthOfFriends = friends.unshift("Nevin");
console.log(`The length of the array is : ${lengthOfFriends}`);

// Remove elements
friends.pop() //The pop function will remove the last element of the array
console.log(friends)

// Unlike the push function which return the length of the array, the pop function return the popped(removed) element

// const poppedElement = friends.pop();
// console.log(`The removed element is: ${poppedElement}`);

friends.shift(); //The shift functions remove the first element on the array
console.log(friends);

// Also the shift function return the popped(removed) element

const poppedElement = friends.shift();
console.log(`The removed element is: ${poppedElement}`);

// We can also check the position/index of any element in an array by usinf indexOf()
console.log(friends.indexOf("John"));

// We can also check if an element either belonf to that array of not by using includes(). It will return true if the element belong to that array , or false if the element does not belong to that array
console.log(friends.includes("Jane"));
console.log(friends.includes("Emmanuel"));

// One of the usefull application of the includes() method is that, it can be used with conditional statement, consider the codes below

if(friends.includes("Paula")){
    console.log("You have friend called Paula");
}
else{
    console.log("You don't have friend called Paula");
}
*/



/*
Coding Challenge #2
Steven is still building his tip calculator, using the same rules as before: Tip 15% of
the bill if the bill value is between 50 and 300, and if the value is different, the tip is
20%.
Your tasks:
1. Write a function 'calcTip' that takes any bill value as an input and returns
the corresponding tip, calculated based on the rules above (you can check out
the code from first tip calculator challenge if you need to). Use the function
type you like the most. Test the function using a bill value of 100
2. And now let's use arrays! So create an array 'bills' containing the test data
below
3. Create an array 'tips' containing the tip value for each bill, calculated from
the function you created before
4. Bonus: Create an array 'total' containing the total values, so the bill + tip
Test data: 125, 555 and 44
Hint: Remember that an array needs a value in each position, and that value can
actually be the returned value of a function! So you can just call a function as array
values (so don't store the tip values in separate variables first, but right in the new
array) 😉
GOOD LUCK 😀


const tip = function calcTip(bill){
    if(bill >=50 && bill<=300){
        return bill * 0.15;
    }
    else{
        return bill * 0.2;
    }
}

const bills = [125,555,44];

const tips = [tip(bills[0]), tip(bills[1]), tip(bills[2])];

const total = [bills[0]+tips[0], bills[1]+tips[1], bills[2]+tips[2]];
*/

/*
// Introduction to objects
// We use objects to essentially group together different variables that really belong together, we store them in key: value pair

// The simplest way of creating an object is by using curly braces and it's sometimes refers to as "Object Literal Syntax"

// Unlike arrays , the order of items in object does not matter when we want to retrieve items. This property make arrays to be much useful in structure data while object to be usefull in unstructured data

// The contents inside object are called properties, example firstName, lastName, age etc these are called properties

const danniel = {
    firstName: "Danniel",
    lastName: "Purcell",
    age: 2026 - 2003,
    job: "Software developer",
    friends: ["Nevin", "Carrine", "John"]
};

// There are two ways of retrieve or access the properties from an objects which are "Dot Vs Bracket Notation"

// The first way of access the properties from an object is by using Dot Notation which involve the use of "." and the property name to get the value of that property

console.log(danniel.job);

// The second way of access the properties from an object is Bracket Notation which involve the use of "[]" and the property name to get the value of that property.

console.log(danniel["job"]);

// But also we can put any expression inside [] as shown below
const nameKey = "Name";

console.log(danniel["first" + nameKey]);
console.log(danniel["last" + nameKey]);

const interestedIn = prompt("What do you want to know about Danniel? Choose between firstName, lastName, age, job and friends")

// console.log(danniel[interestedIn]);

// When we try to access the property that does not exist in a given object the result will be undefined...
// Since the "undefined" is falsy value value we can limit the user to choose only the available properties 

if(danniel[interestedIn]){
    console.log(danniel[interestedIn]);
}else{
    console.log("The property does not exist! Please choose between firstName, lastName, age, job and friends");
}

// Adding properties to an object can also be done by using either dot notation or bracket notation as shown below

danniel.location = "Tanzania";
danniel["instagram"] = "@iampurcell";
console.log(danniel);

// Challenge: convert the following sentence in dynamic way "Jonas has 3 friends, and his best friend is called Nevin".

console.log(`${danniel.firstName} has ${danniel.friends.length} friends, and his best friend is called ${danniel.friends[0]}`);
*/


/*
// Object Methods
const danniel = {
    firstName: "Danniel",
    lastName: "Purcell",
    birthYear: 2003,
    job: "Software developer",
    friends: ["Nevin", "Carrine", "John"],
    hasDriverLicense: false,

    // Any function that is attached to an object is called a method
    // calcAge: function(birthYear){
    //     return 2026 - birthYear;
    // }

    // We can use the "this" keyword to access the properties of the object without passing any argument to the method as shown below
    // calcAge: function(){
    //     console.log(this); // The "this" keyword is a special variable that is created for every execution context. It is a reference to the object that is calling the method. In this case, the "this" keyword is a reference to the "danniel" object.
    //     return 2026 - this.birthYear;
    // }

    // We can also store the return value of the method in a property of the object as shown below
    calcAge: function(){
        this.age = 2026 - this.birthYear; // This will create a new property called "age" in the "danniel" object and store the return value of the method in that property.
        return this.age;
    },

    // Challenge: Write a method called getSummary that will summarize the object information as follows "Danniel is a 46-years old teacher, and he has a driver's license."

    // ownDriverLicense: function(){
    //     return this.hasDriverLicense? "he has driver's license.": "he has no driver's license.";
    // },
    
    // getSummary: function(){
    //     return `${this.firstName} is a ${this.calcAge()}-years old ${this.job}, and ${this.ownDriverLicense()}`
    // }

    // The above codes can also be implemented as follows
    getSummary: function(){
        return `${this.firstName} is a ${this.calcAge()}-years old ${this.job}, and he has ${this.hasDriverLicense? "a": "no"} driver's license`
    }
};

// To access the calcAge method, we can use either Dot notation or bracket Notation by directly passing the argument to the method
// console.log(danniel.calcAge(2003));
// console.log(danniel["calcAge"](2003));

// Through the use of "this" keyword we can access the properties of the object without passing any argument to the method as shown below
console.log(danniel.calcAge());
console.log(danniel["calcAge"]());  //These two ways will be computationally expensive because assume we want to use the age 10 times in our program , then we have to repeat calling the function multiple times

// Solution to above problem is store the return value of the method in a property of the object, this will help to call the function once and then we can use the stored value multiple times as shown below

console.log(danniel.age);
console.log(danniel.age);
console.log(danniel.age);
console.log(danniel.age);


console.log(danniel.getSummary());
*/



/*
Coding Challenge #3
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to
implement the calculations! Remember: BMI = mass / height ** 2 = mass
/ (height * height) (mass in kg and height in meter)
Your tasks:
1. For each of them, create an object with properties for their full name, mass, and
height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same
method on both objects). Store the BMI value to a property, and also return it
from the method
3. Log to the console who has the higher BMI, together with the full name and the
respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m
tall.
GOOD LUCK 😀

 const mark = {
    fullName: "Mark Miller",
    mass: 78,
    height: 1.69,

    calcBMI: function(){
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI
    }
 };

 const john = {
    fullName: "John Smith",
    mass: 92,
    height: 1.95,

    calcBMI: function(){
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI
    }
 };

 const markBMI = mark.calcBMI();
 const johnBMI = john.calcBMI();

if (markBMI > johnBMI) {
    console.log(`${mark.fullName}'s BMI(${mark.calcBMI()}) is higher than ${john.fullName}'s (${john.calcBMI()}).`)
} else if(johnBMI > markBMI) {
    console.log(`${john.fullName}'s BMI(${john.calcBMI()}) is higher than ${mark.fullName}'s (${mark.calcBMI()}).`)
}else{
    console.log("Both have equal BMI!")
}
*/



/*
// Iteration_The for Loop
const purcellArray = [
    "Danniel",
    "Purcell",
    2026 - 2003,
    "Teacher",
    ["Nevin", "Carrine", "Emmanuel"]
];

// Creating new array that will be used to store type of each variable
const types = [];

// for loop keeps running while the condition is true
for(let i = 0; i < purcellArray.length; i++){
    console.log(purcellArray[i], typeof purcellArray[i]);

    // Filling types array
    types.push(typeof purcellArray[i]);
}

console.log(types);

const birthYears = [1991, 2003, 1998, 2000];
const ages = [];

for(let i = 0; i < birthYears.length; i++){
    ages.push(2026 - birthYears[i]);
}

console.log(ages)

// continue Vs break
// continue is to exit(skip) the current iteration of the loop and continue with to the next one
// break is to completely terminate the whole loop

console.log("--- PRINTING ONLY STRINGS ---");
for(let i = 0; i < purcellArray.length; i++){
    if(typeof purcellArray[i] !== "string"){
        continue;
    }
    console.log(purcellArray[i], typeof purcellArray[i]);
}

console.log("---  BREAK WITH NUMBER ---");
for(let i = 0; i < purcellArray.length; i++){
    if(typeof purcellArray[i] === "number"){
        break;
    }
    console.log(purcellArray[i], typeof purcellArray[i]);
}
*/


/*
// Lopping backwards
const purcellArray = [
    "Danniel",
    "Purcell",
    2026 - 2003,
    "Teacher",
    ["Nevin", "Carrine", "Emmanuel"]
];

for(let i = purcellArray.length - 1; i >= 0; i--){
    console.log(i, purcellArray[i]);
}

// Creating loops inside another loops
for(let exercise = 1; exercise <= 3; exercise++){
    console.log(`--- Starting Exercise ${exercise} ---`);
    for(let rep = 1; rep <= 5; rep++){
        console.log(`Lifting weight repetition ${rep}`);
    }
}
*/


// The while Loop: The while loop does not depend on counter variable, so it become useful when you need a loop without a counter
let rep = 1;
while(rep <= 10){
    console.log(`WHILE: Lifting weights repetition ${rep}`);
    rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while(dice !== 6){
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if(dice === 6){
        console.log("The loop is about to end...")
    }
}






