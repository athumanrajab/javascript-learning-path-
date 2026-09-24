"use strict";

/*
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

// NOTE: Prototypes
// Each and every function in js automatically has a property called prototype, and that include the constructor function
// Now, every object that will be created using constructor function will get access to all methods and properties that we define on constructor prototype properties
console.log(Person.prototype);

// Here's there is only one copy of this methods.. and all other object created from this constructor function can access and use this calcAge() method through prototypa inheritance
Person.prototype.calcAge = function () {
  console.log(2026 - this.birthYear);
};

// We can use the calcAge method to calculate the age of purcell even though the calcAge method is not present on the purcell object itself
console.log(danniel); //The log does not show if the calcAge() is present

// This is possible through prototypal inheritance, such that the prototype of danniel, purcell and john are Person.prototype
danniel.calcAge();
purcell.calcAge();
john.calcAge();

// __proto__, this property is used to confirm that danniel, purcell and john are the prototype of Person.prototype
console.log(danniel.__proto__);
console.log(purcell.__proto__);
console.log(john.__proto__);

console.log(danniel.__proto__ === Person.prototype); //This is true because the prototype of  danniel  object is essentially the property of the constructor function
console.log(purcell.__proto__ === Person.prototype); //This is true because the prototype of  purcell object is essentially the property of the constructor function
console.log(john.__proto__ === Person.prototype); //This is true because the  prototype of john object is essentially the property of the constructor function

// Person.prototype is not actually not the prototye of a person, but instead it's what that is gonna be used for objects that are created with the person constructor function..
// This can be confrimed through this console.log(danniel.__proto__ === Person.prototype); ... here is show that
// There are also some built in method which can be used to prove this which is isPrototypeOf()

console.log(Person.prototype.isPrototypeOf(danniel));
console.log(Person.prototype.isPrototypeOf(purcell));
console.log(Person.prototype.isPrototypeOf(john));
console.log(Person.prototype.isPrototypeOf(Person)); //Here the result is false because the prototype property is not the prototype of a person, instead the is the property of all objects that are created from the Person constructor function

// This confusion is come from the bad naming practice of the "prototype" property... which kind implies that is the prototype of a person which is actually not... probably it should be called as "prototypeOfLinkedObjects"

// Not only we can create methods on the prototype, but also we can set properties
Person.prototype.species = "Home Sapiens";
console.log(danniel);
console.log(purcell);
console.log(danniel.species);
console.log(purcell.species);

// Although these properties and methods created using Person.prototype... they are only inherited and not original properties ... the original properties are declared from the constructor function

// There is a method to check if the certain object really own a certain property which is called
console.log(danniel.hasOwnProperty("firstName")); //This will be true because the firstName property is inside the danniel's object
console.log(danniel.hasOwnProperty("species")); //This will be false because this property is not really inside the danniel's object, it simply has access to it because of it's prototype

// The prototype itself is also an object because it can have methods and some other properties inside it

// NOTE: Prototypal inheritance and prototype chain
console.log(danniel.__proto__); //Here the __proto__ will link danniel to Person.prototype

console.log(danniel.__proto__.__proto__); //Here it will point to object.prototype

console.log(danniel.__proto__.__proto__.__proto__); // here the result will be null

// That is to say every object has automatically __proto__ property in which that __proto__ will point back to the Person.prototype.. and that Person.prototype also has __proto__ which point back to Object.protototype... the Object.prototype contain some other built in properties and methods like hasOwnProperty()  and it's __proto__ point to null

// NOTE: Prototypal inheritance on built-in objects
// Built-in objects inlude arrays, set, map etc

const arr = [3, 6, 4, 3, 2, 2, 45, 6];
console.log(arr.__proto__); //Here you will find a bunch of methods in which the arr inherit from Array.prototype

// We can also check
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

// Since we already know that the array object inherit methods and properties from  the Array.prototype , then we can also add some new methods in Array.prototype
// Lets create a method that will accept an array and return only unique values
Array.prototype.unique = function () {
  return [...new Set(this)];
};
// This is just for fun experiment, but avoid manipulate the prototype of built-in constructor functions
console.log(arr.unique());

*/

