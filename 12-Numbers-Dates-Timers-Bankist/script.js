/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// NOTE: Numbers- all numbers is javascript are presented as floating point number
// All numbers in javascript are stored as 64 base 2, hence sometimes is quite hard to represent some simple fractions which are easy to to be represented in base 10 (0-9).. to represent them in binary
// Example see the result below
console.log(0.1 + 0.2);
console.log(10 / 3);
// So we can not do some precise calculation in js and that is kind of error that we have to accept in js
console.log(0.1 + 0.2 === 0.3); //Here the result is false, in which we expect it to be true

// Conversion
// There is one trick of converting string into a number in js
console.log(Number("23"));
// TRICK: the simple trick is to use + operator before that string so as the js engine will perform type coercion
console.log(+"23");

// Parsing - We can parse a number from a string by using Number(), but since even function is an object it can also have some method example parseInt()
console.log(Number.parseInt("30px")); //Here the strind can contain a number and some other words but the parseInt() method will eventually try to extract only the number part and the result of extraction will be a number not a string

// But inorder to make the parseInt work.. the string has to start with a number
console.log(Number.parseInt("e45")); //Here it wont work coz the string doesn't start with a number

// The parseInt method accept two arguments which are string and radix, we always use 10 for radix which mean base 10 number (0-9)

console.log(Number.parseInt("40em", 10));

// parseInt also only work for integer only
console.log(Number.parseInt("4.5em", 10)); //Here the result will be 4

// parseFloat() - this work the same as parseInt but here we are parsing float number, it useful when you want to read values from a string example css properties
console.log(Number.parseFloat("4.5em", 10));

// So these two methods parseInt() and parseFloat(), are also called global functions such that we don't have to necessary call them inside Number objects
console.log(parseFloat("54.44rem"));
console.log(parseInt("88em"));
// But doing so is kind traditional way, so we are reccommended to use them inside the Number object

// Sometimes these methods are referred to as namespaces, so the Number provide the namespace for all different functions such as parseInt , parseFloat

// isNaN() - This is another Number namespace which can be used to check if any value is a not a number
console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN("a"));
console.log(Number.isNaN(+"a23"));
console.log(Number.isNaN(+"23x"));
console.log(Number.isNaN(23 / 0));

// isFinite() - This is the best way of checking if the value if the number
console.log(Number.isFinite(20));
console.log(Number.isFinite("20"));
console.log(Number.isFinite(+"20px"));
console.log(Number.isFinite(23 / 0));

// isInteger() - This is used to check if the number is an integer
console.log(Number.isInteger(23));
console.log(Number.isInteger("23"));
console.log(Number.isInteger(23.4444444444444));
console.log(Number.isInteger(23.1));
*/

/*
// NOTE: math and rounding
// Square root
console.log(Math.sqrt(25));

// an alternative way to get square root, cuberoot, fourth root etc is by using an exponention
console.log(25 ** (1 / 2));

console.log(8 ** (1 / 3));

console.log(16 ** (1 / 4));

// maximum number
console.log(Math.max(5, 23, 46, 3, 28, 4, 12));

// Math.max(), also  does the type coercion
console.log(Math.max(5, 23, "46", 3, 28, 4, 12));

// Math.max(), does not do parsing
console.log(Math.max(5, 23, "46ps", 3, 28, 4, 12));

// minimum value
console.log(Math.min(5, 23, 46, 3, 28, 4, 12));

// Math.min(), also does the type coercion
console.log(Math.min(5, 23, "46", "3", 28, 4, 12));

// There are also constant values in Math namespace such PI
// Suppose we want to calculate the area of a cycle, given the radius of 10 px from a user interface

console.log(Math.PI * Number.parseFloat("10px") ** 2);

// Math.random() - used to generate random number btn 0 and 1

console.log(Math.random());

// We can cut off the decimal part by using the Math.trunc()
// Suppose we want to generate a random number between 1 and 6
console.log(Math.trunc(Math.random() * 6) + 1);

// Consider the following function which can be used to generate random number
const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + 1;
};

console.log(randomInt(1, 6));

// Rounding integer- this can be done by using different ways
// 1. Math.trunc() - is used to remove the decimal part from a number
console.log(Math.trunc(34.222));

// Math.round() - round a number to a nearest integer
console.log(Math.round(23.4));
console.log(Math.round(23.5));

// Math.ceil() - it is used to round up a number
console.log(Math.ceil(11));
console.log(Math.ceil(11.4));
console.log(Math.ceil(11.5));
console.log(Math.ceil(11.8));

// Math.floor() - it is used to round down a number
console.log(Math.floor(50));
console.log(Math.floor(50.4));
console.log(Math.floor(50.5));
console.log(Math.floor(50.8));

console.log("------Type Coercion-----");
// TRICK: both of these methods perform type coercion
console.log(Math.trunc("34.222"));

console.log(Math.round("23.4"));
console.log(Math.round("23.5"));

console.log(Math.ceil("11"));
console.log(Math.ceil("11.4"));
console.log(Math.ceil("11.5"));
console.log(Math.ceil("11.8"));

console.log(Math.floor("50"));
console.log(Math.floor("50.4"));
console.log(Math.floor("50.5"));
console.log(Math.floor("50.8"));

// Someone might think that Math.trunc() and Math.floor() are the same, but they only work the same when they both dealing only with positive numbers.. when it comes to negative numbers they work different
console.log(Math.trunc(-23.4));
console.log(Math.floor(-23.4));
// It is advised to use floor instead of trunc because it work for both positive and negative number

// Rounding decimal places
console.log((2.7).toFixed(0)); //Here the result after applying the toFixed() method is the string and not a number
console.log((2.7).toFixed(1));
console.log((2.7).toFixed(2));
console.log((2.7).toFixed(3));
console.log(+(2.345).toFixed(2));

// The operation above is possible despite that we are callinh toFixed() from primitive values which already know that primitive values have no built in methods.. this is because javascript behind the scenes will do boxing
// Boxing involve transform those primitive values to a number obeject then call a method on that object and once the process is finished it will convert them back to a primitive values
 */

