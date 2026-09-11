"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  // Prevent the default behaviour of the page to be automatic scrolled up whenever the open account button is clicked
  e.preventDefault();

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Using forEach() to loop over the nodeList returned after the querySelectorAll so as to add an event listener to both "open account button" and "open your free account today!" button
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/*
// NOTE: Selecting, Creating, Inserting and Delete DOM elements
// Selecting the whole HMTL document

console.log(document.documentElement);

// Selecting the head

console.log(document.head);

// Selecting the body

console.log(document.body);

// This will return the first element with class header

// document.querySelector(".header");

// This will return a nodeList of elements with the class section

const allSection = document.querySelectorAll(".section"); //This return the nodeList all element with class "section"

console.log(allSection);

// This will return the element with the section--2 ID

console.log(document.getElementById("section--2"));

// This will retun an HTMLCollection of all buttons that are in our page

// HTMLCollection is different from a nodeList because , HTMLCollection is so called a live collection such that if the DOM changes then this collection changes as well ie it will immediately updated as well

// But if you delete a DOM the nodeList remain the same

const allButtons = document.getElementsByTagName("button");

console.log(allButtons);

// This will return an HTMLCollection of elements with that class

console.log(document.getElementsByClassName("btn"));

// NOTE: Creating and inserting elements

//insertAdjacentHTML() - is the DOM method used to insert an HTML element without replacing the existing content

// This methods takes two arguments which are position and HTML string

// the position argument - where to insert the HTML ,it has the below values


// suppose the HTML element is like this

// <div>

// Existing content

// </div>


// "beforebegin" → before the <div>

// "afterbegin" → immediately inside, before existing content

// "beforeend" → immediately inside, after existing content

// "afterend" → after the </div>

const headerTitle = document.querySelector(".header__title");

console.log(headerTitle);

headerTitle.insertAdjacentHTML(
  "afterbegin",

  "<p>This is the new inserted paragraph</p>",
);

// createElement()-This is the DOM method used to create an element from scratch , it return an element object in which we can add some class and some other stuffs in it

// It accept the string of tag name of the element which you want to create

const message = document.createElement("div");

console.log(message);

// We can then add some and other attribute in it

message.classList.add("cookie-message");

// We can also add message(text content) in it

// message.textContent =

// "We use cookies for improved functionalities and analytics";

// We can also use innerHTML insteat of textContent to add different things

message.innerHTML = `We use cookies for improved functionalities and analytics <button class = "btn btn--close-cookie">Got it!</button>`;

// Finally we can insert the element message into our DOM, foristance we can insert it on header

const header = document.querySelector(".header");

// prepend() - this method add the given element as the first child of the parent element

// header.prepend(message);

// append() - this method ass the given element as the last child of the parent element

header.append(message); //Here the append method move the element from being the first child to the last child, it didnt real inserted because the element was already inserted by the prepend method

// Since the DOM element is unique it can always exist at one place at a time

// So we can basically use append or prepend methods not only to insert an elements but also to them such as from being the first child element to the last one and vice-versa

// But what if we actually we want to insert multiple copies of the same element?

// We would actually have to first copy the element by using cloneNode(true)

// header.append(message.cloneNode(true));

// before() and after()

// before() this method used to insert the HTML before the specified element as the sibling not chil

header.before(message);

// after() this method used to inset the HTML after the specified element as the sibling not child

header.after(message);

// Delete elements

// Suppose we want to delete the message element that we created after click the "Got it!" button

const btnCloseCookie = document.querySelector(".btn--close-cookie");

btnCloseCookie.addEventListener("click", function () {
  message.remove();
});
*/

// NOTE: Style, Attribute and Classes
// Create a message object which will display cookie message with it's close button and insert it after the header element
const header = document.querySelector("header");
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies for improved functionalities and analytics! <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);

// Implement the "Got it!" button on the cookie message so as when is clicked it , the cookie message should dissapear
const btnCloseCookie = document.querySelector(".btn--close-cookie");

btnCloseCookie.addEventListener("click", function () {
  message.remove();
});

// Lets now start to add some styles on the cookie message
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

//These properties/styles are applied as inline styles

