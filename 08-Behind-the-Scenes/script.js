// "use strict";

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
    console.log(add(2, 4)); // While the 'strict mode' is enabled, this will throw reference error, becaue the add() function has a block-scope , hence can be accessed with that if-block. But when the 'strict mode' is disabled , this code will be executed because it is no longer a block-scoped , it's a function-scoped hence it's available within the printAge() and not otherwise
    // console.log(str); This will throw reference error
  }
  printAge();
  // console.log(millenial); NOTE: This will also throw reference error since the millenial is only accessed within the if-block and printAge which is function scope
  return age;
}

const firstName = "Purcell";
calcAge(1991);