/*
// NOTE: numeric separator
// starting from year 2021 , we can use a feature called numeric separators to format a number in a way that it's easier for us or for other developer to read and understand
// Hence we can use underscore to give meaning to our number
// Suppose we want to write a very large number such as diameter of a sun
const diameter = 287_460_000_000;
console.log(diameter);

// It's not allowed to place the underscore at the following position _3.1415 , 3._1415, 3_.1415 , 3.1415_, 3.14__15
// Also when we try to convert a string contain _ to a number will not work
console.log(Number("3000_3044"));
*/

/*
// NOTE: Working with BigInt
// This is the special type of integer which was introduced in ES2020
// Since javaScript store number value in 64 bit base 2.. then only 53 bits are used to store a number while.. the remaininf bits are used for storing decimal place
// Since only 53 bits are used to store number this means we have limit of number that can be processed by javaScript
console.log(2 ** 53 - 1); //we minus 1 because the number in js start from zero

const maxSafeNumber = 9_007_199_254_740_991;

console.log(2 ** 53 + 3); //This will give the wrong answer

// So the Number object has the namespace for the largest value that can be processed by js which is know as MAX_SAFE_INTEGER
console.log(Number.MAX_SAFE_INTEGER);

console.log(4937480982389409823490290342934924902348);

// We can use the BigInt or put n at the of the number
console.log(4937480982389409823490290342934924902348n); //4937480982389409823490290342934924902348n
console.log(BigInt(4937480982389409823490290342934924902348)); //4937480982389409983641378903027479478272n
// Although the results above seems to be different so it's highly recommended to use BigInt() when working large number that fall on MAX_SAFE_INTEGER
// BigInt() this is referred to as constructor function

// Operations
console.log(100000n + 100000n);
console.log(1238383421212233n * 23289348948240281n);

// But we can not mix bigint with other regular integer
const hugeNum = 34892839490198102912n;
const regularNum = 23;
// console.log(regularNum * hugeNum); //we'll get TypeError

// This can be solved by using the BigInt() constructor function to convert the regular number into int bigint
console.log(BigInt(regularNum) * hugeNum);

// But this can still work
console.log(20n > 15);

// This cannot work
console.log(20n === 20); //the result is false because the strictly equality operator does not perform type coersion so those two number belong to the two different data types
console.log(typeof 20n);
console.log(typeof 20);

console.log(20n == 20); //here's the result will be true because javaScript will automatically do type coercision
console.log(20n == "20");

// Also the square root does not work
// console.log(Math.sqrt(16n));
// console.log(16n ** (1 / 2));

// Division
console.log(10n / 3n); //here the result will not be as expected , it will return 3n since it's the closest value and cutoff the decimal part
console.log(12n / 3n); //here the result will not be as expected , it will return 3n since it's the closest value
*/

/*
// NOTE: Creating dates
// There are four different ways of creating dates in javaScript , they all use the new date constructor function but they can accept different parameters
const now = new Date();
console.log(now);

// We can pass in string in new Date() constructor function
console.log(new Date("Wed Sep 09 2026 23:10:06"));
console.log(new Date("December 24, 2025"));

console.log(new Date(account1.movementsDates[0]));

// We can also pass something like this .. (Year, month, day, hours, min, sec)
console.log(new Date(2026, 7, 31, 10, 30, 23)); //Here the month specified here is july but since the month in js is zero-based hence it will print Aug on the console

// Also Date(), auto correct the day
console.log(new Date(2026, 1, 31, 10, 30, 23)); //Here on the console March 03 will be printed

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// 3 * 24 * 60 * 60 * 1000 the result of this is called timestamp which is the millisecond passed since 1970

// Dates are also special types of object hence they have their own methods and properties
// Working with dates
const future = new Date(2030, 6, 15, 16, 30);
console.log(future);

// getFullYear() - this is used to get the full year
console.log(future.getFullYear());

// getMonth() - this is used to get the month
console.log(future.getMonth()); //on the console it will display 6, since it's 0-based that 6 will literally represent July

// getDate() - this is used to get the exactly day of the month
console.log(future.getDate());

//getDay() -  this is used to get the day of the week .. it is 0-based
console.log(future.getDay());

console.log(future.getHours());

console.log(future.getMinutes());

console.log(future.getSeconds());

// toISOString() - convert the date object into a string
console.log(future.toISOString());

// getTime() - it return the timestamp since january 1 , 1970
console.log(future.getTime()); //1910352600000

// We can also reverse the value 1910352600000
console.log(new Date(1910352600000));

// We can also get the current time stamp by using Date.now()
console.log(Date.now());

// There are also set methods like setFullYear(), setMonth(), setDate() etc
*/

