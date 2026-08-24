"use strict";

/*
function calcAge(birthYear) {
  const age = 2026 - birthYear;

  function printAge() {
    const output = `${firstName}, you are ${age}, born in ${birthYear}.`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true; //NOTE: The variable declared with var keyword is not a block scope such that it can also be accessed outside the "if-block"
      const str = `oh, and you're a millenial, ${firstName}`; //NOTE: Only variable declared with const or let keyword can have a block scope, such that they can't be accessed outside the "if-block"
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    console.log(millenial);
    // console.log(add(2, 4)); // While the 'strict mode' is enabled, this will throw reference error, becaue the add() function has a block-scope , hence can be accessed with that if-block. But when the 'strict mode' is disabled , this code will be executed because it is no longer a block-scoped , it's a function-scoped hence it's available within the printAge() and not otherwise
    // console.log(str); This will throw reference error
  }
  printAge();
  // console.log(millenial); NOTE: This will also throw reference error since the millenial is only accessed within the if-block and printAge which is function scope
  return age;
}

const firstName = "Purcell";
calcAge(1991);
*/

/*
// Hoisting: Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. This means that you can use functions and variables before they are declared in the code. However, only the declarations are hoisted, not the initializations.
console.log(myName); // Output: undefined
// console.log(job); // Output: ReferenceError: Cannot access 'job' before initialization
// console.log(year); // Output: ReferenceError: Cannot access 'year' before initialization

var myName = "Purcell"; //NOTE: The variable declared with var keyword is hoisted to the top of the scope and initialized with undefined, hence it can be accessed before it's declaration but will return undefined
let job = "software engineer"; //NOTE: The variable declared with let keyword is hoisted to the top of the scope but not initialized, hence it can't be accessed before it's declaration and will throw reference error
const year = 1991; //NOTE: The variable declared with const keyword is hoisted to the top of the scope but not initialized, hence it can't be accessed before it's declaration and will throw reference error

// Function hoisting: Function declarations are hoisted to the top of their scope, which means you can call them before they are defined in the code. However, function expressions and arrow functions are not hoisted in the same way, so you cannot call them before they are defined.
console.log(addDecl(2, 3)); // Output: 5
// console.log(addExpr(2, 3)); // Output: ReferenceError: Cannot access 'addExpr' before initialization
// console.log(addArrow(2, 3)); // Output: ReferenceError: Cannot access 'addArrow' before initialization

function addDecl(a, b) {
  return a + b;
}

// The hoisting also depend with either the function is declared with var, let or const keyword. The function declared with var keyword is hoisted to the top of the scope and initialized with undefined, hence it can be accessed before it's declaration but will return undefined. The function declared with let or const keyword is hoisted to the top of the scope but not initialized, hence it can't be accessed before it's declaration and will throw reference error.
const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// Problems with hoisting: Hoisting can lead to unexpected behavior and bugs in your code, especially when using variables and functions before they are declared. It can make the code harder to read and understand, as it may not be clear where a variable or function is coming from. To avoid these issues, it's generally recommended to declare variables and functions at the top of their scope, and to use let and const instead of var for variable declarations.

var numProducts = 10;
if (!numProducts) deleteShoppingCart();

function deleteShoppingCart() {
  console.log("All products deleted!");
}

//NOTE: The above code will log "All products deleted!" to the console, even though numProducts is defined and has a value of 10. This is because the variable numProducts is hoisted to the top of the scope and initialized with undefined, which is a falsy value. Therefore, the condition in the if statement evaluates to true, and the deleteShoppingCart function is called. This can lead to unexpected behavior and bugs in your code, so it's important to be aware of hoisting and how it works in JavaScript.

//NOTE: Also, the variable declared with var keyword will create a proprty on the global window object(in browsers) or global object (in Node.js). Hence, the variable declared with var keyword can be accessed as a property of the window object in browsers or global object in Node.js. However, the variable declared with let or const keyword will not create a property on the global window object (in browsers) or global object (in Node.js). Hence, the variable declared with let or const keyword can't be accessed as a property of the window object in browsers or global object in Node.js.
//NOTE: The advantage of this is that it can help to avoid naming conflicts and accidental overwriting of global variables, which can lead to bugs and unexpected behavior in your code. By using let and const, you can create block-scoped variables that are only accessible within the block they are defined in, which can help to keep your code organized and prevent unintended side effects.
var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // Output: true
console.log(y === window.y); // Output: false
console.log(z === window.z); // Output: false
*/

/*
// this keyword: The this keyword in JavaScript refers to the object that is executing the current function. It can have different values depending on how the function is called, and it can be used to access properties and methods of the object that is executing the function. The value of this is determined at runtime, and it can be affected by factors such as the context in which the function is called, whether strict mode is enabled, and whether the function is called as a method of an object or as a standalone function.
console.log(this); // Output: Window { ... } (in browsers) or global object (in Node.js)

// Regular function call: In a regular function call, the value of this is determined by how the function is called. If the function is called as a standalone function, this will refer to the global object (in browsers) or undefined (in strict mode). If the function is called as a method of an object, this will refer to the object that the method is called on.
const calcAge = function (birthYear) {
  console.log(2026 - birthYear);
  console.log(this); // Output: undefined (in strict mode) or Window { ... } (in browsers)
};
calcAge(1991);

// Arrow function call: In an arrow function call, the value of this is determined by the surrounding lexical scope. This means that arrow functions do not have their own this value, but instead inherit it from the parent scope. If the arrow function is defined inside a regular function, this will refer to the same value as the regular function's this. If the arrow function is defined in the global scope, this will refer to the global window object (in browsers) or undefined (in strict mode).
const calcAgeArrow = (birthYear) => {
  console.log(2026 - birthYear);
  console.log(this); // Output: Window { ... } (in browsers) or global object (in Node.js)
};
calcAgeArrow(1991);

// Method call: In a method call, the value of this is determined by the object that the method is called on. If the method is called on an object, this will refer to that object. If the method is called on a different object, this will refer to that object instead.
const purcell = {
  year: 1991,
  calcAge: function () {
    console.log(this); // Output: purcell object
    console.log(2026 - this.year);
  },
};
purcell.calcAge();

// NOTE: The this keyword behaves differently in arrow functions compared to regular functions. In regular functions, this refers to the object that the function is called on, while in arrow functions, this refers to the surrounding lexical scope. This can lead to unexpected behavior when using arrow functions as methods of objects, as they do not have their own this value and will instead inherit it from the parent scope.
*/

