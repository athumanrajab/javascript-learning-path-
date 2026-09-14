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

// NOTE: DOM traversing - Means walking through the DOM .. which means that we can select an element based on another element

const h1 = document.querySelector("h1");
console.log(h1);

// Going downwards: by selecting all elements of class "highlight" that are children of h1 element
// NOTE: 1. The first way is to use querySelector() or querySelectorAll() because it works not only the document object but also on the element
console.log(h1.querySelectorAll(".highlight")); //This will only select all elements that have class "highlight" and are children of h1 elements ,such that if there might be some other elements that are not the children of h1 element but they have class "highlight" they will not be selected. but also it will go as deep as possile to find all children with the given class
console.log(h1.childNodes); //Returns everything that are child nodes if h1 in the DOM tree

// This one work only for direct children
console.log(h1.children); //Returns the HTML collections of only the child elements of h1

// We can also get and set properties of first child and the last child of the given element by using firstElementChild  and lastElementChild properties
// first child
console.log(h1.firstElementChild.textContent);
h1.firstElementChild.style.color = "orangered";

// last child
console.log(h1.lastElementChild.textContent);
h1.lastElementChild.style.color = "powderblue";

// Going upwards: By basically selecting parents
console.log(h1.parentNode); //Returns the parent node of the specified element

console.log(h1.parentElement); //Return the direct parent element of h1

// In most of the time we need to find the parent element regardless of how far does the parent is, by using closest()
console.log(h1.closest(".header"));
h1.closest(".header").style.background = "var(--gradient-secondary)";
// NOTE: querySelector finds children no matter how deep they are nested while closest find parent no matter how far it's  in the DOM tree

// Going sideways: which means selecting siblings
// We can only access direct siblings which are previous and next siblings
// The below methods will return an element if such sibling exist or null if there is no sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// If we really want to get all other siblings of that element we can use the below trick
// TRICK: we can take the element that we can find it's parent element and then after get the parent element we can use the children properties which return an htmlCollection of all elements including that element
console.log(h1.parentElement.children);

// But also we can get previously and next sibling nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);
