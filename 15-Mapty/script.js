"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

// NOTE: Using Geolocation API
// The Geolocation API, is just like other API like timers, Internationalization API, that the browser gives us

// navigator.geolocation.getCurrentPosition()
// This getCurrentPosition() functions takes two callback function , the first one is success callback function,  this callback function that will be called on success such that whenever the browser successfully got the coordinates of the current position of the user, and the second callback is the error callback which is the one that is gonna be called when getting error while getting the coordinates
// The first callback function accept one parameter (position parameter)
navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);

    // Creating google map URL template https://www.google.com/maps/@{latitude},{longitude}
    // console.log(` https://www.google.com/maps/@${latitude},${longitude}`);

    // TODO: 1.Using leaflet to display a map on our webpage
    // The setView() , accept an array of coordinates as the first parameter, and another parameter for the zoom level of our map such that the larger the number the more the map is zoomed in and vice-versa

    const coords = [latitude, longitude];

    // TODO: 1(a). Initialize your map with a default view
    const map = L.map("map").setView(coords, 13); // Centered on Dar es Salaam

    // TODO: 1(b). Define your individual theme layers
    const standard = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        // Added missing {s}.
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    );

    const humanitarian = L.tileLayer(
      "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      {
        // Added missing {s}.
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://hotosm.org" target="_blank">HOT</a>',
      },
    );

    const openTopo = L.tileLayer(
      "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org">CC-BY-SA</a>)',
      },
    );

    // TODO: 1(c). Add your preferred default theme to the map immediately
    humanitarian.addTo(map);

    // TODO: 1(d). Create an object containing all your base layers/theme layers
    const baseMaps = {
      Humanitarian: humanitarian,
      "Standard OSM": standard,
      Topographic: openTopo,
    };

    // TODO: 1(e). Add the interactive layer control to the top-right corner of the map
    L.control.layers(baseMaps).addTo(map);

    // TODO: 2. Add an event listener by using the on() which is an event listener function provided by leaflet
    //Such that when a user click on a map...
    map.on("click", function (mapEvent) {
      console.log(mapEvent);
      const { lat, lang } = mapEvent.latlng;
      // Also the marker(location pin) accept the array of coordinates
      L.marker([lat, lang]).addTo(map).bindPopup("Workout").openPopup();
    });
  },
  function () {
    alert("Could note get your position");
  },
);

// NOTE: Display a map using leaflet library
