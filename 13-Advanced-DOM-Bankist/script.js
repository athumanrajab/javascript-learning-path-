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

// TODO: Implementing smooth scrolling
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function () {
  //Scroll the page until section1 becomes visible, using a smooth scrolling animation.
  section1.scrollIntoView({ behavior: "smooth" });
  // section1.scrollIntoView(); //Without the behavior: "smooth" , the browser jumps directly to the section
});

//NOTE: Event propagation in practice
const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomColor = function () {
  return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
};

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Link: ", e.target); //remain original element that was clicked:(Where did the event start)
  console.log(e.currentTarget); //Whose listener is running RIGHT NOW?
  console.log(this === e.currentTarget);

  // Stop event propagation
  // e.stopPropagation();
});
document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Container: ", e.target); //remain original element that was clicked:
  console.log(e.currentTarget); //Whose listener is running RIGHT NOW?
});
document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Nav: ", e.target); //remain original element that was clicked:
  console.log(e.currentTarget); //Whose listener is running RIGHT NOW?
});
