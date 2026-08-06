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