/*
Object Oriented Programming (OOP)
Coding Challenge #1
Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them
Test data:
Data car 1: 'BMW' going at 120 km/h
Data car 2: 'Mercedes' going at 95 km/h
GOOD LUCK


// NOTE: Coding Challenge #1: Object Oriented Programming (OOP)

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`The new ${this.make}'s speed is: ${this.speed}km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The new ${this.make}'s speed is: ${this.speed}km/h`);
};

const car1 = new Car("BMW", 120);
const car2 = new Car("Mercedes", 95);

// For car1
car1.accelerate();
car1.brake();

// For car2
car2.accelerate();
car2.brake();
*/

/*
// NOTE: ES6 CLASSES
// class expression
// const Person = class {}

// class declaration
class Person {
  // The first this is to write the constructor method
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // We can also write the method which will be stored in object prototype
  calcAge() {
    console.log(2026 - this.birthYear);
  }
}

const jessica = new Person("Jessica", 1996);
console.log(jessica);
jessica.calcAge();
console.log(Object.getPrototypeOf(jessica));
console.log(jessica.__proto__ === Person.prototype);

// We can also use the prototype property to add method as we did earlier with constructor function
Person.prototype.greet = function () {
  console.log(`Hello ${this.firstName}`);
};

jessica.greet();

// Classes are not hoisted, hence we can not use them before they are declared on the code
// Classes are just special kind of function behind the scene
// Hence classes are first-class citizen
// Classes are executed in strict mode, even if we did not activate the strict mode in our code
 */

/* 
// NOTE: setter and getter
// Every object in javascript can have setter and getter properties
// and we call these special properties as assessor properties
// setter and getter basically are the functions that get and set values.. but on outside thwy look like regular properties

// getters and setters for regular object
const account = {
  owner: "Danniel",
  movements: [234, 342, -445, 3434, -232, 3435],

  // getter
  get latestMovement() {
    return this.movements[this.movements.length - 1];
  },

  // setter, the setter method accept only one parameter
  set latestMovement(mov) {
    this.movements.push(mov);
  },

  // It's not necessary to specify the setter when we have a getter for the same property... so either a getter or a setter would be enough
};

console.log(account.latestMovement);

account.latestMovement = 50;
console.log(account.movements);

// getters and setter work the same ways in class
// class Person {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }

//   get age() {
//     return 2026 - this.birthYear;
//   }
// }

// const jessica = new Person("Jessica", 2003);
// console.log(jessica.age);

// getters and setters are very useful when it comes to the data validation
class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  get age() {
    return 2026 - this.birthYear;
  }

  // We can create a set property that will check if the new created object has the full name
  // set a propert that already exist
  set fullName(name) {
    if (name.includes(" ")) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }
  get fullName() {
    return this._fullName;
  }
}

const jessica = new Person("Jessica Davis", 2003);
console.log(jessica);
const danniel = new Person("Danniel", 2004);
console.log(danniel);
*/

/*
// NOTE: Static Methods
// These are methods that can be called direct on constructor function.. example Number.parseInt() or Array.from().. such that they are not inherited
// consider our constructor function below
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// const danniel = new Person("Danniel", 2003);

// We can create static method as follow
// Person.greet = function () {
//   console.log("Hello World!");
//   console.log(this);
// };

// The function can directly called on a given constructor
// Person.greet();

// Since static method are not inherited hence they are not in the Person.prototype
// danniel.greet();  This will throw an error

// Creating static method in classes
class Person {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // instance method, it will be added to Person.prototype
  calcAge() {
    console.log(2026 - this.birthYear);
  }

  // Creating static method, it will not be added to Person.prototype
  static greet() {
    console.log("Hello World!");
  }
}

const jessica = new Person("Jessica", 1996);

Person.greet();
 */

// NOTE: Object.create()
// This is another way of implementing prototypal inheritance or deligation
// It work differently from constructor function and the ES6 classes
// Here no prototype properties involved , no constructor functions, and no new operator
// We can use Object.create() to essentially manually set the prototype of an object to any other object that we want

// Lets create an object that we want to be the prototype of all the Person objects
const PersonPrototype = {
  // We want the person object created to inherit the calcAge()
  calcAge() {
    console.log(2026 - this.birthYear);
  },

  //this function can be used to add properties to instance programmatically
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const danniel = Object.create(PersonPrototype); //Here we pass the object in which can be used as the prototype in all instances
console.log(danniel);

danniel.name = "Danniel";
danniel.birthYear = 2003;

danniel.calcAge();

console.log(danniel.__proto__);
console.log(danniel.__proto__ === PersonPrototype);

const sarah = Object.create(PersonPrototype);
console.log(sarah);
sarah.init("Sarah", 2006);
console.log(sarah);
sarah.calcAge();
