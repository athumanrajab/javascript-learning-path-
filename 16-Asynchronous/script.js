"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const API_KEY = "rc_live_f8245f974c0e41ee91be321a31cd8d3b";
const imageContainer = document.querySelector(".images");

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

/*
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
 */

/*
// NOTE: Chaining Promises
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

const getCountryData = function (country) {
  // Country 1
  fetch(`https://api.restcountries.com/countries/v5/names.common/${country}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      renderCountry(responseData.data.objects[0]);

      // Neighbouring country of country 1
      const neighbour = responseData.data.objects[0].borders[0];

      // Check if the neighbour country code has 2 or 3 letter
      const codeProperty =
        neighbour.length === 2 ? "codes.alpha_2" : "codes.alpha_3";

      if (!neighbour) return;

      return fetch(
        `https://api.restcountries.com/countries/v5/${codeProperty}/${neighbour}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      );
    })
    .then((response) => response.json()) //read the response body and parse its JSON into a JavaScript value.
    .then((responseData) =>
      renderCountry(responseData.data.objects[0], "neighbour"),
    );
};

getCountryData("Tanzania");
 */

/*
// NOTE:Handling rejected promises
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
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, msgError = "Something went wrong!") {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }).then((response) => {
    if (!response) {
      throw new Error(`${msgError}`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://api.restcountries.com/countries/v5/names.common/${country}`,
    "Country not found!",
  )
    .then((responseData) => {
      const country = responseData.data.objects[0];

      if (!country) {
        throw new Error("Country not found!");
      }

      renderCountry(country);

      // Neighbouring country of country 1
      const neighbour = responseData.data.objects[0].borders[0];
      // console.log(neighbour);
      if (!neighbour) {
        throw new Error("No neighbour found!");
      }

      // Check if the neighbour country code has 2 or 3 letter
      const codeProperty =
        neighbour.length === 2 ? "codes.alpha_2" : "codes.alpha_3";

      return getJSON(
        `https://api.restcountries.com/countries/v5/${codeProperty}/${neighbour}`,
        "Country not found!",
      );
    })
    .then((responseData) =>
      renderCountry(responseData.data.objects[0], "neighbour"),
    )
    .catch((err) => {
      console.error(err);
      renderError(`Something went wrong 💩💩: ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  // getCountryData("Tanzania");
  getCountryData("Australia");
});
// getCountryData("Tarime");
 */

/*
NOTE: Coding Challenge #1
In this challenge you will build a function 'whereAmI' which renders a country
only based on GPS coordinates. For that, you will use a second API to geocode
coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
Your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
and a longitude value ('lng') (these are GPS coordinates, examples are in test
data below).
2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
to convert coordinates to a meaningful location, like a city and country name.
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
promises to get the data. Do not use the 'getJSON' function we created, that
is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes
that you received about the provided location. Then, using this data, log a
message like this to the console: “You are in Berlin, Germany”
4. Chain a .catch method to the end of the promise chain and log errors to the
console
5. This API allows you to make only 3 requests per second. If you reload fast, you
will get this error with code 403. This is an error with the request. Remember,
fetch() does not reject the promise in this case. So create an error to reject
the promise yourself, with a meaningful error message
PART 2
6. Now it's time to use the received data to render a country. So take the relevant
attribute from the geocoding API result, and plug it into the countries API that
we have been using.
7. Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code)
The Complete JavaScript Course
30Test data:
§Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§Coordinates 2: 19.037, 72.873
§Coordinates 3: -33.933, 18.474


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
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, msgError = "Something went wrong!") {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }).then((response) => {
    if (!response) {
      throw new Error(`${msgError}`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://api.restcountries.com/countries/v5/names.common/${country}`,
    "Country not found!",
  )
    .then((responseData) => {
      const country = responseData.data.objects[0];

      if (!country) {
        throw new Error("Country not found!");
      }

      renderCountry(country);

      // Neighbouring country of country 1
      const neighbour = responseData.data.objects[0].borders[0];
      // console.log(neighbour);
      if (!neighbour) {
        throw new Error("No neighbour found!");
      }

      // Check if the neighbour country code has 2 or 3 letter
      const codeProperty =
        neighbour.length === 2 ? "codes.alpha_2" : "codes.alpha_3";

      return getJSON(
        `https://api.restcountries.com/countries/v5/${codeProperty}/${neighbour}`,
        "Country not found!",
      );
    })
    .then((responseData) =>
      renderCountry(responseData.data.objects[0], "neighbour"),
    )
    .catch((err) => {
      console.error(err);
      renderError(`Something went wrong 💩💩: ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
  )
    .then((response) => {
      if (!response) {
        throw new error(`Please provide valid latitude and longitude`);
      }
      return response.json();
    })
    .then((responseBody) => {
      console.log(
        `You are in ${responseBody.city}, ${responseBody.countryName}`,
      );
      getCountryData(responseBody.countryName);
    })
    .catch((err) => console.err(err.message));
};

whereAmI(-33.933, 18.474);
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
*/