// We can only use .style to get the all the inline style of the given element but not some other styles defined in CSS style sheet
console.log(message.style.backgroundColor);
console.log(message.style.color); //This does not work because the color properties was define in CSS style Sheet

// But we realy want to get the whole styles defined in our element no matter it's inline or define in CSS style sheet we can use getComputedStyle() which accept the element as the argument , and then it will return the object with tons of properties and their respective value and hence we can be able to get the value of any property
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// Suppose we after get the height of message element we want to add it by 40px..
// let originalMessageHeight = message.style.height;
// const newMessageHeight = getComputedStyle(message).height + 40 + "px";
// console.log(newMessageHeight); //This will return a weird result like this 49.5333px40px, this is because getComputedStyle(message).height return a string of 49.5333px , hence when we try to add it 40 which is integer, the JS will perform type coercion such that it will treat 40 as a string and then concatinate those strings
// So the solution to that is to use Number.parseFloat() so as we can parse/extract only the number part return by getComputedStyle(message).height and then add it 40 and then the result will converted back to string since we add "px"

// const newMessageHeight =
//   Number.parseFloat(getComputedStyle(message).height) + 40 + "px";
// console.log(newMessageHeight);

// originalMessageHeight = newMessageHeight;

// The above steps can be summarize in one step as follow
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

// We can also set the custom CSS properties defined in the root element of the document, for HTML document the root element is the <html></html>
// So the :root is a CSS pseudo-class selector that targets the root element of the document.
//  check the example below. which define CSS custom properties(CSS variable) , which can later be used like this background-color: var(--color-primary);
// :root {
//   --color-primary: #5ec576;
//   --color-secondary: #ffcb03;
//   --color-tertiary: #ff585f;
//   --color-primary-darker: #4bbb7d;
//   --color-secondary-darker: #ffbb00;
//   --color-tertiary-darker: #fd424b;
//   --color-primary-opacity: #5ec5763a;
//   --color-secondary-opacity: #ffcd0331;
//   --color-tertiary-opacity: #ff58602d;
//   --gradient-primary: linear-gradient(to top left, #39b385, #9be15d);
//   --gradient-secondary: linear-gradient(to top left, #ffb003, #ffcb03);
// }

// So in DOM these properties are basically defined in document.documentElement since documentElement is always mean <html></html> which is the root element
// So we can then set the custom css properties by using the setProperty(), the first argument it accept is the name of the our custom properties such as --color-primary, the second argument is the value that we want to change to

document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes - in js we can access and change different attributes of elements in an html file
const logo = document.querySelector(".nav__logo");
console.log(logo);
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className); //we use className not class
// The above methods are only used when we want to get the standard attributes that are built in a specific element attribute

// Suppose we want to get the custom attribute that we defined in an html element like "designer" attribute that we defined in <img src="img/logo.png" alt="Bankist logo" class="nav__logo" id="logo" designer="Purcell"/>
// We can use getAttribute() method and pass in the string name of the custom attribute so as to get it's value
console.log(logo.getAttribute("designer"));

// We can also set the attributes value , only for those built in attributes(standard attributes)
logo.alt = "Beautiful minimalist logo";

// For non standard attribute we can set the value by using setAttribute() method, which accept the name of the propery and it's value

logo.setAttribute("company", "Bankist");
logo.setAttribute("designer", "Danniel Purcell");

console.log(logo.src); //This gives the absolute url
console.log(logo.getAttribute("src")); //This gives the  relative url

// Data attribute -  This is the special type of attribute which is founc/can be added inside an html element
// On the html file it must be written as data-name-of-the-attribute example (data-version-number), such that the attribute should start with "data-" and then you can proceed with the name, but the name should be connected with hyphen as the naming convetion used in HMTL, as we use camelCase as naming convention in js
// Inorder to access these kind of attribute we use the dataset property and the name of the attribute in camelCase
console.log(logo.dataset.versionNumber);

// Classes
// logo.classList.add()
// logo.classList.remove()
// logo.classList.toggle()
// logo.classList.contains()

// Don't use this, because it will overide all the existing classe
// logo.className = "danniel"