/*
// NOTE: Operations with dates
const future = new Date(2030, 7, 31, 10, 30, 23);
// Operation with dates are possible because when we convert the date to number the result is going to be the timestamp which is in millisecond then by using that timestamp we can perform different calculation

console.log(Number(future));
console.log(+future);

// Further more we can take the millisecond and convert them back to days, hours, years etc

// Lets create a function that accepts two different dates and return the number of days that has passed

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const date1 = new Date(2027, 3, 23);
const date2 = new Date(2027, 5, 16);

const daysPassed = calcDaysPassed(date1, date2);
console.log(daysPassed);
*/

// NOTE: Internationalizing dates (Intl)
/*
// javaScript has a new internationalization API, which allow us to easily format number and strings according to different languages
// Example currencies and dates are respresented completely differet in tanzania
// Experimenting int API
// const now = new Date();

// // We can also pass some options in DateTimeFormat()
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long", //it also has some few values like long,, numeric, 2-digit
  year: "numeric",
  weekday: "short", //It has also some few alternative like long, short and narrow
};

// // Refers to this website to get ISO Language Code Table http://www.lingoes.net/en/translator/langcode.html
// // It's also not advisable to define the locale manually (the locale are en-US, sw pt-PT), instead we have to get it from user browser

const locale = navigator.language;
console.log(locale);

labelDate.textContent = Intl.DateTimeFormat(locale, options).format(now);
 */

/*
// NOTE: Internationalizing Number (Intl)
const num = 388376463.34;

// We can also specify some options in number
const options = {
  style: "currency", //here there are percent , currency, unit etc
  unit: "mile-per-hour", //here there are celcius etc
  currency: "EUR", //you have to manually specify the currency because it's not determined by locale
  // useGrouping: false, //Turn off grouping by a separator
};

const us = Intl.NumberFormat("en-US", options).format(num);
const swahili = Intl.NumberFormat("sw", options).format(num);
const tz = Intl.NumberFormat("en-Tz", options).format(num);
const german = Intl.NumberFormat("de-DE", options).format(num);

// We can also get the locale from the use browser
const locale = navigator.language;
const userBrowser = Intl.NumberFormat(locale, options).format(num);
console.log("User Browser: ", userBrowser);

console.log("US : ", us);
console.log("Swahili : ", swahili);
console.log("Tanzania : ", tz);
console.log("German : ", german);
 */

/*
// NOTE: Timers: setTimeout and setInterval
// setTimeout runs just once after a defined time
// setInterval runs forever untill we stop it

// setTimeout() - it accept 2 arguments in which the first one is the callback function and the second one is time in which the callback function will wait to be executed
// setTimeout() - it simply reschedule the callback function to run after a certain amount of time, and the callback function is executed once
// setTimeout(
//   () => console.log("The function will be executed after several seconds"),
//   3000,
// );

// console.log("Waiting....");
// As soon as the js reach the setTimeout() , it will not stop , instead it will register the callback function and proceed with execution of other codes.. such that the time will be counted in the background so as the callback function will be called after that time elapsed
// And that mechanism is known as asynchronous javaScript

// We can also pass the arguments to the callback function... all arguments can be specified after setting out the timer in millisec

// setTimeout(
//   (ing1, ing2) => {
//     console.log(`Here's your pizza with ${ing1} and ${ing2}.`);
//   },
//   3000,
//   "Olive",
//   "Spinach",
// );

// console.log("Waiting.....");

// We can also clear the timeout as follow
const ingridients = ["olive", "spinach"];
const pizzaTimer = setTimeout(
  (ing1, ing2) => {
    console.log(`Here's your pizza with ${ing1} and ${ing2}.`);
  },
  3000,
  ...ingridients,
);

console.log("Waiting.....");

if (ingridients.includes("spinach")) {
  clearTimeout(pizzaTimer);
}
// Since the array include the spinach then setTimeout will not be executed

// setInterval() - here the callback function is executed after every amount of time specified
// setInterval(() => {
//   const now = new Date();
//   console.log(now);
// }, 1000);
*/
