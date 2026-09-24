"use strict";

// NOTE: Constructor function and the new operator
// A constructor function is actually a completely normal function, the only difference btn a regular function and the constructor function is that, we call a constructor function with the new operator
// The naming convention used in OOP is that the constructor function start with capital letter
// Also an arrow function does not work as the function constructor because it does not have it's own "this" keyword
// So you can only use either function declacration or function expression

const Person = function (firstName, birthYear) {
  // Instance properties, this is because the below properties will be available in all instance created from this constructor function
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this, because assume we will create thousands of instance , that means we gonna have thousads copies of this method for every created instance, this will lead to performance issues
  // this.calcAge = function () {
  //   console.log(2026 - this.birthYear);
  // };
  // To solve this, we gonna use prototype and prototypal inheritance
};

const danniel = new Person("Danniel", 2003);
console.log(danniel);

// The new operator is used to call the constructor function, but also it has some other functions

// What happen exactly when we call a function with a "new" operator?
// Behind the scenes they actually happen the four  steps
// 1. The new empty {} object is created
// 2. The function is called, and in this function call the "this" keyword will be set to this newly created object (this = {})
// 3. The new created object is linked to a prototype through __proto__ property
// 4. The object that is created from the begining is actually returned from a constructor function

// By using the created constructor we can further create as many object as we can
const purcell = new Person("Purcell", 2000);
const john = new Person("John", 2020);
console.log(purcell, john);

// So what we did above , is to create objects(instances) from a constructor function... not objects from a class .. because js does not have classes in the sense of traditional OOP
// Constructor function have been using since the begining of js , so as to kind simulate classes

// There is even an operator which is called "instanceof" which is used to check if the object is an instance of a certain constructor function.. it's the boolean
console.log(purcell instanceof Person);

// Also constructor function is not really a feature in js language, they are just pattern that have been developed by other dvelopers
