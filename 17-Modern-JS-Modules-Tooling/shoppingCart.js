// Exporting module
console.log("-----Exporting Module-----");

// // Variables declared inside the module, are actually scoped inside the module
const shippingCost = 10;
const cart = [];

// // Inorder to use these variables inside the script.js, we have to export the variables
// // In ES modules there are two types of exports which are named exports and default exports
// // The named export is to write the "export" keyword before the name of the variable

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart.`);
};

// // But also we can use named export to export multiple varibles from a module
const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity };

// We use default export when we usually want to export only one thing per module
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart.`);
}
