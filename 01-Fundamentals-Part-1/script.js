/*
let js = "amaizing";
if (js === "amaizing") alert("JavaScript is FUN!");

console.log(40 + 8 + 23 - 10);

// Rules for naming variables in JavaScript
// 1. We use camelCase for variable names in JavaScript
// 2. Variable names can only contain letters, numbers, underscores, and dollar signs
// 3. Variable names cannot start with a number
// 4. Variable names cannot be reserved keywords in JavaScript such as let, function, or const, new

// 5. Variable names should be descriptive and meaningful
let myFirstJob = "Programmer";
let myCurrentJob = "Teacher";

let job1 = "Programmer";
let job2 = "Teacher";

// 6. Variable names are case-sensitive
// 7. Variable names should not contain spaces
// 8. Variable names should not be too long or too short
// 9. Variable names should not start with uppercase letter because it is reserved for classes and constructors
// 10. Variable names should not contain special characters such as @, #, %, &, *, etc.
// 11.Variable names that contain all uppercase letters are usually reserved for constants such as PI, MAX_VALUE, etc.

let firstName = "Jonas";
console.log(firstName);

// The 7 Primitive Data types
// 1.Number - Floating point numbers, Used for decimals and integers 
let age = 23;

// 2.String - Sequence of characters , Used for text 
let lastName = "Danniel";

// 3.Boolean - Logical types that can only be True or False, Used for taking decisions
let isEmpty = true;

// 4.Undefined - Value taken by a variable that is not yet defined 
// It's simply referred to as "Empty value", It's the variable
// that you can declare without assigning it's value 
let children;

// 5.Null - also means empty value 

// 6.Symbol (ES2015) - Value that is unique and cannot be changed

// 7.Bigint (ES2020) - Larger integers that the number type can hold

// JavaScript has dynamic typing - We do not have to manually define the data type of the value stored in a variable. Instead, data types are determined automatically

let javascriptIsFun = true;

console.log(typeof javascriptIsFun);
console.log(typeof 23);
console.log(typeof "javascriptIsFun");
// typeof can be used to show the data type of the value 


// Value has type, NOT variable

// We can also assign a new value of different data type to the same variable without a problem

javascriptIsFun = "The value has changed from boolean to string"
console.log(javascriptIsFun);
console.log(typeof javascriptIsFun)

// The following piece of code is considered to be a bug in javascript , it occur when you check the type of null, and it return type "object"
console.log(typeof null)
*/

/*
// Variable declaration
// 1.Use "let" to declare variable that can be changed later in code (Mutable variables)

let age = 30;
age = 32;

let firstName;
firstName = "John"

// 2.Use the "const" to declare variable that are not supposed to be changed in the future (Immutable variables)

const PI = 3.14;
// PI = 2.9; //uncaught TypeError: Assignment to constant variable.

// Also the const variable cannot be declared without assigning the value to it

// const birthyear; //Uncaught SyntaxError: Missing initializer in const declaration

// 3.Avoid the use of var in declaring variables, because the old ways of declaring variables and can easily leads to bugs

// var is function-scoped, not block-scoped - such that it ignores blocks (if, for, while, etc)
if (true) {
    var message1 = "Hello world"
}
console.log(message1); //on the console it will print "Hello world"

// But with let keyword, it will print "ReferenceError" on the console
if (true) {
    let message2 = "Another Hello world"
}
// console.log(message2); //Uncaught ReferenceError: message2 is not defined

//Also var can be redeclared, preventing redeclaration helps catches mistakes easily

var birthYear = 1990;
var birthyear = 1991;

// while with let , the console will print syntaxError

let hasDance = true;
// let hasDance = false; //Uncaught SyntaxError: Identifier 'hasDance' has already been declared

//But also in javaScript you can write a variable without declaring it but it not the best practice

middlename = "Fayma";
console.log(middlename);
*/



/*
// Coding Challenge #1
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.
GOOD LUCK 😀
*/
/*
let markMass , markHeight, johnMass, johnHeight;

markMass = 78;
markHeight = 1.69;
johnMass = 92;
johnHeight = 1.95;

let markBMI = markMass / (markHeight * markHeight);

console.log("markBMI: ", markBMI)

let johnBMI = johnMass / (johnHeight * johnHeight);

console.log("johnBMI: ", johnBMI)

let markHigherBMI = markBMI > johnBMI;
console.log(markHigherBMI);
*/