/*
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
//     // The reject() mark the promise as rejected, inside the reject method we pass in the error message that can be caught in a catch block
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
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("The lottery is happening!🧿");
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // In this situation here, we said that we win the lottery, that means a fulfilled promise
      // And inorder to set the promise as the fulfilled we use the resolve() function
      resolve("You win 😛"); //Calling the resolve() , will  make the function as the fulfilled promise(resolved promise)
      // So inside the resolve method we pass in the fulfilled value of the promise so as it can later be consumed with the then method
    } else {
      // The reject() mark the promise as rejected
      reject(new Error("You lost your money 💩"));
    }
  }, 3000);
});

// Consuming the promise that we built
lotteryPromise
  .then(function (resolve) {
    console.log(resolve);
  })
  .catch(function (err) {
    console.error(err);
  });

// In practice all we actually do most of the time is to consume promise, we only build promise to wrap old callback based function into promises.. anf this process is callled promosifying
// Promisifying means to convert the callback based asynchronous behaviour into a promise based

// Let promisify the setTimeout function and create a wait function
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Consuming promise
wait(2)
  .then(() => {
    console.log("I waited for 2 seconds");
    return wait(1);
  })
  .then(() => console.log("I waited for 1 second"));
 */

/*
// NOTE: Promisifying Geolocation API
// Geolocation API is among of the callback based API, so this is the great opportunity to promisify the callback based API to promise based API
// navigator.geolocation.getCurrentPosition(
//   (position) => console.log(position),
//   (err) => console.error(err),
// );

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then((pos) => console.log(pos));

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
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, msgError = "Something went wrong!") {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${msgError} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  console.log(country);
  getJSON(
    `https://api.restcountries.com/countries/v5/names.common/${country}`,
    "Country not found!",
  )
    .then((responseData) => {
      const country = responseData.data.objects[0];

      if (!country) {
        throw new Error("Country not found!");
      }

      renderCountry(country);

      // Neighbouring country of country 1
      const neighbour = responseData.data.objects[0].borders[0];
      // console.log(neighbour);
      if (!neighbour) {
        throw new Error("No neighbour found!");
      }

      // Check if the neighbour country code has 2 or 3 letter
      const codeProperty =
        neighbour.length === 2 ? "codes.alpha_2" : "codes.alpha_3";

      return getJSON(
        `https://api.restcountries.com/countries/v5/${codeProperty}/${neighbour}`,
        "Country not found!",
      );
    })
    .then((responseData) =>
      renderCountry(responseData.data.objects[0], "neighbour"),
    )
    .catch((err) => {
      console.error(err);
      renderError(`Something went wrong 💩💩: ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
      );
    })

    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to get your location details.");
      }
      return response.json();
    })
    .then((responseBody) => {
      const country = responseBody.countryName.split(",")[0];
      console.log(`You are in ${responseBody.city}, ${country}`);
      getCountryData(country);
    })
    .catch((err) => console.error(err.message));
};

btn.addEventListener("click", function () {
  whereAmI();
});
 */

/*
// NOTE: Coding Challenge #2
Coding Challenge #2 
For this challenge you will actually have to watch the video! Then, build the image 
loading functionality that I just showed you on the screen. 
Your tasks: 
Tasks are not super-descriptive this time, so that you can figure out some stuff by 
yourself. Pretend you're working on your own 😉 
PART 1 
1. Create a function 'createImage' which receives 'imgPath' as an input. 
This function returns a promise which creates a new image (use 
document.createElement('img')) and sets the .src attribute to the 
provided image path 
2. When the image is done loading, append it to the DOM element with the 
'images' class, and resolve the promise. The fulfilled value should be the 
image element itself. In case there is an error loading the image (listen for 
the'error' event), reject the promise 
3. If this part is too tricky for you, just watch the first part of the solution 
 
PART 2 
4. Consume the promise using .then and also add an error handler 
5. After the image has loaded, pause execution for 2 seconds using the 'wait' 
function we created earlier 
6. After the 2 seconds have passed, hide the current image (set display CSS 
property to 'none'), and load a second image (Hint: Use the image element 
returned by the 'createImage' promise to hide the current image. You will 
need a global variable for that 😉) 
7. After the second image has loaded, pause execution for 2 seconds again 
8. After the 2 seconds have passed, hide the current image 
Test data: Images in the img folder. Test the error handler by passing a wrong 
image path. Set the network speed to “Fast 3G” in the dev tools Network tab, 
otherwise images load too fast 
 
GOOD LUCK 😀 
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement("img");
    image.src = `${imgPath}`;

    image.addEventListener("load", function () {
      imageContainer.append(image);
      resolve(image);
    });

    image.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

let currentImg;

createImage("./img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    console.log(img);
    return wait(3);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("./img/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log(img);
    return wait(3);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("./img/img-3.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log(img);
    return wait(3);
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .catch((err) => console.error(`Oppsss 💩: ${err.message}`));
