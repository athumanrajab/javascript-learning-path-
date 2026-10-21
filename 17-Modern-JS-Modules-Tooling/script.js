// NOTE: Exporting and importing in ES6 Modules

// Importing named module are wrapped around curly braces
import { addToCart, totalPrice, totalQuantity } from "./shoppingCart.js";
// Consuming imported value
addToCart("breads", 5);

console.log(`Price : ${totalPrice}`);
console.log(`Quantity : ${totalQuantity}`);

// We can also import everything from a module by using *
// import * as Shoppingcart from "./shoppingCart.js";

// Shoppingcart.addToCart("Candies", 10);

// When we import , exported default value , we can basically give it any name that we want.. we dont use curly braces {}
// import add from "./shoppingCart.js";

// add("Pizza", 2);

console.log("-----Importing module-----");

/*
// NOTE: Top-level await
// In modules we can use "await" keyword outside the async function
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);

// Although this block the code execution of the entire module, this can useful sometimes but also it can be harmful in some situation especially when the task is long running task

const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = await getLastPost();
console.log(lastPost);
 */
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 2 },
    { product: "candy", quantity: 10 },
  ],
  user: { loggedIn: true },
};

// copy an entire object and store it in a new variable
// const stateClone = Object.assign({}, state);
// state.user.loggedIn = false;
// console.log(stateClone);

// By using loadash
const stateClone = cloneDeep(state);
// state.user.loggedIn = false;
console.log(stateClone);

// NOTE: Bundling with parcel and npm script

// enables Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept();
}

// NOTE: Configuring babel and polyfilling
