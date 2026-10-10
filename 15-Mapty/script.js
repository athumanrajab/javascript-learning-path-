"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
let inputDistance = document.querySelector(".form__input--distance");
let inputDuration = document.querySelector(".form__input--duration");
let inputCadence = document.querySelector(".form__input--cadence");
let inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

// TODO: 3 Refactoting code by using classes
class App {
  constructor() {}

  #getPosition() {}
  #loadMap() {}
  #showForm() {}
  #toggleElevationField() {}
  #newWorkout() {}
}
// NOTE: Using Geolocation API
// The Geolocation API, is just like other API like timers, Internationalization API, that the browser gives us

// navigator.geolocation.getCurrentPosition()
// This getCurrentPosition() functions takes two callback function , the first one is success callback function,  this callback function that will be called on success such that whenever the browser successfully got the coordinates of the current position of the user, and the second callback is the error callback which is the one that is gonna be called when getting error while getting the coordinates
// The first callback function accept one parameter (position parameter)
navigator.geolocation.getCurrentPosition(
  function (position) {
    // console.log(position);
    const { latitude, longitude } = position.coords;
    // console.log(latitude, longitude);

    // Creating google map URL template https://www.google.com/maps/@{latitude},{longitude}
    // console.log(` https://www.google.com/maps/@${latitude},${longitude}`);

    // TODO: 1.Using leaflet to display a map on our webpage
    // The setView() , accept an array of coordinates as the first parameter, and another parameter for the zoom level of our map such that the larger the number the more the map is zoomed in and vice-versa

    const coords = [latitude, longitude];

    // TODO: 1(a). Initialize your map with a default view
    map = L.map("map").setView(coords, 13); // Centered on Dar es Salaam
    // Whatever string we pass in our map() method must be the id name of element in our html and it's in that element where the map will be displayed

    // TODO: 1(b). Define your individual theme layers
    // 1. Standard OpenStreetMap
    // Useful for everyday navigation, finding roads, streets, towns, and general places.
    // Best choice for a clean, general-purpose map.
    const standard = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    );

    // 2. Humanitarian
    // Useful for humanitarian work, disaster response, and community mapping.
    // Often highlights local roads, settlements, and important community facilities.
    // Particularly useful where detailed local mapping is important.
    const humanitarian = L.tileLayer(
      "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; OpenStreetMap contributors, Tiles style by <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>',
      },
    );

    // 3. Topographic
    // Useful for hiking, outdoor activities, and understanding the physical landscape.
    // Shows terrain features such as elevation contours, hills, and natural landforms.
    // Best choice when the shape and elevation of the land matter.
    const openTopo = L.tileLayer(
      "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://opentopomap.org">OpenTopoMap</a>',
      },
    );

    // TODO: 1(c). Add your preferred default theme to the map immediately
    standard.addTo(map);

    // TODO: 1(d). Create an object containing all your base layers/theme layers
    const baseMaps = {
      "Standard OSM": standard,
      Humanitarian: humanitarian,
      Topographic: openTopo,
    };

    // TODO: 1(e). Add the interactive layer control to the top-right corner of the map
    L.control.layers(baseMaps).addTo(map);

    // TODO: 2. Add an event listener by using the on() which is an event listener function provided by leaflet
    //Such that when a user click on a map, the marker(location pin) appear on the given position in which a user click with the popup message(banner)
    map.on("click", function (mapE) {
      mapEvent = mapE;
      // TODO: 2(a) Render the workout form when a user click on a map
      form.classList.remove("hidden");

      // Automatically focus on the distance field so as user can enter data , this improve user experience
      inputDistance.focus();
    });
  },
  function () {
    alert("Could not get your position!");
  },
);

// TODO: 2(b) Handle the rendered form in such a way that when a user submit a form the marker will be displayed on the map
form.addEventListener("submit", function (e) {
  // Prevent page reload when we submit the form
  e.preventDefault();

  // Clear the input field after submitting the form
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";

  // Display the marker
  // mapEvent is created by leaflet
  // console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;

  // Add the marker to the map, such that the marker() method create the marker and addTo() add the marker to the map
  // Also the marker(location pin) accept the array of coordinates
  // The bindPopup can accept the string message like this bindPopup("Workout"), but also can accept an object through L.popup
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false, //override the default behavior of the popup closing when another popup is opened.
        closeOnClick: false, // override the default behavior of the popup closing when user clicks on the map.
        className: "running-popup",
      }),
    )
    .setPopupContent("Workout")
    .openPopup();
});

// TODO: 2(c) Listening for the event in which when we click on the type button on the rendered form and select either running or cycling , either the cadence or elevation gain should appear
inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