/*
// Reglar function VS Arrow function: The main difference between regular functions and arrow functions is how they handle the this keyword. Regular functions have their own this value, which is determined by how the function is called. Arrow functions, on the other hand, do not have their own this value and instead inherit it from the surrounding lexical scope. This can lead to unexpected behavior when using arrow functions as methods of objects, as they will not have access to the object's properties and methods through this.
const purcell = {
  firstName: "Purcell",
  year: 2003,
  greet: () => console.log(`Hey, ${this.firstName}`),
};
purcell.greet(); // Output: Hey, undefined (in browsers) or Hey, undefined (in Node.js), this is undefined because the arrow function does not have its own this value and inherits it from the surrounding lexical scope, which is the global scope in this case. Since there is no firstName property in the global scope, it returns undefined.
// purcell is an object and it's not a block scope, hence the this keyword in the arrow function will not refer to the purcell object, but instead it will refer to the surrounding lexical scope, which is the global scope in this case. Since there is no firstName property in the global scope, it returns undefined.

// NOTE: You should never use an arrow function as a method of an object, because it will not have access to the object's properties and methods through this. Instead, you should use a regular function expression or a method shorthand syntax to define methods on objects, so that they have their own this value and can access the object's properties and methods correctly.

const danniel = {
  firstName: "Danniel",
  year: 2004,
  greet: function () {
    console.log(`Hey, ${this.firstName}`);
  },
};
danniel.greet(); // Output: Hey, Danniel, this is because the greet method is defined as a regular function expression, which has its own this value that refers to the danniel object. Therefore, it can access the firstName property of the danniel object correctly.

// var firstName = 'Matilda';

const jonas = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    // Solution 1
    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution 2
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
jonas.greet();
jonas.calcAge();
*/

/*
// arguments keyword
// Regular functions have argument object, which is an array-like object that contains all the arguments passed to the function.
const addExpr = function (a, b) {
  console.log(arguments); // Output: [Arguments] { '0': 2, '1': 5 } (in browsers) or [Arguments] { '0': 2, '1': 5 } (in Node.js)
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

// Arrow functions do not have their own arguments object, but they can access the arguments of the enclosing function.
var addArrow = (a, b) => {
  console.log(arguments); // Output: ReferenceError: arguments is not defined (in browsers) or ReferenceError: arguments is not defined (in Node.js)
  return a + b;
};
addArrow(2, 5, 8);
*/

/*
// Copying objects
const jessica = {
  firstName: "Jessica",
  lastName: "William",
  age: 27,
  family: ["Alice", "Bob"],
};

// Shallow copy: A shallow copy of an object is a new object that has the same properties as the original object, but the properties themselves are still references to the same objects in memory. This means that if you change a property of the original object, it will also change in the shallow copy, and vice versa. In JavaScript, you can create a shallow copy of an object using Object.assign() or the spread operator (...).
const marriedJessica = Object.assign({}, jessica); //NOTE: This will create a shallow copy of the jessica object, meaning that the properties of the jessica object will be copied to the new marriedJessica object, but if any of those properties are objects themselves, they will still reference the same object in memory. Hence, if we change any property of the nested object in either jessica or marriedJessica, it will affect both objects.
marriedJessica.lastName = "Davis";
console.log("Before marriage:", jessica);
console.log("After marriage:", marriedJessica);

//NOTE: The above code will log the following to the console:
// Before marriage: { firstName: 'Jessica', lastName: 'William', age: 27 }
// After marriage: { firstName: 'Jessica', lastName: 'Davis', age: 27 }

//NOTE: The Object.assign() method is used to copy the properties of one or more source objects to a target object. In this case, we are creating a new empty object {} as the target object and copying the properties of the jessica object to it. This creates a new object that has the same properties as the jessica object, but is a separate object in memory.

marriedJessica.family.push("Mary");
marriedJessica.family.push("John");

console.log("Before marriage:", jessica);
console.log("After marriage:", marriedJessica);

//NOTE: The above code will log the following to the console:
// Before marriage: { firstName: 'Jessica', lastName: 'William', age: 27, family: [ 'Alice', 'Bob', 'Mary', 'John' ] }
// After marriage: { firstName: 'Jessica', lastName: 'Davis', age: 27, family: [ 'Alice', 'Bob', 'Mary', 'John' ] }

//NOTE: This is because the family property of both jessica and marriedJessica objects is still referencing the same array in memory. Hence, when we push new elements to the family array in either object, it affects both objects. This is an example of a shallow copy, where the properties of the object are copied, but the nested objects are still references to the same objects in memory.
*/
