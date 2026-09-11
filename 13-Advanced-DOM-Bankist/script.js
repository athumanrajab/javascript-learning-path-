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

// NOTE: Selecting, Creating and Delete elements
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

/*

suppose the HTML element is like this

<div>

Existing content

</div>

*/

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
