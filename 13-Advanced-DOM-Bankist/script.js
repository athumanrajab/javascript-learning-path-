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

// TODO: 1.Implementing smooth scrolling
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function () {
  //Scroll the page until section1 becomes visible, using a smooth scrolling animation.
  section1.scrollIntoView({ behavior: "smooth" });
  // section1.scrollIntoView(); //Without the behavior: "smooth" , the browser jumps directly to the section
});

// TODO: 2.Implementing page navigation

// NOTE: 1.By attaching an handler function(event listener) to each link ie features, operation, testimonials
// document.querySelectorAll(".nav__link").forEach(function (link) {
//   link.addEventListener("click", function (e) {
//     e.preventDefault(); //prevent default action such as page scrolling, link navigation etc... so as it can be explicitly handled

//     // Implementing smooth scrolling/navigation
//     const id = this.getAttribute("href");
//     const section = document.querySelector(id);
//     section.scrollIntoView({ behavior: "smooth" });

//     // We have attached the same handler function to each link.. this is not effiency way of doing it.. because suppose that we have attached the handler function to 1000 link.. actually it will cause performance problems
//   });
// });

// NOTE: 2. By using event delegation, where by we attach an event listener only to a common parent element instead of adding separate listener to each child element.. and it works because of the even bubbling
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Make sure only the scrolling happen when exactly clicks the links,not anywhere on the container(matching strategy)
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: "smooth" });
  }
});

// TODO: 3.Building a tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContents = document.querySelectorAll(".operations__content");

// Lets use event deligation to attach and event listener to the tabsContainer which is the common parent of the three tabs (Instant Transfers , Instant loans and instant closing)
tabsContainer.addEventListener("click", function (e) {
  // Matching Strategy : In such a way that when we clicked anywhere inside the tab we should really get that tab
  const clicked = e.target.closest(".operations__tab");
  // Trying to handle errors that will be caused when we try to click outside the tabsContainer because the result will be null
  if (clicked) {
    // Active tabs
    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");

    // Active Content area
    const currentArea = clicked.dataset.tab;

    tabsContents.forEach((content) =>
      content.classList.remove("operations__content--active"),
    );

    document
      .querySelector(`.operations__content--${currentArea}`)
      .classList.add("operations__content--active");
  }
});
