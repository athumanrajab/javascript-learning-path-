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