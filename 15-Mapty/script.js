"use strict";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
let inputDistance = document.querySelector(".form__input--distance");
let inputDuration = document.querySelector(".form__input--duration");
let inputCadence = document.querySelector(".form__input--cadence");
let inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

// TODO: 4. Creating class Workout which will act as parent class for child class running and child class cycling
class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10); //Convert the data object to string and takeout the last 10 characters which will act as id
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; //in km
    this.duration = duration; //in min
  }

  setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }
}

// TODO: 5. Creating class Running which will inherit from class Workout
class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this.setDescription();
  }

  calcPace() {
    // pace is given in min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
// TODO: 5. Creating class Running which will inherit from class Workout
class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this.setDescription();
  }
  calcSpeed() {
    // speed is given in km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// TODO: 3 Refactoting code by using classes, by creating class App
class App {
  #map;
  #mapEvent;
  #workoutsArr = [];
  #mapZoomLevel = 13;

  // The constructor method is called and executed as soon as the new object from the App class is created
  // Such that as soon as this line is executed const app = new App()
  constructor() {
    this.#getPosition();
    // TODO: 2(b) Handle the rendered form in such a way that when a user submit a form the marker will be displayed on the map
    form.addEventListener("submit", this.#newWorkout.bind(this)); //We use bind because the this keyword in eventlistener always point to the given DOM element

    // TODO: 2(c) Listening for the event in which when we click on the type button on the rendered form and select either running or cycling , either the cadence or elevation gain should appear
    inputType.addEventListener("change", this.#toggleElevationField);

    // TODO: Add event listener in such a way that when a user click a workout on a list it will directly move to the popup on the map
    containerWorkouts.addEventListener("click", this.#moveToPopup.bind(this));
  }

  #getPosition() {
    // NOTE: Using Geolocation API
    // The Geolocation API, is just like other API like timers, Internationalization API, that the browser gives us

    // navigator.geolocation.getCurrentPosition()
    // This getCurrentPosition() functions takes two callback function , the first one is success callback function,  this callback function that will be called on success such that whenever the browser successfully got the coordinates of the current position of the user, and the second callback is the error callback which is the one that is gonna be called when getting error while getting the coordinates
    // The first callback function accept one parameter (position parameter)
    navigator.geolocation.getCurrentPosition(
      this.#loadMap.bind(this),
      function () {
        alert("Could not get your position!");
      },
    );
  }
  #loadMap(position) {
    // console.log(position);
    const { latitude, longitude } = position.coords;
    // console.log(latitude, longitude);

    // Creating google map URL template https://www.google.com/maps/@{latitude},{longitude}
    // console.log(` https://www.google.com/maps/@${latitude},${longitude}`);

    // TODO: 1.Using leaflet to display a map on our webpage
    // The setView() , accept an array of coordinates as the first parameter, and another parameter for the zoom level of our map such that the larger the number the more the map is zoomed in and vice-versa

    const coords = [latitude, longitude];

    // TODO: 1(a). Initialize your map with a default view
    this.#map = L.map("map").setView(coords, this.#mapZoomLevel); // Centered on Dar es Salaam
    // Whatever string we pass in our map() method must be the id name of element in our html and it's in that element where the map will be displayed

    // NOTE: Calling the setupMapLayers() so as to add theme to the map
    this.#setupMapLayers();

    // TODO: 2. Add an event listener by using the on() which is an event listener function provided by leaflet
    //Such that when a user click on a map, the marker(location pin) appear on the given position in which a user click with the popup message(banner)
    this.#map.on("click", this.#showForm.bind(this)); //Here we have to bind the this keyword because without the bind method the "this" keyword will be point to a map object... this is because the "on()" work the same as the addEventListener()
  }

  #showForm(mapE) {
    this.#mapEvent = mapE;
    // TODO: 2(a) Render the workout form when a user click on a map
    form.classList.remove("hidden");

    // Automatically focus on the distance field so as user can enter data , this improve user experience
    inputDistance.focus();
  }

  #hideForm() {
    // Clear the input field after submitting the form
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";

    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  #toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  #newWorkout(e) {
    // Prevent page reload when we submit the form
    e.preventDefault();

    // TODO: Creating an helper function to validate inputs
    // NOTE: Using regular function.. you have to use the return keyword twice
    // const validInputs = function (...inputs) {
    //   return inputs.every(function (inp) {
    //     return Number.isFinite(inp);
    //   });
    // };
    // const allPositive = function (...inputs) {
    //   return inputs.every(function (inp) {
    //     return inp > 0;
    //   });
    // };

    // NOTE: Using arrow function
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    // TODO: Get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // TODO: If the workout is running create a running object
    if (type === "running") {
      const cadence = +inputCadence.value;
      // TODO: Check if the data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert("Input has to be a positive number!");

      // TODO: Creating a new running object after validating the data
      workout = new Running([lat, lng], distance, duration, cadence);
      this.#workoutsArr.push(workout);
    }
    // TODO: If the workout is cycling create a cycling object
    if (type === "cycling") {
      const elevationGain = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevationGain) ||
        !allPositive(distance, duration)
      )
        return alert("Input has to be a positive number!");
      // TODO: Creating a new cycling object after validating the data
      workout = new Cycling([lat, lng], distance, duration, elevationGain);
    }

    // TODO: push either the new created running or cycling object to workout array
    this.#workoutsArr.push(workout);

    // TODO: Display the marker on the map
    this.#renderWorkoutMarker(workout);

    // TODO: Render workout on list
    this.#renderWorkoutList(workout);

    // TODO: Hide form + clear input fields
    this.#hideForm();
  }

  #renderWorkoutMarker(workout) {
    // Add the marker to the map, such that the marker() method create the marker and addTo() add the marker to the map
    // Also the marker(location pin) accept the array of coordinates
    // The bindPopup can accept the string message like this bindPopup("Workout"), but also can accept an object through L.popup
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false, //override the default behavior of the popup closing when another popup is opened.
          closeOnClick: false, // override the default behavior of the popup closing when user clicks on the map.
          className: `${workout.type}-popup`,
        }),
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`,
      )
      .openPopup();
  }

  #renderWorkoutList(workout) {
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;

    if (workout.type === "running") {
      html += ` 
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
    }

    if (workout.type === "cycling") {
      html += `
         <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }

    form.insertAdjacentHTML("afterend", html);
  }

  #moveToPopup(e) {
    const workoutElement = e.target.closest(".workout");

    if (!workoutElement) return;

    const workout = this.#workoutsArr.find(
      (work) => work.id === workoutElement.dataset.id,
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  #setupMapLayers() {
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
    standard.addTo(this.#map);

    // TODO: 1(d). Create an object containing all your base layers/theme layers
    const baseMaps = {
      "Standard OSM": standard,
      Humanitarian: humanitarian,
      Topographic: openTopo,
    };

    // TODO: 1(e). Add the interactive layer control to the top-right corner of the map
    L.control.layers(baseMaps).addTo(this.#map);
  }
}

const app = new App();
