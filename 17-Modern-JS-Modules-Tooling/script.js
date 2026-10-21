// NOTE: Exporting and importing in ES6 Modules

// Importing named module are wrapped around curly braces
// import { addToCart, totalPrice, totalQuantity } from "./shoppingCart.js";
// Consuming imported value
// addToCart("breads", 5);

// console.log(`Price : ${totalPrice}`);
// console.log(`Quantity : ${totalQuantity}`);

// We can also import everything from a module by using *
// import * as Shoppingcart from "./shoppingCart.js";

console.log("-----Importing module-----");

// Shoppingcart.addToCart("Candies", 10);

// When we import , exported default value , we can basically give it any name that we want.. we dont use curly braces {}
import add from "./shoppingCart.js";

add("Pizza", 2);