/*
// We can avoid string concatination by using template string or template literal which is the back tick `` found above the key tab with ${variable name}

const firstName = "Danniel";
const lastName = "Purcell";
const birthYear = 2003;
const currentYear = 2026;
const job = "Back-end developer";

const templateString = `I'm ${firstName} ${lastName}, ${currentYear - birthYear} years old ${job}`

console.log(templateString);

// Template literal can also be used to write regular string

console.log(`This is a regular string`);

// Template literal is also useful when string extends multiple line

console.log(`This is the string with
    multiple
    lines`);
*/

/*
Coding Challenge #2
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.
Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"
Hint: Use an if/else statement 😉
GOOD LUCK 😀


let markMass , markHeight, johnMass, johnHeight;

markMass = 78;
markHeight = 1.69;
johnMass = 92;
johnHeight = 1.95;

let markBMI = markMass / (markHeight * markHeight);

let johnBMI = johnMass / (johnHeight * johnHeight);


if (markBMI > johnBMI) {
    console.log(`Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI})!`);
} else {
    console.log(`John's BMI (${johnBMI}) is higher than Marks's BMI (${markBMI})!`);
}
*/

/*
// Type conversion(Manually convert one type to another)
// 1.Converting string to a number by using Number()
const birthYear = "1990";
console.log(`Initially the birth year is: ${typeof birthYear}`);
const newBirthYear = Number(birthYear);
console.log(`Finally the birth year is: ${typeof newBirthYear}`);

// 2.Converting number to a string by using String()
const luckNumber = 9;
console.log(`Initially my Lucky number is: ${typeof luckNumber}`);
const newLuckNumber = String(luckNumber);
console.log(`Finally my Lucky number is: ${typeof newLuckNumber}`);

// Type Coercion(JavaScript automatically convert one data type into another), it is not the best practice to use Type Coercion because it introduce bugs into our program

console.log("I am " + 24 + "Years old") //Here's the 24 is automatically converted by javascript from a number to a string by using the + operator

console.log("23" - "10" - 3); //Here's the 23 and 10 are automatically converted to a number by using the - operator

console.log("23" * "10" * 3); //Here's the 23 and 10 are automatically converted to a number by using the * operator
*/


/*
// Truthy and Falsy Values
// Falsy values are the values that are not exactly false, but they will become false when we try to convert them into a boolean by using Boolean().

// 5 falsy values: 0, ""(empty string), undefined, null, NaN(Not a Number/Invalid number), Everything else will be referred to as truthy values

console.log(Boolean(0));
console.log(Boolean(""));

console.log(Boolean(undefined));

let age; //This also is undefined variable so when converted to boolean , it'll has false value
console.log(Boolean(age));

console.log(Boolean(null));
console.log(Boolean(NaN));

console.log(Boolean("jones"));

// In practice the conversion of boolean in always implicit(type coercion, that javaScript automatically does behind the scene), not explicit

// Below codes show how javaScript automatically convert values into boolean

const money = 0;

if (money) {
    console.log("Don't spend it all !")
} else {
    console.log("You should get a job!") //This second block will be executed because 0 is falsy value
}

// Truthy and falsy value can be used to check if the variable is actually defined or not

let height;

if (height) {
    console.log("YAY! Height is defined")
} else {
    console.log("Height is UNDEFINED") //Since we didnt assign any value yet to height then the height is undefined, but also since undefined has falsy value then the else block will be executed
}
*/

// Equality Operators ==(loose equality) VS ===(strictly equality)
// strictly equality operator (===) does not perfomr type coercion hence it return true when both values are exactly the same

const age = 18;
if (age === 18) {
    console.log("You just become an adult")
}

// loose equality operator(==) does type coercion
console.log("18" == 18) //Here's the == operator perform type coercion , such that "18" will be converted to a number. Hence it will return true

// NB: Avoid the use of loose equality operator as much as you can when comparing values because it can be hard to find bugs in our codes..
// Always use strict equality operator for clean code

// We can also prompt the user on the browser for input by using prompt() which accept any value and converted into string 

let luckNumber;
luckNumber = prompt("What's your lucky number?: "); //any value entered by the user will be converted into string
console.log(typeof luckNumber);

// If the aim is to get the data as a number , the we should convert the string into number manually(Type Conversion) by using Number()

let luckyNumber = Number(luckNumber)
console.log(typeof luckyNumber)

// All the above process can be generally written as 
let luckNumber = Number(prompt("What's your lucky number?: "))
console.log(typeof luckNumber)

