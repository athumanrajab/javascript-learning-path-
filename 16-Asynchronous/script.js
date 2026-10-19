"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const API_KEY = "rc_live_f8245f974c0e41ee91be321a31cd8d3b";

// REST Countries API KEY = rc_live_f8245f974c0e41ee91be321a31cd8d3b

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://api.restcountries.com/countries/v5/names.common/${country}

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

/*
// NOTE: Our first AJAX call: XMLHttpRequest
// In js there are different ways of doing AJAX calls

// 1.XMLHttpRequest -  this is the old school way, here the calls are handled by events and callback functions

const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  request.open(
    "GET",
    `https://api.restcountries.com/countries/v5/names.common/${country}`,
  );

  request.setRequestHeader("Authorization", `Bearer ${API_KEY}`);

  request.send();

  request.addEventListener("load", function () {
    // Convert the JSON to javaScript object
    const { data } = JSON.parse(this.responseText);
    const countryData = data.objects[0]; //This is because the data about the country is available on data.object which is array hence the use [0] so as to retrieve the first element

    const html = `
         <article class="country">
          <img class="country__img" src="${countryData.flag.url_png}" />
          <div class="country__data">
            <h3 class="country__name">${countryData.names.common}</h3>
            <h4 class="country__region">${countryData.region}</h4>
            <p class="country__row"><span>👫</span>${(+countryData.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${countryData.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${countryData.currencies[0].name}</p>
          </div>
        </article>;`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData("Portugal");
getCountryData("Canada");
getCountryData("Tanzania");

// However on the browser as we refresh the page, the arrangement of this countries will depend on which data will be first to arrive, if the portugal will be the first one to arrive then the ajax call will be fired and and then ajax call for USA will follow and vice-versa
// Inorder to solve such that we want our code to follow the predefined order we have to chain the requests
*/

/*
// NOTE: Welcome to callback hell
// The callback hell is when we have a lot of nested callbacks inorder to execute asynchrnous tasks in sequences
// The main problem with the callbackhell is that it's not easy to understand and reasoning hence can introduce bugs in our codes
// We can escape the callback hell by using promises
const renderCountry = function (countryData, className = "") {
  const html = `
         <article class="country ${className}">
          <img class="country__img" src="${countryData.flag.url_png}" />
          <div class="country__data">
            <h3 class="country__name">${countryData.names.common}</h3>
            <h4 class="country__region">${countryData.region}</h4>
            <p class="country__row"><span>👫</span>${(+countryData.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${countryData.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${countryData.currencies[0].name}</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // AJAX call for country 1
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://api.restcountries.com/countries/v5/names.common/${country}`,
  );
  request.setRequestHeader("Authorization", `Bearer ${API_KEY}`);
  request.send();

  request.addEventListener("load", function () {
    // Convert JSON string into Object
    const { data } = JSON.parse(this.responseText);
    const countryData = data.objects[0];
    // console.log(countryData);

    // Render country 1
    renderCountry(countryData);

    // Get neighbour countries of country 1
    const neighbour = countryData.borders[0];
    // console.log(neighbours);

    // Guard clause for all countries that have no neighbours
    if (!neighbour) return;

    // Check if the neighbour country code has 2 or 3 letter
    const codeProperty =
      neighbour.length === 2 ? "codes.alpha_2" : "codes.alpha_3";

    // AJAX call for neighbouring country of country 1
    const request2 = new XMLHttpRequest();
    request2.open(
      "GET",
      `https://api.restcountries.com/countries/v5/${codeProperty}/${neighbour}`,
    );
    request2.setRequestHeader("Authorization", `Bearer ${API_KEY}`);
    request2.send();
    // Listening for the load event(nested callback) which will be emitted by js after send the request
    request2.addEventListener("load", function () {
      // console.log(this.status, this.responseText);
      const countryData2 = JSON.parse(this.responseText).data.objects[0]; //This is because if we could do destructuring of object, it would require to the variable name to be the same as the object, data = data, and not data2
      // console.log(countryData2.names.common);
      renderCountry(countryData2, "neighbour");
    });
  });
};

getCountryAndNeighbour("Tanzania");
// getCountryAndNeighbour("Kenya");
*/

// NOTE: Consuming Promises
// Consuming a promise that was returned by fetch function
const renderCountry = function (countryData, className = "") {
  const html = `
         <article class="country ${className}">
          <img class="country__img" src="${countryData.flag.url_png}" />
          <div class="country__data">
            <h3 class="country__name">${countryData.names.common}</h3>
            <h4 class="country__region">${countryData.region}</h4>
            <p class="country__row"><span>👫</span>${(+countryData.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${countryData.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${countryData.currencies[0].name}</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   fetch(`https://api.restcountries.com/countries/v5/names.common/${country}`, {
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//     },
//   })
//     .then(function (response) {
//       //We use then() to specify the what to happen  when then the promise is fullfilled
//       console.log(response);

//       // Inorder to read the data from the body(response), we need to call the json() on response
//       // json is the method that is available on responses of the fetch method
//       return response.json(); //the json() is also asynchronous so it return a new promise, so we need to handle that by calling again another then() method
//     })
//     .then(function (data) {
//       console.log(data.data.objects[0]);
//       renderCountry(data.data.objects[0]);
//     });
// };

// The above code can be further simplfied by using arrow function
const getCountryData = function (country) {
  fetch(`https://api.restcountries.com/countries/v5/names.common/${country}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((responseData) => renderCountry(responseData.data.objects[0]));
};

getCountryData("Tanzania");

// NOTE: Building a promise
// We can build a promise by using a constructor because promise is just an object, and it accept only one argument which is executor function
// Such that as soon as the promise constructor run it will automatically execute the executor function
// The executor function accept other two arguments, and those arguments are the resolve and reject function
// The executor function specified as the callback function is the one that will contain the asynchronus behaviour that we are trying to handle with the promise such that this executor function should eventually produce a result value that gonna be the future value of the promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     // In this situation here, we said that we win the lottery, that means a fulfilled promise
//     // And inorder to set the promise as the fulfilled we use the resolve() function
//     resolve("You win"); //Calling the resolve() , will  make the function as the fulfilled promise(resolved promise)
//     // So inside the resolve method we pass in the fulfilled value of the promise so as it can later be consumed with the then method
//   } else {
//     // The reject() mark the promise as rejected
//     reject("You lost your money");
//   }
// });

// // Consuming the promise that we built
// lotteryPromise
//   .then(function (resolve) {
//     console.log(resolve);
//   })
//   .catch(function (err) {
//     console.error(err);
//   });

// Although the above code is not yet asynchronous.. so um let add some asynchrous behaviour by adding a time out
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log("The lottery is happening!");
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       // In this situation here, we said that we win the lottery, that means a fulfilled promise
//       // And inorder to set the promise as the fulfilled we use the resolve() function
//       resolve("You win"); //Calling the resolve() , will  make the function as the fulfilled promise(resolved promise)
//       // So inside the resolve method we pass in the fulfilled value of the promise so as it can later be consumed with the then method
//     } else {
//       // The reject() mark the promise as rejected
//       reject(new Error("You lost your money"));
//     }
//   }, 3000);
// });

// // Consuming the promise that we built
// lotteryPromise
//   .then(function (resolve) {
//     console.log(resolve);
//   })
//   .catch(function (err) {
//     console.error(err);
//   });

// In practice all we actually do most of the time is to consume promise
