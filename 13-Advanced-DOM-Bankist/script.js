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

// TODO: 4.Menu fade animation
const nav = document.querySelector("nav");

const handleHoverEffect = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;

    // Selecting all siblings
    const siblings = link.closest("nav").querySelectorAll(".nav__link");

    // Selecting logo
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((sibling) => {
      if (sibling !== link) {
        sibling.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener("mouseover", function (e) {
  handleHoverEffect(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
  handleHoverEffect(e, 1);
});

// TODO: 5.Implementing a sticky navigation

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// TODO: 6.Revealing elements on scroll(Reveal sections)
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
  } else {
    return;
  }
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// TODO: 7.Lazy loading images
// Images have biggest impacts on page loading, so it's very important to optimize image on any page
const imgTarget = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function (e) {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px", //load the image 200px before we reach them
});

imgTarget.forEach((img) => imgObserver.observe(img));

// TODO: 8.Building a slider component
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const maxSlide = slides.length;
const dotContainer = document.querySelector(".dots");
let currentSlide = 0;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `
      <button class="dots__dot" data-slide="${i}"></button>
      `,
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const init = function () {
  createDots();
  activateDot(0);
  goToSlide(0);
};
init();

// Next slide button
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// Handle keyboard event when clicked right arrow key or left arrow key
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  }
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});
