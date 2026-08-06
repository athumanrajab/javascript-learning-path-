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
*/

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

